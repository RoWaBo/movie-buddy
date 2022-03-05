import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const RequireAuth = ({ children }) => {
	const navigate = useNavigate()
	const { currentUser } = useAuth()

	useEffect(() => {
		!currentUser && navigate('/login')
	}, [currentUser, navigate])

	return <>{currentUser ? children : null}</>
}

export default RequireAuth
