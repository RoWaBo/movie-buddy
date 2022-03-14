/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import useProfile from '../hooks/useProfile'
import { gutter } from '../style/styleVariables'
import { useState, useEffect } from 'react'
import LoadingGif from '../components/LoadingGif'
import ErrorMessage from '../components/ErrorMessage'
import { useParams } from 'react-router-dom'
import ProfilePicture from '../components/ProfilePicture'
import PageHeading from '../components/PageHeading'
import { useAuth } from '../contexts/AuthContext'
import useMenus from '../hooks/useMenus'

const Profile = () => {
	const { getUserProfileByUid } = useProfile()
	const [profile, setProfile] = useState()
	const [error, setError] = useState(false)
	const params = useParams()
	const { currentUser } = useAuth()
	const { currentUserProfileMenu } = useMenus()

	const pageHeadingMenuControl = () => {
		if (currentUser.uid === params.uid) return currentUserProfileMenu
		return null
	}

	useEffect(() => {
		if (profile || !params) return
		;(async () => {
			try {
				const profile = await getUserProfileByUid(params.uid)
				setProfile(profile)
			} catch (error) {
				setError(error.message)
			}
		})()
	}, [profile, getUserProfileByUid, params])
	// === STYLE ===
	const mainStyle = css`
		margin: ${gutter};

		.pageHeading {
			margin-bottom: 2rem;
		}
	`
	if (profile)
		return (
			<main css={mainStyle}>
				<PageHeading
					className='pageHeading'
					heading='Profile'
					menuItems={pageHeadingMenuControl()}
				/>
				<ProfilePicture big pictureURL={profile?.pictureURL} />
				<p>{profile.name}</p>
				{error && <ErrorMessage icon>{error}</ErrorMessage>}
			</main>
		)
	if (!profile) return <LoadingGif />
}

export default Profile
