/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import ProfilePicture from '../components/ProfilePicture'

export default function ProfileListItem({ handle, pictureURL }) {
	const itemStyle = css`
		display: flex;
		margin: 1rem 0;

		.heading {
			margin-left: 1rem;
			padding: 0.3rem 0;
		}
	`
	return (
		<li css={itemStyle}>
			<ProfilePicture pictureURL={pictureURL} alt={handle} />
			<h3 className='heading'>{handle}</h3>
		</li>
	)
}
