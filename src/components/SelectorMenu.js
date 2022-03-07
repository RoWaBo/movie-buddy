/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const SelectorMenu = ({ options, setSelectedOption }) => {
	const [selectedItemI, setSelectedItemI] = useState(1)

	useEffect(() => {
		setSelectedOption(options[selectedItemI].toLowerCase())
	}, [selectedItemI, options, setSelectedOption])

	// === STYLING ===
	const listStyle = css`
		border-radius: 10px;
		border: 1px solid rgba(0, 0, 0, 0.2);
		display: flex;
		justify-content: space-between;
	`
	const itemStyle = css`
		width: 100%;
		height: 100%;
		border-radius: 10px;
		padding: 1rem 1.5rem;
		text-align: center;
		position: relative;
		color: rgba(0, 0, 0, 0.7);
	`
	const itemBackground = css`
		position: absolute;
		top: 0;
		right: 0;
		width: 100%;
		height: 100%;
		background: #3b82f6;
		border-radius: 10px;
		z-index: -1;
	`

	// === ANIMATION VARIANTS ===

	return (
		<>
			<section>
				<ul css={listStyle}>
					{options.map((item, i) => (
						<motion.li
							css={itemStyle}
							key={i}
							layout
							onTap={() => setSelectedItemI(i)}
							animate={
								i === selectedItemI ? { color: 'rgb(255 255 255)' } : {}
							}
							transition={{ duration: 0.2 }}>
							{item}
							{i === selectedItemI && (
								<motion.div
									css={itemBackground}
									layoutId='itemBackground'
									transition={{ duration: 0.2 }}
								/>
							)}
						</motion.li>
					))}
				</ul>
			</section>
		</>
	)
}

export default SelectorMenu
