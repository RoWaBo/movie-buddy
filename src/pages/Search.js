import { useState, useEffect } from 'react'
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import SelectorMenu from '../components/SelectorMenu'
import useSearch from '../hooks/useSearch'
import useProfile from '../hooks/useProfile'
import ErrorMessage from '../components/ErrorMessage'
import ProfileListItem from '../components/ProfileListItem'
import { gutter } from '../style/styleVariables'
import GenreDrawer from '../components/GenreDrawer'

const Search = () => {
	const { getAllHandles } = useProfile()
	const { searchProfilesByGenre, searchProfilesByKeyword } = useSearch()
	const [searchInputValue, setSearchInputValue] = useState('')
	const [selectedOption, setSelectedOption] = useState()
	const [searchResult, setSearchResult] = useState([])
	const [allHandles, setAllHandles] = useState([])
	const [error, setError] = useState()

	// Get all handles when selectedOption changes
	useEffect(() => {
		if (allHandles.length > 0) return
		;(async () => {
			try {
				if (selectedOption === 'username') {
					console.log('getAllHandles')
					const allHandles = await getAllHandles()
					setAllHandles([...allHandles])
				}
			} catch (err) {
				setError(err.message)
			}
		})()
	}, [selectedOption, getAllHandles, allHandles])

	// Filter and set searchResults when searchInputValue changes
	useEffect(() => {
		if (searchInputValue === '') return
		;(async () => {
			let filteredSearch = []
			if (selectedOption === 'username') {
				filteredSearch = allHandles.filter(({ handle }) => {
					return handle
						.toLowerCase()
						.includes(searchInputValue.toLowerCase())
				})
			}
			if (selectedOption === 'genre') {
				filteredSearch = await searchProfilesByGenre(
					searchInputValue.toLowerCase()
				)
			}
			if (selectedOption === 'keyword') {
				filteredSearch = await searchProfilesByKeyword(
					searchInputValue.toLowerCase()
				)
			}
			console.log('searchResult set')
			setSearchResult([...filteredSearch])
		})()
	}, [searchInputValue, allHandles, selectedOption])

	// === STYLING ===
	const containerStyle = css`
		.topHeading {
			margin: ${gutter};
		}
		.searchInput {
			display: block;
			padding: 0.5rem;
			margin: ${gutter} ${gutter} 0.5rem ${gutter};
			width: 82%;
		}
		.selectorMenu {
			margin-top: 1rem;
		}
	`

	return (
		<main css={containerStyle}>
			<h1 className='topHeading'>User Search</h1>
			<input
				placeholder={`search by ${selectedOption}`}
				className='searchInput'
				type='text'
				value={searchInputValue}
				onChange={(e) => setSearchInputValue(e.target.value)}
			/>
			<SelectorMenu
				className='selectorMenu'
				options={['Genre', 'Username', 'Keyword']}
				setSelectedOption={setSelectedOption}
				onClick={() => setSearchInputValue('')}
			/>
			{selectedOption === 'genre' && (
				<GenreDrawer
					onClick={(e) => setSearchInputValue(e.target.dataset.name)}
				/>
			)}
			<ul>
				{searchInputValue !== '' &&
					searchResult.map(({ uid, handle, pictureURL }) => (
						<ProfileListItem
							key={uid}
							handle={handle}
							pictureURL={pictureURL}
						/>
					))}
			</ul>
			{error && <ErrorMessage>{error}</ErrorMessage>}
		</main>
	)
}

export default Search
