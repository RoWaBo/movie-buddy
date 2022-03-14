import { HiOutlineDotsVertical } from 'react-icons/hi'
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

const PageHeading = ({ heading, menuItems, ...props }) => {
	const [menuIsOpen, setMenuIsOpen] = useState(false)
	const toggleMenu = () => setMenuIsOpen(!menuIsOpen)

	// close menu if clicking outside menuListItems
	useEffect(() => {
		if (!menuItems) return
		const checkIfClickedOutside = (e) => {
			e.target.className !== 'menuListItem' && setMenuIsOpen(false)
		}
		document.addEventListener('mousedown', checkIfClickedOutside)
		return () => {
			document.removeEventListener('mousedown', checkIfClickedOutside)
		}
	}, [menuItems])

	// === STYLE ===
	const headingStyle = css`
		display: flex;
		align-items: center;
		position: relative;
		.heading {
			margin-right: auto;
		}
		.menuIcon {
			font-size: 1.5rem;
			color: rgba(0, 0, 0, 0.8);
		}
		.menuList {
			width: 100px;
			background: white;
			border: 1px solid rgba(0, 0, 0, 0.1);
			border-radius: 5px;
			padding: 0.5rem;
			position: absolute;
			right: 0;
			top: 0;
			box-shadow: rgba(99, 99, 99, 0.1) 0px 2px 8px 0px;

			& > * + * {
				margin-top: 0.5rem;
			}
		}
	`
	return (
		<header css={headingStyle} {...props}>
			<h1 className='heading'>{heading}</h1>
			{menuItems && (
				<>
					<HiOutlineDotsVertical
						className='menuIcon'
						onClick={toggleMenu}
					/>
					{menuIsOpen && (
						<ul className='menuList' onClick={toggleMenu}>
							{menuItems.map((item, i) => (
								<li
									className='menuListItem'
									key={i}
									onClick={item.onClick}>
									{item.name}
								</li>
							))}
						</ul>
					)}
				</>
			)}
		</header>
	)
}

export default PageHeading
