/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import axios from 'axios'
import { useEffect, useState } from 'react'

const GenreDrawer = ({ ...props }) => {
	const [genres, setGenres] = useState()

	useEffect(() => {
		;(async () => {
			const { data } = await axios('movieGenres.json')
			setGenres(data.genres)
		})()
	}, [])

	const genreListStyle = css`
		display: flex;
		overflow-x: scroll;
		padding: 0.5rem;

		.genreListItem {
			min-width: fit-content;
			height: fit-content;
			padding: 0.5rem;
			margin: 0.3rem;
			text-align: center;
			text-transform: capitalize;
			border: 1px solid rgba(0, 0, 0, 0.3);
			border-radius: 20px;
			box-shadow: rgba(99, 99, 99, 0.1) 0px 2px 8px 0px;
			font-size: 14px;
		}
	`

	return (
		<ul css={genreListStyle}>
			{genres?.map((genre) => (
				<li
					key={genre.id}
					className='genreListItem'
					data-name={genre.name}
					{...props}>
					{genre.name}
				</li>
			))}
		</ul>
	)
}

export default GenreDrawer
