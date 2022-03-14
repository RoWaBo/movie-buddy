import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const useMenus = () => {
	const { logout } = useAuth()
	const navigate = useNavigate()

	const currentUserProfileMenu = [
		{
			name: 'Edit profile',
			onClick: () => navigate('/editprofile'),
		},
		{ name: 'Logout', onClick: logout },
	]

	return {
		currentUserProfileMenu,
	}
}

export default useMenus
