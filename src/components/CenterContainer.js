/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

const CenterContainer = ({ children, ...props }) => {
	const containerStyle = css`
		width: 100%;
		height: 100%;
		min-height: 100vh;
		display: grid;
		place-content: center;
	`
	return (
		<div {...props} css={containerStyle}>
			{children}
		</div>
	)
}

export default CenterContainer
