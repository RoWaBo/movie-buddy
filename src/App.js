import React from 'react'
import { Route, Routes } from 'react-router-dom'
import RequireAuth from './components/RequireAuth'
import Wrapper from './components/Wrapper'
import { AuthProvider } from './contexts/AuthContext'
import Login from './pages/Login'
import Profile from './pages/Profile'
import SignUp from './pages/SignUp'

function App() {
	return (
		<AuthProvider>
			<Wrapper>
				<Routes>
					<Route path='/login' element={<Login />} />
					<Route path='/signup' element={<SignUp />} />
					<Route
						path='/profile'
						element={
							<RequireAuth>
								<Profile />
							</RequireAuth>
						}
					/>
					<Route path='*' element={<Login />} />
				</Routes>
			</Wrapper>
		</AuthProvider>
	)
}

export default App
