import { motion } from 'framer-motion'
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { forwardRef } from 'react'

const FieldRHF = forwardRef(({ labelText, errorMessage, ...props }, ref) => {
	// === STYLING ===
	const errorColor = 'rgb(239 68 68)'

	const input = css`
		display: block;
		outline: none;
		width: 100%;
	`
	const inputError = css`
		border: 1px solid ${errorColor};
	`
	const errorText = css`
		font-size: 14px;
		color: ${errorColor};
	`
	const labelStyle = css`
		display: block;
		margin: 1rem 0;
	`
	const labelTextStyle = css`
		text-transform: capitalize;
	`

	return (
		<motion.label layout css={labelStyle}>
			<span css={labelTextStyle}>{labelText}</span>
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
		</motion.label>
	)
})

export default FieldRHF
