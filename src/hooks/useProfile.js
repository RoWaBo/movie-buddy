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

	// returns strings: 'same as current user' | 'not available' | 'available'
	const handleAvailabilityStatus = async (handle) => {
		if (currentUser.displayName === handle) return 'same as current user'

		const profilesRef = collection(db, 'profiles')
		const q = query(profilesRef, where('handle', '==', handle))
		const response = await getDocs(q)

		let results = []
		response.forEach((result) => results.push(result.data()))
		if (results.length > 0) {
			return 'not available'
		} else {
			return 'available'
		}
	}

	return {
		addCurrentUserProfile,
		getCurrentUserProfile,
		getMovieGenres,
		isHandleAvailable: handleAvailabilityStatus,
	}
}

export default useProfile
