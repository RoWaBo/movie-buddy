import { NavLink } from 'react-router-dom'
import { HiHome } from 'react-icons/hi'
import { RiShieldKeyholeFill } from 'react-icons/ri'
import { GoSearch } from 'react-icons/go'
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import ProfilePicture from './ProfilePicture'
import useProfile from '../hooks/useProfile'
import { useState, useEffect } from 'react'
import { maxWidth } from '../style/styleVariables'

const Navigation = () => {
	const { getCurrentUserProfile } = useProfile()
	const [profilePicture, setProfilePicture] = useState()

	useEffect(() => {
		if (profilePicture) return
		;(async () => {
			const profile = await getCurrentUserProfile()
			profile && setProfilePicture(profile.pictureURL)
		})()
	}, [profilePicture, getCurrentUserProfile])

	const activeLinkStyleIf = (isActive) => {
		const activeLink = {
			boxShadow:
				'inset 6px 6px 10px 0 rgba(0, 0, 0, 0.2), inset -6px -6px 10px 0 rgba(255, 255, 255, 0.5)',
		}

		return isActive ? activeLink : null
	}

	// === STYLING ===
	const navStyle = css`
		position: sticky;
		bottom: 0;
		max-width: ${maxWidth};
		margin: 0 auto;
		padding: 0.6rem 2.5rem;
		background: #fffcfd;
		box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
		border-radius: 15px 15px 0 0;
	`
	const listStyle = css`
		display: flex;
		justify-content: space-between;
		align-items: center;
	`

	const itemStyle = css`
		font-size: 1.8rem;
	`
	const linkStyle = css`
		padding: 0.6rem;
		display: flex;
		transition: 0.25s;

		border-radius: 50%;
		box-shadow: 12px 12px 24px 0 rgba(0, 0, 0, 0.2),
			-12px -12px 24px 0 rgba(255, 255, 255, 0.5);

		& > svg {
			color: #3b3c3a;
		}
	`
	const pictureStyle = css`
		width: 48px;
		height: 48px;
	`
	const noPaddingStyle = css`
		padding: 0;
	`

	return (
		<nav css={navStyle}>
			<ul css={listStyle}>
				<li css={itemStyle}>
					<NavLink
						to='/login'
						css={linkStyle}
						style={({ isActive }) => activeLinkStyleIf(isActive)}>
						<RiShieldKeyholeFill />
					</NavLink>
				</li>
				<li css={itemStyle}>
					<NavLink
						to='/'
						css={linkStyle}
						style={({ isActive }) => activeLinkStyleIf(isActive)}>
						<HiHome />
					</NavLink>
				</li>
				<li css={itemStyle}>
					<NavLink
						to='/search'
						css={linkStyle}
						style={({ isActive }) => activeLinkStyleIf(isActive)}>
						<GoSearch />
					</NavLink>
				</li>
				<li css={itemStyle}>
					<NavLink
						to='/editprofile'
						css={[linkStyle, noPaddingStyle]}
						style={({ isActive }) => activeLinkStyleIf(isActive)}>
						<ProfilePicture
							pictureURL={profilePicture}
							css={pictureStyle}
						/>
					</NavLink>
				</li>
			</ul>
		</nav>
	)
}

export default Navigation
