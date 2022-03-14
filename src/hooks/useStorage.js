import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { useAuth } from '../contexts/AuthContext'
import { storage } from '../firebaseConfig'

const useStorage = () => {
	const { currentUser } = useAuth()

	const uploadeProfilePicture = async (picture) => {
		const profilePictureRef = ref(
			storage,
			`profilePictures/${currentUser.uid}/${picture.name}`
		)
		await uploadBytes(profilePictureRef, picture)
		return getDownloadURL(profilePictureRef)
	}

	return {
		uploadeProfilePicture,
	}
}

export default useStorage
