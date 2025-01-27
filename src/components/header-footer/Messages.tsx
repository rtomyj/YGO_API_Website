import '../../css/header-footer/navigation-icon.css'
import '../../css/header-footer/messages.css'

import { useState, useEffect, Fragment, startTransition, useCallback, JSX } from 'react'
import { Typography, IconButton, Popover, Badge } from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications'

import DownstreamServices from '../../helper/DownstreamServices'
import FetchHandler from '../../helper/FetchHandler'
import MessageItemComponent from './MessageItemComponent'
import { GenericNonBreakingErr } from 'skc-rcl'

function Messages() {
	const [messagesAnchor, setMessagesAnchor] = useState<HTMLButtonElement | undefined>(undefined)
	const [messagesList, setMessagesList] = useState<JSX.Element[]>([])

	const [numMessages, setNumMessages] = useState(0)
	const [numNewMessages, setNumNewMessages] = useState(0)

	const [newestMessageSeen, setNewestMessageSeen] = useState<string>('')
	const [errorFetchingMessages, setErrorFetchingMessages] = useState(false)

	const isDisplayingNotifications = Boolean(messagesAnchor)

	const onMessageDataReceived = (messageData: HeartAPI.Message) => {
		const totalMessages = messageData.messages.length

		let _numNewMessages = 0
		const previousNewestMessageTimeStamp = localStorage.getItem('previousNewestMessage') as string
		const previousNewestMessageDate = new Date(previousNewestMessageTimeStamp)

		startTransition(() => {
			setMessagesList(
				messageData.messages.map((message: HeartAPI.MessageInstance, index: number) => {
					const creationDate = new Date(message.createdAt)

					if (previousNewestMessageDate < creationDate) {
						_numNewMessages++
					}

					return <MessageItemComponent key={message.createdAt} creationDate={creationDate} message={message} isLastMessage={index === totalMessages - 1} />
				})
			)
			setNumNewMessages(_numNewMessages)
			setNumMessages(totalMessages)
			setNewestMessageSeen(messageData.messages[0].createdAt)
		})
	}

	useEffect(() => {
		FetchHandler.handleFetch(`${DownstreamServices.HEART_API_ENDPOINTS.messages}?service=skc&tags=skc-site,skc-api`, onMessageDataReceived, false)?.catch(() => {
			startTransition(() => {
				setErrorFetchingMessages(true)
			})
		})
	}, [])

	const handleMessagesIconClicked = useCallback((event: React.MouseEvent<HTMLButtonElement>) => setMessagesAnchor(event.currentTarget), [])

	const handleMessagePopupClosed = useCallback(() => {
		setNumNewMessages(0)
		setMessagesAnchor(undefined)
		localStorage.setItem('previousNewestMessage', newestMessageSeen)
	}, [numNewMessages, messagesAnchor, newestMessageSeen])

	return (
		<Fragment>
			<Badge className='communication-message-badge' badgeContent={numNewMessages} variant='standard' color='error'>
				<IconButton className='styled-icon-button' onClick={handleMessagesIconClicked} aria-label='show 17 new notifications' color='inherit'>
					<NotificationsIcon />
				</IconButton>
			</Badge>

			<Popover
				className='popover'
				id={isDisplayingNotifications ? 'notification-popover' : undefined}
				open={isDisplayingNotifications}
				anchorEl={messagesAnchor}
				onClose={handleMessagePopupClosed}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
			>
				<div className='communication-popper-container'>
					<Typography className='communication-message-body' variant='h2'>
						🚨 Messages {errorFetchingMessages ? '⁉️' : `(${numMessages})`}
					</Typography>
					<br />

					{errorFetchingMessages ? <GenericNonBreakingErr errExplanation='No meaningful impact to the site functionality expected.' /> : messagesList}
				</div>
			</Popover>
		</Fragment>
	)
}

export default Messages
