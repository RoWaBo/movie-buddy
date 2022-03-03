import { AnimatePresence, motion } from 'framer-motion'
import ErrorMessage from '../components/ErrorMessage'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm()
	const [errorMessage, setErrorMessage] = useState()
	const { login } = useAuth()
	const navigate = useNavigate()

	const onSubmit = (form) => {
		;(async () => {
			try {
				await login(form.email, form.password)
				navigate('/profile')
			} catch (error) {
				setErrorMessage(error.message)
			}
		})()
	}

	// === STYLE ===
	const formStyle = css`
		width: 100%;
		padding: 2rem;
		.input {
			display: block;
		}
	`

	return (
		<AnimatePresence>
			<motion.form
				key='form'
				css={formStyle}
				onSubmit={handleSubmit(onSubmit)}
				layout>
				<motion.input
					className='input'
					layout
					type='text'
					placeholder={'email'}
					onFocus={() => setErrorMessage(false)}
					whileFocus={{ scale: 1.02 }}
					{...register('email', {
						required: 'email is required',
					})}
				/>
				<motion.input
					className='input'
					layout
					type='password'
					placeholder='password'
					onFocus={() => setErrorMessage(false)}
					whileFocus={{ scale: 1.02 }}
					{...register('password', {
						required: 'password is required',
					})}
				/>
				{(Object.keys(errors).length !== 0 || errorMessage) && (
					<ErrorMessage icon>
						{errorMessage ? errorMessage : 'Email and password is required'}
					</ErrorMessage>
				)}
				<motion.button layout type='submit'>
					Log in
				</motion.button>
			</motion.form>
			<motion.div key='linkContainer' layout>
				<p>Need an account?</p>
				<Link to='/signup'>Sign Up</Link>
			</motion.div>
		</AnimatePresence>
	)
}

export default Login
