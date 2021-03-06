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

const SignUp = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		clearErrors,
		setError,
	} = useForm()
	const { signUp } = useAuth()
	const navigate = useNavigate()
	const [loading, setLoading] = useState(false)

	const onSubmit = async (form) => {
		if (form.password !== form.confirmPassword) {
			return setError('confirmPassword', {
				message: 'Passwords must match',
			})
		}
		try {
			setLoading(true)
			await signUp(form.email, form.password)
			navigate('/')
		} catch (error) {
			setLoading(false)
			setError('firebase', { message: error.message })
		}
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
				<h1>Sign Up</h1>
				<form
					key='form'
					css={formStyle}
					onSubmit={handleSubmit(onSubmit)}>
					<FieldRHF
						className='input'
						labelText='email *'
						type='text'
						errorMessage={errors.email?.message}
						onChange={clearErrors}
						{...register('email', {
							required: 'email is required',
						})}
					/>
					<FieldRHF
						className='input'
						labelText='password *'
						type='password'
						errorMessage={errors.password?.message}
						onChange={clearErrors}
						{...register('password', {
							required: 'password is required',
						})}
					/>
					<FieldRHF
						className='input'
						labelText='confirm password *'
						type='password'
						errorMessage={errors.confirmPassword?.message}
						onChange={clearErrors}
						{...register('confirmPassword')}
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
						Sign up
					</button>
				</form>
				<div key='linkContainer'>
					<p>Already have an account?</p>
					<Link to='/login'>Log In</Link>
				</div>
			</CenterContainer>
		)
	if (loading) return <LoadingGif />
}

export default SignUp
