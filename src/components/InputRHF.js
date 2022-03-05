import { motion } from 'framer-motion'
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { forwardRef } from 'react'

const InputRHF = forwardRef(({ errorMessage, ...props }, ref) => {
	const input = css`
		display: block;
		outline: none;
	`
	const inputError = css`
		border: 1px solid rgb(239 68 68);
	`
	const errorText = css`
		color: rgb(239 68 68);
	`

	return (
		<>
			<motion.input
				ref={ref}
				{...props}
				css={[input, errorMessage && inputError]}
				layout
				whileFocus={{
					scale: 1.02,
				}}
			/>
			{errorMessage && <p css={errorText}>{errorMessage}</p>}
		</>
	)
})

export default InputRHF
