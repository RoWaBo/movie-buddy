import { createContext, useContext, useEffect, useState } from "react";
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	sendEmailVerification,
	signInWithEmailAndPassword,
	signOut,
	updateProfile,
} from "firebase/auth";
import { auth } from "../firebaseConfig";

const AuthContext = createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState();
	const [loading, setLoading] = useState(true);

	const signUp = async (username, email, password) => {
		const userCredentials = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		await updateProfile(userCredentials.user, {
			displayName: username,
		});
		await sendEmailVerification(userCredentials.user);
		return userCredentials;
	};

	const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

	const logout = () => signOut(auth);

	useEffect(() => {
		return onAuthStateChanged(auth, user => {
			setCurrentUser(user);
			setLoading(false);
		});
	}, []);

	const contextValues = {
		currentUser,
		signUp,
		login,
		logout,
	};

	return (
		<AuthContext.Provider value={contextValues}>
			{!loading && children}
		</AuthContext.Provider>
	);
};
