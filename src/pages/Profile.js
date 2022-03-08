import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { AnimatePresence, motion } from 'framer-motion'
import ErrorMessage from '../components/ErrorMessage'
import { useForm } from 'react-hook-form'
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useNavigate } from 'react-router-dom'
import useProfile from '../hooks/useProfile'
import FieldRHF from '../components/FieldRHF'
import CenterContainer from '../components/CenterContainer'
import useStorage from '../hooks/useStorage'

const Profile = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		clearErrors,
		setError,
	} = useForm()
	const navigate = useNavigate()
	const { logout } = useAuth()
	const {
		addCurrentUserProfile,
		getCurrentUserProfile,
		getMovieGenres,
		handleAvailabilityStatus,
	} = useProfile()
	const { uploadeProfilePicture } = useStorage()
	const [movieGenres, setMovieGenres] = useState()
	const [userProfile, setUserProfile] = useState()
	const [favMovieGenres, setFavMovieGenres] = useState([])
	const [profilePictureURL, setProfilePictureURL] = useState()

	// Get current user profile if it exist and sync Form With Profile
	useEffect(() => {
		if (userProfile) return
		;(async () => {
			try {
				const profile = await getCurrentUserProfile()
				if (!profile) return

				// === syncFormWithProfile
				setUserProfile(profile)
				// sync fav movie genres
				profile.favMovieGenres?.length > 0 &&
					setFavMovieGenres(profile.favMovieGenres)
				// sync profile commen info
				const inputFieldsToUpdate = ['handle', 'name', 'age', 'bio']
				inputFieldsToUpdate.forEach((inputField) =>
					setValue(inputField, profile[inputField])
				)
				// sync profile picture
				profile.pictureURL !== '' && setProfilePictureURL(profile.pictureURL)
			} catch (error) {
				setError('firebase', { message: error.message })
			}
		})()
	}, [userProfile, getCurrentUserProfile, setValue])
	// Get movie genres
	useEffect(() => {
		if (movieGenres) return
		;(async () => {
			const { movieGenres } = await getMovieGenres()
			setMovieGenres(movieGenres)
		})()
	}, [movieGenres, getMovieGenres])

	const onSubmit = async (form) => {
		try {
			// Check if handle/username is available
			const handleStatusMessage = await handleAvailabilityStatus(form.handle)
			if (handleStatusMessage === 'not available') {
				return setError('firebase', { message: 'Username is already taken' })
			}

			await addCurrentUserProfile({
				...form,
				favMovieGenres,
				pictureURL: profilePictureURL,
			})

			console.log('Profile added: ', form)
			console.log('favMovieGenres: ', favMovieGenres)
			console.log('profilePictureURL: ', profilePictureURL)
			console.log('Profile has been saved!')
		} catch (error) {
			setError('firebase', { message: error.message })
		}
	}

	const toggleGenre = (clickedGenre) => {
		if (favMovieGenres.includes(clickedGenre)) {
			const filteredGenres = favMovieGenres.filter(
				(favMovieGenre) => favMovieGenre !== clickedGenre
			)
			setFavMovieGenres([...filteredGenres])
		} else {
			setFavMovieGenres([...favMovieGenres, clickedGenre])
		}
	}

	const ifSelectedStyle = (genre) => (favMovieGenres?.includes(genre) ? 'selected' : '')

	const handleProfilePictureUploade = async (file) => {
		if (!file) return
		try {
			const profilePictureURL = await uploadeProfilePicture(file)
			setProfilePictureURL(profilePictureURL)
		} catch (error) {
			setError('firebase', { message: 'Profile picture failed to uploade' })
		}
	}

	// === STYLE ===
	const formStyle = css`
		max-width: 400px;
		min-width: 300px;

		.input,
		.textarea {
			display: block;
			outline: none;
		}
		.textarea {
			width: 100%;
			height: 15vh;
		}
		.genreList {
			display: flex;
			flex-wrap: wrap;
		}
		.genreListItem {
			width: 100px;
			padding: 1rem 0;
			text-align: center;
			text-transform: capitalize;
			border: 1px solid rgba(0, 0, 0, 0.5);
		}
		.selected {
			background: #bbf7d0;
		}
		.button {
			width: fit-content;
			padding: 0.5rem;
			margin: 0.5rem 0;
		}
		.profilePicture {
			height: 200px;
			object-fit: cover;
			object-position: center;
		}
	`
	const btnStyle = css`
		width: fit-content;
		padding: 0.5rem;
		margin: 0.5rem 0;
	`
	if (!movieGenres) return <h1>Loading...</h1>
	if (movieGenres)
		return (
			<CenterContainer>
				<h1>Edit Profile</h1>
				<AnimatePresence>
					<motion.form
						key='form'
						css={formStyle}
						onSubmit={handleSubmit(onSubmit)}
						layout>
						<FieldRHF
							labelText='username *'
							type='text'
							errorMessage={errors.handle?.message}
							onChange={clearErrors}
							{...register('handle', {
								required: 'You must enter a username',
							})}
						/>
						<FieldRHF
							className='input'
							labelText='Name'
							type='text'
							{...register('name')}
						/>
						<FieldRHF
							className='input'
							labelText='Age'
							type='number'
							{...register('age')}
						/>
						<motion.label layout>
							Bio
							<motion.textarea
								className='textarea'
								layout
								whileFocus={{ scale: 1.02 }}
								{...register('bio')}
							/>
						</motion.label>
						<motion.section className='genreSection' layout>
							<motion.h2 layout>
								Select your favorite movie genres
							</motion.h2>
							<motion.ul className='genreList' layout>
								{movieGenres?.map((genre, i) => (
									<motion.li
										key={i}
										className={`genreListItem ${ifSelectedStyle(
											genre
										)}`}
										onClick={() => toggleGenre(genre)}
										layout>
										{genre}
									</motion.li>
								))}
							</motion.ul>
						</motion.section>

						<section>
							<h2>Uploade profile picture</h2>
							<label>
								Select picture
								<input
									type='file'
									onChange={(e) =>
										handleProfilePictureUploade(e.target.files[0])
									}
								/>
							</label>
							{profilePictureURL && (
								<img
									className='profilePicture'
									src={profilePictureURL}
									alt='profile'
								/>
							)}
						</section>

						{errors.firebase && (
							<ErrorMessage icon>{errors.firebase.message}</ErrorMessage>
						)}
						<motion.button
							className='button'
							layout
							type='submit'
							onClick={() => clearErrors()}>
							save
						</motion.button>
						<button className='button' onClick={logout}>
							Log out
						</button>
					</motion.form>
				</AnimatePresence>
			</CenterContainer>
		)
}

export default Profile
