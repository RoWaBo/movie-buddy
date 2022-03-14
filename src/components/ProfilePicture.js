/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

const ProfilePicture = ({ big, medium, pictureURL, alt, ...props }) => {
	const size = () => {
		if (big) return '200px'
		if (medium) return '100px'
		return '60px'
	}
	const pictureSelector = () =>
		pictureURL ? pictureURL : '/assets/defaultprofilepic.png'

	const pictureStyle = css`
		width: ${size()};
		height: ${size()};
		object-fit: cover;
		object-position: center;
		border-radius: 50%;
		border: 1px solid rgb(0 0 0 / 10%);
		box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
	`

	return <img src={pictureSelector()} alt={alt} css={pictureStyle} {...props} />
}

export default ProfilePicture
