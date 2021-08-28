import React, { lazy, useState, useEffect, Suspense } from 'react'
import { Helmet } from 'react-helmet'


import { MainContentContainer } from '../MainContent'
import { handleFetch } from '../../helper/FetchHandler'
import { BanListDates } from './BanListDates'
import NAME_maps_ENDPOINT from '../../helper/DownstreamServices'

import OneThirdTwoThirdsGrid from '../util/grid/OneThirdTwoThirdsGrid'
import { RightBoxPaper, LeftBoxPaper } from '../util/grid/OneThirdTwoThirdsGrid'
import {LightTranslucentDivider} from '../util/Divider'

import {StickyBox} from '../util/StyledContainers'


import BreadCrumb from '../util/Breadcrumb'
const TabbedView = lazy( () => import('./TabbedView') )
const BanListSection = lazy( () => import('./BanListSection') )
const BanListStats = lazy( () => import('./BanListStats') )



export default function BanList(props)
{
	const [banListStartDates, setBanListStartDates] = useState([])
	const [selectedBanList, setSelectedBanList] = useState(undefined)
	const [banListInstanceLinks, setBanListInstanceLinks] = useState([])

	const [forbidden, setForbidden] = useState([])
	const [limited, setLimited] = useState([])
	const [semiLimited, setSemiLimited] = useState([])

	const [numForbidden, setNumForbidden] = useState(0)
	const [numLimited, setNumLimited] = useState(0)
	const [numSemiLimited, setNumSemiLimited] = useState(0)

	const [isSettingUpDates, setIsSettingUpDates] = useState(true)
	const [isFetchingBanList, setIsFetchingBanList] = useState(true)
	const [isDataLoaded, setIsDataLoaded] = useState(false)

	const [newForbiddenCards, setNewForbiddenCards] = useState([])
	const [newLimitedCards, setNewLimitedCards] = useState([])
	const [newSemiLimitedCards, setNewSemiLimitedCards] = useState([])

	const [numNewForbidden, setNumNewForbidden] = useState(undefined)
	const [numNewLimited, setNumNewLimited] = useState(undefined)
	const [numNewSemiLimited, setNumNewSemiLimited] = useState(undefined)

	const [removedCards, setRemovedCards] = useState([])
	const [numRemoved, setNumRemoved] = useState(undefined)


	useEffect(() => {
		handleFetch(NAME_maps_ENDPOINT['banListsUrl'], props.history, (json) => {
			setBanListInstanceLinks(json.banListDates.map(item => item._links['Ban List Content'].href))
			setBanListStartDates(json.banListDates.map(item => item.effectiveDate))
			setIsSettingUpDates(false)
		})
		// eslint-disable-next-line
	}, [])


	useEffect(() => {
		if (banListInstanceLinks.length !== 0)
			setSelectedBanList(banListStartDates[0])
	}, [banListInstanceLinks, banListStartDates])


	useEffect( () => {
		if ( !isFetchingBanList )	setIsDataLoaded(true)
		else	setIsDataLoaded(false)
	}, [isFetchingBanList])


	useEffect(() => {
		if (selectedBanList != null && selectedBanList.length !== 0)
		{
			setIsFetchingBanList(true)

			handleFetch(banListInstanceLinks[banListStartDates.indexOf(selectedBanList)], props.history, (json) => {
				setForbidden( json.banListInstance.forbidden )
				setLimited( json.banListInstance.limited )
				setSemiLimited( json.banListInstance.semiLimited )

				setNumForbidden( (json.banListInstance.numForbidden === undefined)? 0 : json.banListInstance.numForbidden )
				setNumLimited( (json.banListInstance.numLimited === undefined)? 0 : json.banListInstance.numLimited )
				setNumSemiLimited( (json.banListInstance.numSemiLimited === undefined)? 0 : json.banListInstance.numSemiLimited )

				// Removed cards compared to previous ban list
				setRemovedCards(json.banListInstance.removedContent.removedCards)
				setNumRemoved(json.banListInstance.removedContent.numRemoved)

				// Newly added cads compared to previous ban list
				setNewForbiddenCards(json.banListInstance.newContent.newForbidden)
				setNewLimitedCards(json.banListInstance.newContent.newLimited)
				setNewSemiLimitedCards(json.banListInstance.newContent.newSemiLimited)

				setNumNewForbidden(json.banListInstance.newContent.numNewForbidden)
				setNumNewLimited(json.banListInstance.newContent.numNewLimited)
				setNumNewSemiLimited(json.banListInstance.newContent.numNewSemiLimited)

				setIsFetchingBanList(false)
			})

		}
		// eslint-disable-next-line
	}, [selectedBanList])



	return (
		<MainContentContainer >
			<Helmet>
				<title>{`SKC - Ban List: ${selectedBanList}`}</title>
				<meta
					name={`SKC - Ban List: ${selectedBanList}`}
					content={`Ban list content/info for list effective ${selectedBanList}`}
					/>
				<meta name="keywords" content={`YuGiOh, ban list, The Supreme Kings Castle, ${selectedBanList}`} />
			</Helmet>

			<BreadCrumb crumbs={['Home', 'Ban List']} />

			<OneThirdTwoThirdsGrid
				oneThirdComponent={
					<StickyBox>
						<LeftBoxPaper style={{ backgroundImage: 'linear-gradient(315deg, #fc9842 0%, #fe5f75 74%)' }} >

							{(isSettingUpDates)? undefined
								: <BanListDates
								selectedBanList={selectedBanList}
								banListStartDates={banListStartDates}
								setSelectedBanList={ (ind) => setSelectedBanList(banListStartDates[ind]) } />}

							<LightTranslucentDivider />

							<Suspense fallback={undefined} >
								<BanListStats
									totalCardsInSelectedList={numForbidden + numLimited + numSemiLimited}
									selectedBanList={selectedBanList}
									newForbiddenCards={newForbiddenCards}
									newLimitedCards={newLimitedCards}
									newSemiLimitedCards={newSemiLimitedCards}
									numNewForbidden={numNewForbidden}
									numNewLimited={numNewLimited}
									numNewSemiLimited={numNewSemiLimited}
									removedCards={removedCards}
									numRemoved={numRemoved}
								/>
							</Suspense>
						</LeftBoxPaper>
					</StickyBox>
				}
				twoThirdComponent={
					<RightBoxPaper>
								<TabbedView
									numForbidden={numForbidden}
									numLimited={numLimited}
									numSemiLimited={numSemiLimited}
									banList={selectedBanList}
									forbiddenContent={
										<Suspense fallback={undefined} >
											<BanListSection
												sectionName='Forbidden'
												sectionExplanation='Forbidden cards cannot be used in Deck/Side Deck in the Advanced Format'
												sectionExplanationBackground='rgba(255, 69, 87, .17)'
												cards={forbidden}
												newCards={newForbiddenCards}
												isDataLoaded={isDataLoaded}
												cardClicked={(cardID) => window.location.assign(`/card/${cardID}`)}
												banList={selectedBanList}
											/>
										</Suspense>
								}

								limitedContent={
									<Suspense fallback={undefined} >
										<BanListSection
											sectionName='Limited'
											sectionExplanation='Limited cards can be included in Deck/Side deck - max 1'
											sectionExplanationBackground='rgba(255, 108, 18, .17)'
											cards={limited}
											newCards={newLimitedCards}
											isDataLoaded={isDataLoaded}
											cardClicked={(cardID) => window.location.assign(`/card/${cardID}`)}
											banList={selectedBanList}
										/>
									</Suspense>
								}

								semiLimitedContent={
									<Suspense fallback={undefined} >
										<BanListSection
											sectionName='Semi-Limited'
											sectionExplanation='Semi-Limited cards can be included in Deck/Side deck - max 2'
											sectionExplanationBackground='rgba(240, 198, 32, .17)'
											cards={semiLimited}
											newCards={newSemiLimitedCards}
											isDataLoaded={isDataLoaded}
											cardClicked={(cardID) => window.location.assign(`/card/${cardID}`) }
											banList={selectedBanList}
										/>
									</Suspense>
								}
								/>
						</RightBoxPaper>
					}
				/>

		</MainContentContainer>
	)
}
