import { createContext, useContext, useEffect, useState } from 'react'
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	sendEmailVerification,
	signInWithEmailAndPassword,
	signOut,
	updateProfile as updateUser,
} from 'firebase/auth'
import { auth } from '../firebaseConfig'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../firebaseConfig'

const AuthContext = createContext()

export function useAuth() {
	return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState()
	const [loading, setLoading] = useState(true)

	const addProfile = async (uid, profileData) => {
		const profileRef = doc(db, `profiles/${uid}`)
		return await setDoc(profileRef, { ...profileData, uid }, { merge: true })
	}

	const signUp = async (username, email, password) => {
		const userCredentials = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		)
		await updateUser(userCredentials.user, {
			displayName: username,
		})
		await addProfile(userCredentials.user.uid, { handle: username })
		await sendEmailVerification(userCredentials.user)
		return userCredentials
	}

	const login = (email, password) => signInWithEmailAndPassword(auth, email, password)

	const logout = () => signOut(auth)

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user)
			setLoading(false)
		})
		return unsubscribe
	}, [])

	const contextValues = {
		currentUser,
		signUp,
		login,
		logout,
	}

	return (
		<AuthContext.Provider value={contextValues}>
			{!loading && children}
		</AuthContext.Provider>
	)
}
