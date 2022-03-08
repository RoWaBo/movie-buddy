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

	const searchByHandle = async (handle) => {
		const profilesRef = collection(db, 'profiles')
		const q = query(profilesRef, where('handle', '==', handle))
		const response = await getDocs(q)

		let results = []
		response.forEach((result) => results.push(result.data()))
		return results
	}

	return {
		searchByHandle,
	}
}

export default useSearch
