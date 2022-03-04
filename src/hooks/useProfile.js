import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useAuth } from '../contexts/AuthContext'
import { db } from '../firebaseConfig'

const useProfile = () => {
	const { currentUser } = useAuth()
	const profileRef = doc(db, `profiles/${currentUser.uid}`)

	const addCurrentUserProfile = async (profileData) => {
		return await setDoc(
			profileRef,
			{ ...profileData, uid: currentUser.uid },
			{ merge: true }
		)
	}

	const getCurrentUserProfile = async () => {
		const profile = await getDoc(profileRef)
		// console.log('Current profile: ', profile.data())
		return profile.data()
	}

	const getMovieGenres = async () => {
		const movieGenreRef = doc(db, `movieGenres/movieGenresDoc`)
		const movieGenres = await getDoc(movieGenreRef)
		return movieGenres.data()
	}

	return { addCurrentUserProfile, getCurrentUserProfile, getMovieGenres }
}

export default useProfile
