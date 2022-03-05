import {
	doc,
	getDoc,
	getDocs,
	setDoc,
	collection,
	query,
	where,
} from 'firebase/firestore'
import { useAuth } from '../contexts/AuthContext'
import { db } from '../firebaseConfig'

const useProfile = () => {
	const { currentUser, updateCurrentUser } = useAuth()
	const profileRef = doc(db, `profiles/${currentUser.uid}`)

	const addCurrentUserProfile = async (profileData) => {
		await setDoc(
			profileRef,
			{ ...profileData, uid: currentUser.uid },
			{ merge: true }
		)
		await updateCurrentUser({
			displayName: profileData.handle,
		})
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

	const isHandleAvailable = async (handle) => {
		const profilesRef = collection(db, 'profiles')
		const q = query(profilesRef, where('handle', '==', handle))
		const response = await getDocs(q)
		let results = []
		response.forEach((result) => results.push(result.data()))
		return results.length > 0 ? false : true
	}

	return {
		addCurrentUserProfile,
		getCurrentUserProfile,
		getMovieGenres,
		isHandleAvailable,
	}
}

export default useProfile
