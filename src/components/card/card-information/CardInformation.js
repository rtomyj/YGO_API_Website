import React, { useState, useEffect, lazy, Suspense } from 'react'
import {Helmet} from 'react-helmet'
import { Skeleton } from '@material-ui/lab'

import { handleFetch } from '../../../helper/FetchHandler'
import NAME_maps_ENDPOINT from '../../../helper/DownstreamServices'
import { MainContentContainer } from '../../MainContent'
import OneThirdTwoThirdsGrid from '../../util/grid/OneThirdTwoThirdsGrid'

const Breadcrumb = lazy( () => import('../../util/Breadcrumb') )
const CardData = lazy( () => import('./CardData') )


const Card = ( { match, history } ) =>
{

	if (Card.cardId === null || Card.cardID === undefined)
	{
		Card.cardID = match.params.cardId

		const cardImage = new Image()
		cardImage.src = `https://images.thesupremekingscastle.com/cards/lg/${Card.cardID}.jpg`
		Card.cardImg = cardImage
	}

	const [isLoading, setIsLoading] = useState(true)

	const [cardName, setCardName] = useState(undefined)
	const [cardColor, setCardColor] = useState(undefined)
	const [cardEffect, setCardEffect] = useState(undefined)
	const [cardAttribute, setCardAttribute] = useState(undefined)
	const [monsterType, setMonsterType] = useState(undefined)
	const [monsterAtk, setMonsterAtk] = useState(undefined)
	const [monsterDef, setMonsterDef] = useState(undefined)
	const [monsterAssociation, setMonsterAssociation] = useState(undefined)

	const [productInfo, setPackInfo] = useState([])
	const [banListInfo, setBanListInfo] = useState([])

	const [dynamicCrumbs, setDynamicCrumbs] = useState([...Card.crumbs, ''])

	useEffect( () => {

		handleFetch(`${NAME_maps_ENDPOINT['cardInstanceUrl']}${Card.cardID}?allInfo=true`, history, (json) => {
			setDynamicCrumbs([...Card.crumbs, json.cardID])

			setCardName(json.cardName)
			setCardColor(json.cardColor)
			setCardEffect(json.cardEffect)
			setCardAttribute(json.cardAttribute)
			setMonsterType(json.monsterType)
			setMonsterAtk(json.monsterAttack)
			setMonsterDef(json.monsterDefense)
			setMonsterAssociation(json.monsterAssociation)

			setPackInfo( (json.foundIn === undefined)? [] : json.foundIn )
			setBanListInfo( (json.restrictedIn === undefined)? [] : json.restrictedIn )
			setIsLoading(false)
		})
	}, [history])


	return (
		<MainContentContainer >
		<Helmet>
			<title>SKC - Card: {Card.cardID}</title>
			<meta
				name={`SKC - Card: ${Card.cardID}`}
				content={`Information for YuGiOh card ${cardName} such as ban lists it was in, products it can be found in, effect/stats, etc.`}
				/>
			<meta name="keywords" content={`YuGiOh, The Supreme Kings Castle, card, ${cardName}, ${Card.cardID}, ${cardColor}`} />
		</Helmet>

		<Breadcrumb crumbs={ dynamicCrumbs } />

		<OneThirdTwoThirdsGrid
			oneThirdComponent={
				<CardData
					cardName={cardName}
					cardColor={cardColor}
					cardEffect={cardEffect}
					cardAttribute={cardAttribute}
					monsterType={monsterType}
					monsterAtk={monsterAtk}
					monsterDef={monsterDef}
					monsterAssociation={monsterAssociation}
					cardID={Card.cardID}
					isLoading={isLoading}
					cardImg={Card.cardImg}
				/>
			}
			twoThirdComponent=
				{
					<Suspense fallback={<Skeleton width='100%' height='20rem' />} >
						{ loadRelatedContent(isLoading) }
					</Suspense>
				}
			/>

		</MainContentContainer>
	)

	function loadRelatedContent(isLoading) {
		if (!isLoading) {
			const CardInformationRelatedContent = lazy( () => import('./CardInformationRelatedContent') )
			return <CardInformationRelatedContent cardName={cardName}
				isLoading={isLoading}
				cardID={Card.cardID}
				productInfo={productInfo}
				banListInfo={banListInfo} />
		}
	}
}


Card.crumbs = ['Home', 'Card Browse']
export default Card