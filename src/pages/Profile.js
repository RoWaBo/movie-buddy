import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { AnimatePresence, motion } from 'framer-motion'
import ErrorMessage from '../components/ErrorMessage'
import { useForm } from 'react-hook-form'
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useNavigate } from 'react-router-dom'
import useProfile from '../hooks/useProfile'

const Profile = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm()
	const [errorMessage, setErrorMessage] = useState()
	const navigate = useNavigate()
	const { currentUser, logout } = useAuth()
	const { addCurrentUserProfile, getCurrentUserProfile, getMovieGenres } = useProfile()
	const [movieGenres, setMovieGenres] = useState()
	const [userProfile, setUserProfile] = useState()
	const [favMovieGenres, setFavMovieGenres] = useState([])

	// Get current user profile if it exist
	useEffect(() => {
		if (userProfile) return
		;(async () => {
			const profile = await getCurrentUserProfile()
			profile && syncFormWithProfile(profile)
		})()
	}, [userProfile, getCurrentUserProfile, syncFormWithProfile])
	// Get movie genres
	useEffect(() => {
		if (movieGenres) return
		;(async () => {
			const { movieGenres } = await getMovieGenres()
			setMovieGenres(movieGenres)
		})()
	}, [movieGenres, getMovieGenres])

	function syncFormWithProfile(profile) {
		setUserProfile(profile)
		profile.favMovieGenres?.length > 0 && setFavMovieGenres(profile.favMovieGenres)
		const inputFieldsToUpdate = ['name', 'age', 'bio']
		inputFieldsToUpdate.forEach((inputField) =>
			setValue(inputField, profile[inputField])
		)
	}

	const onSubmit = async (form) => {
		try {
			console.log(form)
			console.log('favMovieGenres: ', favMovieGenres)
			addCurrentUserProfile({ ...form, favMovieGenres })
		} catch (error) {
			setErrorMessage(error.message)
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

	// === STYLE ===
	const formStyle = css`
		width: 100%;
		padding: 2rem;
		.input,
		.textarea {
			display: block;
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
	`
	if (!movieGenres) return <h1>Loading...</h1>
	if (movieGenres)
		return (
			<>
				<h1>Edit profile</h1>
				<p>Hello, {currentUser.displayName}</p>
				<AnimatePresence>
					<motion.form
						key='form'
						css={formStyle}
						onSubmit={handleSubmit(onSubmit)}
						layout>
						<motion.input
							className='input'
							layout
							type='text'
							placeholder={'name'}
							onFocus={() => setErrorMessage(false)}
							whileFocus={{ scale: 1.02 }}
							{...register('name')}
						/>
						<motion.input
							className='input'
							layout
							type='number'
							placeholder='age'
							onFocus={() => setErrorMessage(false)}
							whileFocus={{ scale: 1.02 }}
							{...register('age')}
						/>
						<motion.textarea
							className='textarea'
							layout
							placeholder='write bio'
							onFocus={() => setErrorMessage(false)}
							whileFocus={{ scale: 1.02 }}
							{...register('bio')}
						/>
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
						{errorMessage && <ErrorMessage icon>{errorMessage}</ErrorMessage>}
						<motion.button layout type='submit'>
							save
						</motion.button>
					</motion.form>
				</AnimatePresence>
				<button onClick={logout}>Log out</button>
			</>
		)
}

export default Profile
