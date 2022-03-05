import { createContext, useContext, useEffect, useState } from 'react'
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	sendEmailVerification,
	signInWithEmailAndPassword,
	signOut,
	updateProfile,
} from 'firebase/auth'
import { auth } from '../firebaseConfig'

const AuthContext = createContext()

export function useAuth() {
	return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState()
	const [loading, setLoading] = useState(true)

	const signUp = async (email, password) => {
		const userCredentials = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		)
		await sendEmailVerification(userCredentials.user)
		return userCredentials
	}

	const login = (email, password) => signInWithEmailAndPassword(auth, email, password)

	const logout = () => signOut(auth)

	const updateCurrentUser = (userMap) => updateProfile(currentUser, userMap)

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
		updateCurrentUser,
	}

	return (
		<AuthContext.Provider value={contextValues}>
			{!loading && children}
		</AuthContext.Provider>
	)
}
