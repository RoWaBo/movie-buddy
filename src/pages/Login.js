import ErrorMessage from '../components/ErrorMessage'
import { useForm } from 'react-hook-form'
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import FieldRHF from '../components/FieldRHF'
import CenterContainer from '../components/CenterContainer'
import { useState } from 'react'
import LoadingGif from '../components/LoadingGif'

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
	const [loading, setLoading] = useState(false)

	const onSubmit = (form) => {
		;(async () => {
			try {
				setLoading(true)
				await login(form.email, form.password)
				navigate('/')
			} catch (error) {
				setLoading(false)
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

	if (!loading)
		return (
			<CenterContainer>
				<h1>Log In</h1>
				<form
					key='form'
					css={formStyle}
					onSubmit={handleSubmit(onSubmit)}>
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
						<ErrorMessage icon>
							{errors.firebase.message}
						</ErrorMessage>
					)}
					<button
						className='button'
						type='submit'
						onClick={() => clearErrors()}>
						Log in
					</button>
				</form>
				<div key='linkContainer'>
					<p>Need an account?</p>
					<Link to='/signup'>Sign Up</Link>
				</div>
			</CenterContainer>
		)
	if (loading) return <LoadingGif />
}

export default Login
