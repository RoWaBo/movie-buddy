/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

const Wrapper = ({ children }) => {
	const wrapperStyle = css`
		max-width: 600px;
		min-height: 100vh;
		width: 100%;
		height: 100%;
		margin: 0 auto;
		padding: 2rem;
		box-shadow: rgba(149, 157, 165, 0.1) 0px 8px 24px;
	`

	return <div css={wrapperStyle}>{children}</div>
}

export default Wrapper
