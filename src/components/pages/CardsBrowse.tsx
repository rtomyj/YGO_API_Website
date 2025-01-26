import '../../css/util/database-search-styles.css'
import '../../css/main-pages/card-browse.css'

import { useState, useEffect, lazy, useReducer, startTransition, Suspense } from 'react'
import { Skeleton, Typography } from '@mui/material'

import FetchHandler from '../../helper/FetchHandler'
import DownstreamServices from '../../helper/DownstreamServices'

import CardBrowse from '../util/search/CardBrowse'
import { SKCTable, Section } from 'skc-rcl'
import cardDisplayGridReducer, { CardDisplayGridStateReducerActionType } from '../../reducers/CardDisplayGridReducer'
import cardBrowseReducer from '../../reducers/CardBrowseCriteriaReducer'

import '../../css/util/headline.css'

const CardDisplayGrid = lazy(() => import('../util/grid/CardDisplayGrid'))
const Breadcrumb = lazy(() => import('../header-footer/Breadcrumb'))

function generateBrowseQueryURL(selectedCriteria: YGOData.CardBrowseValues[]) {
	const criteriaMap = new Map()
	criteriaMap.set('cardColors', [])
	criteriaMap.set('attributes', [])
	criteriaMap.set('monsterTypes', [])
	criteriaMap.set('monsterSubTypes', [])
	criteriaMap.set('levels', [])
	criteriaMap.set('ranks', [])
	criteriaMap.set('linkRatings', [])

	selectedCriteria.forEach((criteria: YGOData.CardBrowseValues) => {
		switch (criteria.name) {
			case 'cardColors':
			case 'attributes':
			case 'monsterTypes':
			case 'monsterSubTypes':
				criteriaMap.get(criteria.name).push(criteria.value)
				break
			case 'levels':
				criteriaMap.get(criteria.name).push(criteria.value.replace('Level ', ''))
				break
			case 'ranks':
				criteriaMap.get(criteria.name).push(criteria.value.replace('Rank ', ''))
				break
			case 'linkRatings':
				criteriaMap.get(criteria.name).push(criteria.value.replace('Link Rating ', ''))
				break
		}
	})

	return `${DownstreamServices.NAME_maps_ENDPOINT.browse}?cardColors=${criteriaMap.get('cardColors').join(',')}&attributes=${criteriaMap
		.get('attributes')
		.join(',')}&monsterTypes=${criteriaMap.get('monsterTypes').join(',')}&monsterSubTypes=${criteriaMap.get('monsterSubTypes').join(',')}&levels=${criteriaMap
		.get('levels')
		.join(',')}&ranks=${criteriaMap.get('ranks').join(',')}&linkRatings=${criteriaMap.get('linkRatings').join(',')}`
}

export default function BrowseCards() {
	const [{ selectedCriteria }, browseCriteriaDispatch] = useReducer(cardBrowseReducer, { selectedCriteria: [] })

	const [cardGridState, cardDisplayGridDispatch] = useReducer(cardDisplayGridReducer, {
		results: [],
		totalResults: 0,
		totalDisplaying: 0,
		numItemsToLoadWhenNeeded: 50,
		isLoading: false,
	})

	const [skcCardBrowseCriteriaOutput, setSkcCardBrowseCriteriaOutput] = useState<YGOData.CardBrowseCriteria>({} as YGOData.CardBrowseCriteria)

	const browseSummaryStats: string[][] = []
	browseSummaryStats.push(['Total', cardGridState.totalResults.toString()])
	browseSummaryStats.push(['Displaying', cardGridState.totalDisplaying.toString()])

	useEffect(() => {
		FetchHandler.handleFetch<YGOData.CardBrowseCriteria>(DownstreamServices.NAME_maps_ENDPOINT.browseCriteria, (json) => {
			setSkcCardBrowseCriteriaOutput(json)
		})
	}, [])

	useEffect(() => {
		if (selectedCriteria === undefined || selectedCriteria.length === 0) {
			cardDisplayGridDispatch({ type: CardDisplayGridStateReducerActionType.CLEAR_GRID })
		} else {
			cardDisplayGridDispatch({ type: CardDisplayGridStateReducerActionType.LOADING_GRID })
			startTransition(() => {
				FetchHandler.handleFetch<YGOData.CardBrowseResults>(generateBrowseQueryURL(selectedCriteria), (json) => {
					cardDisplayGridDispatch({
						type: CardDisplayGridStateReducerActionType.INIT_GRID,
						results: json.results,
						totalResults: json.numResults,
						totalDisplaying: 50,
					})
				})
			})
		}
	}, [selectedCriteria])

	return (
		<div className='generic-container'>
			<title>{`SKC - Card Browser`}</title>
			<meta name={`SKC - Card Browser`} content={`Browse all cards in database to find the right card you want.`} />
			<meta name='keywords' content={`YuGiOh, card browse, The Supreme Kings Castle`} />

			<Suspense fallback={<Skeleton className='breadcrumb-skeleton' variant='rectangular' width='100%' height='2.5rem' />}>
				<Breadcrumb crumbs={['Home', 'Card Browse Tool']} />
			</Suspense>

			<div className='headline-v1'>
				<Section sectionHeaderBackground='product' sectionName='Current Criteria'>
					<div className='section-content'>
						<CardBrowse browseCriteriaDispatch={browseCriteriaDispatch} selectedCriteria={selectedCriteria} skcCardBrowseCriteriaOutput={skcCardBrowseCriteriaOutput} />
					</div>
				</Section>

				<div className='group light-shadow'>
					<Typography variant='h3' align='center'>
						Results
					</Typography>
					{<SKCTable header={[]} rows={browseSummaryStats} />}
				</div>
			</div>

			<Section sectionHeaderBackground='product' sectionName='Browse Results'>
				<div className='section-content'>
					<Typography variant='h5'>Results Are Sorted Alphabetically</Typography>
					<CardDisplayGrid cardGridState={cardGridState} dispatch={cardDisplayGridDispatch} />
				</div>
			</Section>
		</div>
	)
}
