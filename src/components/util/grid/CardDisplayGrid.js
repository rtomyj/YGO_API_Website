import React, {useState, useEffect, memo, useRef} from 'react'

import { Grid, IconButton, Box } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';


import CardImageRounded from '../../card/CardImageRounded'

import YGOCard from '../../card/YGOCard'

import { Hint } from '../../util/Hints'

import Styled from 'styled-components'


async function getPlaceholderCardComponent()
{
	const placeHolder = []

	var i = 0;
	for (i = 0; i < 20; i++)
	{
		placeHolder.push(<Grid
			key={`skeleton-${i}`}
			item
			xs={6}
			sm={4}
			md={4}
			lg={3}
			xl={2}
			style={{ padding: '.3rem' }} >
				<Skeleton variant='rect' height='170' width='100%'  style={{borderRadius: '4rem', marginBottom: '1rem'}} />
				<Skeleton variant='rect' width='100%' height='100' />
		</Grid>)
	}

	return placeHolder
}

const GridItem = Styled(Grid)`
	&&
	{
		border-radius: 1.2rem;
		padding: .3rem;
		cursor: pointer;

		:hover
		{
			background: #eee;
		}
	}
`



const CardDisplayGrid = memo( ({ cardJsonResults, numResultsDisplayed, numItemsToLoadWhenNeeded, loadMoreCallback, isLoadMoreOptionVisible, showFooter=true, numResults, isDataLoaded, target}) =>
{
	const [cardGridUI, setCardGridUI] = useState([])

	const [cardGridUISkeleton, setCardGridUISkeleton] = useState([])
	const [clearGrid, setClearGrid] = useState(false)

	const rrr = useRef(null)

	const renderCards = () =>
	{
		return cardJsonResults.slice(numResultsDisplayed - numItemsToLoadWhenNeeded, numResultsDisplayed).map( (card, index) => {

			return <GridItem
				ref={(card.cardID === target)? rrr : null}
				id={card.cardID}
				key={card.cardID}
				item
				xs={6}
				sm={4}
				md={4}
				lg={3}
				xl={2}
				style={{  }}
				onClick={ () => window.location.assign(`/card/${card.cardID}`) } >


				<CardImageRounded
					cardImg={`https://images.thesupremekingscastle.com/cards/x-sm/${card.cardID}.jpg`}
					timeout={index % 20 * 10}
					/>

				<YGOCard
					isNew={ false }
					cardName={card.cardName}
					cardColor={card.cardColor}
					cardEffect={card.cardEffect}
					monsterType={card.monsterType}
					cardID={card.cardID}
					fullDetails={ false }
					effectMaxLineHeight={3}
				/>
			</GridItem>
		})
	}


	useEffect( () => {
		if (isDataLoaded === false) getPlaceholderCardComponent().then( placeholders => setCardGridUISkeleton(placeholders) )
	}, [isDataLoaded])


	useEffect( () => {
		if (numResults === 0)
		{
			setClearGrid(true)
			return
		}

		setCardGridUI([...cardGridUI, ...renderCards()])
	}, [numResultsDisplayed, cardJsonResults, numResults])


	useEffect( () => {
		if (clearGrid === true)
		{
			setCardGridUI([])
			setClearGrid(false)
		}
	}, [clearGrid])


	useEffect( () => {
		if (rrr.current !== null)	window.scrollTo(0, rrr.current.offsetTop)
	}, [cardGridUI])


	return(
		<Box style={{maxWidth: '100%'}} >
			<Grid container >
				{(!isDataLoaded)? cardGridUISkeleton : (numResults === 0)?
					<Hint variant='h5' >{'No Content To Show'}</Hint>: cardGridUI}
			</Grid>

			{
				(!isDataLoaded)?
				undefined :
				<IconButton
					onClick={ () => loadMoreCallback()}
					style={(isLoadMoreOptionVisible)? {display: 'block', margin: 'auto', background: '#310e68', backgroundImage: 'linear-gradient(316deg, #310e68 0%, #5f0f40 74%)', color: 'rgba(255, 255, 255, .95)', marginTop: '1.5rem', marginBottom: '1.5rem'} : {display: 'none'}} >
					<ExpandMoreRoundedIcon />
				</IconButton>
			}
		</Box>
	)
}, (prevProps, newProps) => {
	if ( prevProps.isDataLoaded !== newProps.isDataLoaded || prevProps.numResults !== newProps.numResults || prevProps.numResultsDisplayed !== newProps.numResultsDisplayed || prevProps.cardJsonResults !== newProps.cardJsonResults )
		return false

	return true
})

export default CardDisplayGrid