import React from 'react'

import { Badge } from '@material-ui/core'

import styled from 'styled-components'

import { YGOCard } from './YGOCard'


const CardBadge = styled(Badge)`
	&&
	{
		width: 100%;
		marginRight: 10px;

		.MuiBadge-badge {
			margin-right: 2.0rem;
			margin-bottom: .2rem;
			color: white;
		}
	}
`

const YGOCardStyled = styled(YGOCard)`
	&&{
		width: 100%;
	}
`


export default function CardDetails( { isNew, cardName, cardColor, cardEffect, monsterType, monsterAtk, monsterDef, cardClicked, cardID, fullDetails } )
{

	const cardClickedCallBack = (cardClicked) ? function () { cardClicked(cardID) } : undefined

	return (
		<CardBadge
			onClick={ cardClickedCallBack }
			badgeContent='NEW'
			variant='standard'
			overlap='rectangular'
			color='secondary'
			invisible={ !isNew } >
				<YGOCardStyled
					cardName={cardName}
					cardColor={cardColor}
					cardEffect={cardEffect}
					monsterType={monsterType}
					monsterAtk={monsterAtk}
					monsterDef={monsterDef}
					cardClicked={cardClicked}
					cardID={cardID}
					fullDetails={fullDetails}
					effectMaxLineHeight={2}
				/>
		</CardBadge>
	)

}
