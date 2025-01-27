import { Typography } from '@mui/material'
import { FC, JSX, useEffect, useState } from 'react'
import { decodeHTML } from 'entities'
import { YGOCardWithPreviousBanStatus } from 'skc-rcl'

type CardsWithDifferentStatusProps = {
	newStatusName: 'Forbidden' | 'Limited' | 'Semi Limited' | 'Unlimited' | 'Limited One' | 'Limited Two' | 'Limited Three'
	cards: YGOBanList.PreviousBanListStatus[]
	numCards: number
}

const CardsWithDifferentStatus: FC<CardsWithDifferentStatusProps> = ({ newStatusName, cards, numCards }) => {
	const [cardsWithNewStatus, setCardsWithNewStatus] = useState<JSX.Element[]>([])

	useEffect(() => {
		setCardsWithNewStatus(
			cards.map((newStatus: YGOBanList.PreviousBanListStatus) => {
				const card: YGOCard.Deets = newStatus.card
				card.cardEffect = decodeHTML(card.cardEffect)

				return <YGOCardWithPreviousBanStatus key={`${newStatusName}-${card.cardID}`} card={card} previousBanStatus={newStatus.previousBanStatus} />
			})
		)
	}, [cards])

	return numCards === 0 ? null : (
		<div className='cards-with-different-status-parent very-light-shadow'>
			<Typography variant='h4'>
				Newly {newStatusName} ({numCards})
			</Typography>

			<div className='cards-with-different-status-content'>{cardsWithNewStatus}</div>
		</div>
	)
}

export default CardsWithDifferentStatus
