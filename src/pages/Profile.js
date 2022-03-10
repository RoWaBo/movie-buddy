import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import ErrorMessage from '../components/ErrorMessage'
import { useForm } from 'react-hook-form'
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import useProfile from '../hooks/useProfile'
import FieldRHF from '../components/FieldRHF'
import useStorage from '../hooks/useStorage'
import ProfilePicture from '../components/ProfilePicture'
import axios from 'axios'

const Profile = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		clearErrors,
		setError,
	} = useForm()
	const { addCurrentUserProfile, getCurrentUserProfile, handleAvailabilityStatus } =
		useProfile()
	const { logout } = useAuth()
	const { uploadeProfilePicture } = useStorage()
	const [movieGenres, setMovieGenres] = useState()
	const [userProfile, setUserProfile] = useState()
	const [favMovieGenres, setFavMovieGenres] = useState([])
	const [profilePictureURL, setProfilePictureURL] = useState('')

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
				profile.pictureURL &&
					profile.pictureURL !== '' &&
					setProfilePictureURL(profile.pictureURL)
			} catch (error) {
				setError('firebase', { message: error.message })
			}
		})()
	}, [userProfile, getCurrentUserProfile, setValue, setError])

	// Get movie genres
	useEffect(() => {
		if (movieGenres) return
		;(async () => {
			const { data } = await axios('movieGenres.json')
			setMovieGenres(data.genres)
		})()
	}, [movieGenres])

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
			width: 130px;
			padding: 0.5rem 0;
			margin: 0.3rem;
			text-align: center;
			text-transform: capitalize;
			border: 1px solid rgba(0, 0, 0, 0.3);
			border-radius: 20px;
		}
		.selected {
			background: #bbf7d0;
		}
		.button {
			width: fit-content;
			padding: 0.5rem;
			margin: 0.5rem 0;
		}
		.pictureSection {
			margin: 2rem 0;
		}
	`
	const btnStyle = css`
		width: fit-content;
		padding: 0.5rem;
		margin: 0.5rem 0;
	`
	const topHeadingStyle = css`
		margin: 2rem 0;
	`
	if (!movieGenres) return <h1>Loading...</h1>
	if (movieGenres)
		return (
			<>
				<h1 css={topHeadingStyle}>Edit Profile</h1>
				<form key='form' css={formStyle} onSubmit={handleSubmit(onSubmit)}>
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
					<label>
						Bio
						<textarea
							className='textarea'
							whileFocus={{ scale: 1.02 }}
							{...register('bio')}
						/>
					</label>

					<section className='pictureSection'>
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
						{profilePictureURL !== '' && (
							<ProfilePicture
								big
								pictureURL={profilePictureURL}
								alt={userProfile ? userProfile.handle : ''}
							/>
						)}
					</section>

					<section className='genreSection'>
						<h2>Select your favorite movie genres</h2>
						<ul className='genreList'>
							{movieGenres?.map(({ id, name }) => (
								<li
									key={id}
									className={`genreListItem ${ifSelectedStyle(name)}`}
									onClick={() => toggleGenre(name)}>
									{name}
								</li>
							))}
						</ul>
					</section>

					{errors.firebase && (
						<ErrorMessage icon>{errors.firebase.message}</ErrorMessage>
					)}

					<button
						className='button'
						type='submit'
						onClick={() => clearErrors()}>
						save
					</button>
					<button className='button' onClick={logout}>
						Log out
					</button>
				</form>
			</>
		)
}

export default Profile
