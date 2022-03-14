import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navigation from './components/Navigation'
import RequireAuth from './components/RequireAuth'
import Wrapper from './components/Wrapper'
import { AuthProvider } from './contexts/AuthContext'
import Login from './pages/Login'
import EditProfile from './pages/EditProfile'
import Search from './pages/Search'
import SignUp from './pages/SignUp'
import Home from './pages/Home'

function App() {
	const { pathname } = useLocation()
	return (
		<AuthProvider>
			<Wrapper>
				<Routes>
					<Route path='/login' element={<Login />} />
					<Route path='/signup' element={<SignUp />} />
					<Route path='/' element={<Home />} />
					<Route
						path='/editprofile'
						element={
							<RequireAuth>
								<EditProfile />
							</RequireAuth>
						}
					/>
					<Route path='/search' element={<Search />} />
					{/* <Route path='*' element={<Login />} /> */}
				</Routes>
			</Wrapper>
			{pathname !== '/login' && pathname !== '/signup' && <Navigation />}
		</AuthProvider>
	)
}

export default App
