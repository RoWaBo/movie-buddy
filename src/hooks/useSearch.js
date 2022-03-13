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

const useSearch = () => {
	const { currentUser, updateCurrentUser } = useAuth()
	const profilesRef = collection(db, 'profiles')

	const searchProfilesByHandle = async (handle) => {
		const q = query(profilesRef, where('handle', '==', handle))
		const response = await getDocs(q)

		let results = []
		response.forEach((result) => results.push(result.data()))
		return results
	}
	const searchProfilesByGenre = async (genre) => {
		const q = query(
			profilesRef,
			where('favMovieGenres', 'array-contains', genre)
		)
		const response = await getDocs(q)

		let results = []
		response.forEach((result) => results.push(result.data()))
		return results
	}

	return {
		searchProfilesByHandle,
		searchProfilesByGenre,
	}
}

export default useSearch
