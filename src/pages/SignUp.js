import { AnimatePresence, motion } from 'framer-motion'
import ErrorMessage from '../components/ErrorMessage'
import { useForm } from 'react-hook-form'
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import FieldRHF from '../components/FieldRHF'
import CenterContainer from '../components/CenterContainer'

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

	const onSubmit = async (form) => {
		if (form.password !== form.confirmPassword) {
			return setError('confirmPassword', { message: 'Passwords must match' })
		}
		try {
			await signUp(form.email, form.password)
			navigate('/profile')
		} catch (error) {
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

	return (
		<CenterContainer>
			<h1>Sign Up</h1>
			<AnimatePresence>
				<motion.form
					key='form'
					css={formStyle}
					onSubmit={handleSubmit(onSubmit)}
					layout>
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
						<ErrorMessage icon layout>
							{errors.firebase.message}
						</ErrorMessage>
					)}
					<motion.button
						className='button'
						layout
						type='submit'
						onClick={() => clearErrors()}>
						Sign up
					</motion.button>
				</motion.form>
				<motion.div key='linkContainer' layout>
					<p>Already have an account?</p>
					<Link to='/login'>Log In</Link>
				</motion.div>
			</AnimatePresence>
		</CenterContainer>
	)
}

export default SignUp
