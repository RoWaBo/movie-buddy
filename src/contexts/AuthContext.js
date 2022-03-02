import { createContext, useContext, useEffect, useState } from "react";
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	sendEmailVerification,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import { auth } from "../firebaseConfig";

const AuthContext = createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState();
	const [loading, setLoading] = useState(true);

	const signUp = async (email, password) => {
		const userCredentials = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		userCredentials && sendEmailVerification(userCredentials.user);
		return userCredentials;
	};
	const login = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password);
	};
	const logout = () => signOut();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, user => {
			setCurrentUser(user);
			setLoading(false);
		});

		return unsubscribe;
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
