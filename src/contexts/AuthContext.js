import { createContext, useContext, useEffect, useState } from "react";
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	sendEmailVerification,
} from "firebase/auth";
import { auth } from "../firebaseConfig";

const AuthContext = createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState();
	const [loading, setLoading] = useState(true);

	const signUp = (email, password) => {
		return createUserWithEmailAndPassword(auth, email, password);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, user => {
			console.log("onAuthStateChanged ran");
			// !user?.emailVerified && sendEmailVerification(user);
			setCurrentUser(user);
			setLoading(false);
		});

		return unsubscribe;
	}, []);

	const contextValues = {
		currentUser,
		signUp,
	};

	return (
		<AuthContext.Provider value={contextValues}>
			{!loading && children}
		</AuthContext.Provider>
	);
};
