import { AnimatePresence, motion } from 'framer-motion'
import ErrorMessage from '../components/ErrorMessage'
import { useForm } from 'react-hook-form'
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import FieldRHF from '../components/FieldRHF'
import CenterContainer from '../components/CenterContainer'

const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		clearErrors,
		setError,
	} = useForm()
	const { login } = useAuth()
	const navigate = useNavigate()

	const onSubmit = (form) => {
		;(async () => {
			try {
				await login(form.email, form.password)
				navigate('/profile')
			} catch (error) {
				setError('firebase', { message: error.message })
			}
		})()
	}

	// === STYLE ===
	const formStyle = css`
		max-width: 400px;
		min-width: 300px;
		.button {
			max-width: fit-content;
			padding: 0.5rem;
			margin: 0.5rem 0;
		}
	`

	return (
		<CenterContainer>
			<h1>Log In</h1>
			<AnimatePresence>
				<motion.form
					key='form'
					css={formStyle}
					onSubmit={handleSubmit(onSubmit)}
					layout>
					<FieldRHF
						className='input'
						labelText='Email *'
						type='text'
						errorMessage={errors.email?.message}
						onChange={clearErrors}
						{...register('email', {
							required: 'email is required',
						})}
					/>
					<FieldRHF
						className='input'
						labelText='Password *'
						type='password'
						errorMessage={errors.password?.message}
						onChange={clearErrors}
						{...register('password', {
							required: 'password is required',
						})}
					/>
					{errors.firebase && (
						<ErrorMessage icon layout>
							{errors.firebase.message}
						</ErrorMessage>
					)}
					<motion.button
						className='button'
						layout
						type='submit'
						onClick={() => clearErrors()}>
						Log in
					</motion.button>
				</motion.form>
				<motion.div key='linkContainer' layout>
					<p>Need an account?</p>
					<Link to='/signup'>Sign Up</Link>
				</motion.div>
			</AnimatePresence>
		</CenterContainer>
	)
}

export default Login
