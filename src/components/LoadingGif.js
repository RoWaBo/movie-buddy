/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import CenterContainer from './CenterContainer'

const LoadingGif = () => {
	const imgStyle = css`
		width: 150px;
		height: 150px;
	`
	return (
		<CenterContainer>
			<img
				css={imgStyle}
				src='assets/moviebuddyloading.gif'
				alt='loading animation'
			/>
		</CenterContainer>
	)
}

export default LoadingGif
