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
	const allHandlesRef = doc(db, `profiles/allHandles`)

	const addCurrentUserProfile = async (profileData) => {
		// set profile
		await setDoc(
			profileRef,
			{ ...profileData, uid: currentUser.uid },
			{ merge: true }
		)
		// set allHandles
		await setDoc(
			allHandlesRef,
			{
				[currentUser.uid]: {
					handle: profileData.handle,
					pictureURL: profileData.pictureURL,
				},
			},
			{ merge: true }
		)
		// await updateCurrentUser({
		// 	displayName: profileData.handle,
		// })
	}

	const getCurrentUserProfile = async () => {
		const profile = await getDoc(profileRef)
		// console.log('Current profile: ', profile.data())
		return profile.data()
	}

	const getAllHandles = async () => {
		const allHandles = await getDoc(allHandlesRef)
		const allHandlesToArray = Object.entries(allHandles.data())
		const allHandlesToArrayWithMap = allHandlesToArray.map(
			([key, values]) => ({
				uid: key,
				...values,
			})
		)
		return allHandlesToArrayWithMap
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
		handleAvailabilityStatus,
		getAllHandles,
	}
}

export default useProfile
