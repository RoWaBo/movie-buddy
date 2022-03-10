import { useState, useEffect } from 'react'
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import SelectorMenu from '../components/SelectorMenu'
import useSearch from '../hooks/useSearch'
import useProfile from '../hooks/useProfile'
import ErrorMessage from '../components/ErrorMessage'
import ProfileListItem from '../components/ProfileListItem'

const Search = () => {
	const { getAllHandles } = useProfile()
	const { searchByHandle } = useSearch()
	const [searchInputValue, setSearchInputValue] = useState('')
	const [selectedOption, setSelectedOption] = useState()
	const [searchResult, setSearchResult] = useState([])
	const [allHandles, setAllHandles] = useState([])
	const [error, setError] = useState()

	useEffect(() => {
		if (allHandles.length > 0) return
		;(async () => {
			try {
				if (selectedOption === 'username') {
					const allHandles = await getAllHandles()
					setAllHandles([...allHandles])
				}
			} catch (err) {
				setError(err.message)
			}
		})()
	}, [selectedOption, getAllHandles, allHandles])

	useEffect(() => {
		if (searchInputValue === '') return
		const filteredHandles = allHandles.filter(({ handle }) => {
			return handle.toLowerCase().includes(searchInputValue.toLowerCase())
		})
		setSearchResult([...filteredHandles])
	}, [searchInputValue, allHandles])

	const handleSubmit = async () => {
		if (searchInputValue === '') return

		console.log('Search: ', searchInputValue)
		console.log('Selected Option: ', selectedOption)

		let result

		if (selectedOption === 'username') {
			result = await searchByHandle(searchInputValue)
			console.log(result)
		}
		setSearchResult([...result])
	}

	// === STYLING ===
	const containerStyle = css`
		.topHeading {
			margin: 2rem 0;
		}
		.input,
		button {
			display: block;
			padding: 0.5rem;
		}
		.selectorMenu {
			margin: 1rem 0;
		}
	`

	return (
		<main css={containerStyle}>
			<h1 className='topHeading'>User Search</h1>
			<input
				placeholder='search'
				className='input'
				type='text'
				value={searchInputValue}
				onChange={(e) => setSearchInputValue(e.target.value)}
			/>
			<SelectorMenu
				className='selectorMenu'
				options={['Genre', 'Username', 'Keywords']}
				setSelectedOption={setSelectedOption}
			/>
			{/* <button onClick={handleSubmit}>Search</button> */}
			<ul>
				{searchInputValue !== '' &&
					selectedOption === 'username' &&
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
