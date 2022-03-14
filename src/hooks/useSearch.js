import { getDocs, collection, query, where } from 'firebase/firestore'
import { db } from '../firebaseConfig'

const useSearch = () => {
	const profilesRef = collection(db, 'profiles')

	const applyDataOnEachItemInArray = (items) => {
		let array = []
		items.forEach((item) => array.push(item.data()))
		return array
	}

	const searchProfilesByHandle = async (handle) => {
		const q = query(profilesRef, where('handle', '==', handle))
		const response = await getDocs(q)
		return applyDataOnEachItemInArray(response)
	}
	const searchProfilesByGenre = async (genre) => {
		const q = query(
			profilesRef,
			where('favMovieGenres', 'array-contains', genre)
		)
		const response = await getDocs(q)
		return applyDataOnEachItemInArray(response)
	}
	const searchProfilesByKeyword = async (keyword) => {
		const q = query(
			profilesRef,
			where('keywords', 'array-contains', keyword)
		)
		const response = await getDocs(q)
		return applyDataOnEachItemInArray(response)
	}

	return {
		searchProfilesByHandle,
		searchProfilesByGenre,
		searchProfilesByKeyword,
	}
}

export default useSearch
