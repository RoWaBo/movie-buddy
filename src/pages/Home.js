import { useAuth } from '../contexts/AuthContext'
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { gutter } from '../style/styleVariables'

const Home = () => {
	const { currentUser } = useAuth()

	// === STYLE ===
	const mainStyle = css`
		margin: ${gutter};
	`
	return (
		<main css={mainStyle}>
			<h1>
				Welcome to Movie Buddy
				{currentUser && `, ${currentUser.displayName}`}
			</h1>
		</main>
	)
}

export default Home
