import { useState } from 'react'
import CenterContainer from '../components/CenterContainer'
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import SelectorMenu from '../components/SelectorMenu'

const Search = () => {
	const [searchInputValue, setSearchInputValue] = useState('')
	const [selectedOption, setSelectedOption] = useState()

	const containerStyle = css`
		.topHeading {
			margin-bottom: 2rem;
		}
		.input {
			display: block;
		}
	`

	const handleSubmit = (e) => {
		e.preventDefault()
		console.log('Search: ', searchInputValue)
		console.log('Selected Option: ', selectedOption)
	}

	return (
		<CenterContainer css={containerStyle}>
			<h1 className='topHeading'>User Search</h1>
			<h2 className='subHeading'>Search options</h2>
			<SelectorMenu
				options={['Genre', 'Username', 'Keywords']}
				setSelectedOption={setSelectedOption}
			/>
			<form onSubmit={handleSubmit}>
				<label className='label'>
					Search
					<input
						className='input'
						type='text'
						value={searchInputValue}
						onChange={(e) => setSearchInputValue(e.target.value)}
					/>
				</label>
				<button type='submit'>Search</button>
			</form>
		</CenterContainer>
	)
}

export default Search
