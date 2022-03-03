import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useAuth } from '../contexts/AuthContext'
import { db } from '../firebaseConfig'

const useProfile = () => {
	const { currentUser } = useAuth()

	const addProfile = async (profileData) => {
		const profileRef = doc(db, `profiles/${profileData.uid}`)
		return await setDoc(profileRef, profileData, { merge: true })
	}

	const getCurrentProfile = async () => {
		const profileRef = doc(db, `profiles/${currentUser.uid}`)
		const profile = await getDoc(profileRef)
		console.log('Current profile: ', profile.data())
		return profile.data()
	}

	return { addProfile, getCurrentProfile }
}

export default useProfile
