import { useAuth } from '../contexts/AuthContext'

const Profile = () => {
	const { currentUser, logout } = useAuth()

	return currentUser ? (
		<>
			<h1>Profile</h1>
			<p>Hello, {currentUser?.displayName}</p>
			<button onClick={logout}>Log out</button>
		</>
	) : (
		<p>No user logged in</p>
	)
}

export default Profile
