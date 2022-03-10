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
		<label css={labelStyle}>
			<span css={labelTextStyle}>{labelText}</span>
			<input ref={ref} {...props} css={[input, errorMessage && inputError]} />
			{errorMessage && <p css={errorText}>{errorMessage}</p>}
		</label>
	)
})

export default FieldRHF
