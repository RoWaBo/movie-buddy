/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { maxWidth } from '../style/styleVariables'

const Wrapper = ({ children }) => {
	const wrapperStyle = css`
		max-width: ${maxWidth};
		min-height: 100vh;
		width: 100%;
		height: 100%;
		margin: 0 auto;
		box-shadow: rgba(149, 157, 165, 0.1) 0px 8px 24px;
		border: 1px solid rgba(149, 157, 165, 0.2);
		position: relative;
	`

	return <div css={wrapperStyle}>{children}</div>
}

export default Wrapper
