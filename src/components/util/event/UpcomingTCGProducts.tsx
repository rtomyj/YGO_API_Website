import '../../../css/util/event.css'
import { useCallback, lazy, startTransition, useEffect, useState } from 'react'
import { Alert, Dialog, DialogTitle, IconButton, Skeleton, Snackbar, Typography } from '@mui/material'
import DownstreamServices from '../../../helper/DownstreamServices'
import FetchHandler from '../../../helper/FetchHandler'
import EventItem from './EventItem'
import LinkIcon from '@mui/icons-material/Link'

const GenericNonBreakingErr = lazy(() => import('../exception/GenericNonBreakingErr'))

const UpcomingTCGProducts = () => {
	const [events, setEvents] = useState<HeartApiEventItem[]>([])
	const [eventsUI, setEventsUI] = useState<JSX.Element[]>([])
	const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false)
	const [isFetchingData, setIsFetchingData] = useState(true)
	const [errFetchingData, setErrFetchingData] = useState(false)

	const [eventDialogIsOpen, setEventDialogIsOpen] = useState(false)
	const [eventDialogEventData, setEventDialogEventData] = useState<HeartApiEventItem | undefined>(undefined)

	const upcomingTCGProductsCB = (eventOutput: HeartApiEventOutput) => {
		setEvents(eventOutput.events)
		setIsFetchingData(false)
	}

	useEffect(() => {
		startTransition(() => {
			FetchHandler.handleFetch(`${DownstreamServices.HEART_API_HOST_NAME}/api/v1/events?service=skc&tags=product-release`, upcomingTCGProductsCB, false)?.catch((_err) => {
				setErrFetchingData(true)
				setIsFetchingData(false)
			})
		})
	}, [])

	useEffect(() => {
		const eUI = events.map((event: HeartApiEventItem) => (
			<EventItem key={`${event.name} ${event.createdAt}`} event={event} showEventDialog={setEventDialogIsOpen} setEventDialogEventData={setEventDialogEventData} />
		))

		startTransition(() => {
			setEventsUI(eUI)
		})
	}, [events])

	const handleSnackbarIsClosed = useCallback(() => setIsSnackbarOpen(false), [isSnackbarOpen])

	const handleShowSnackbar = useCallback(() => {
		navigator.clipboard.writeText(`${window.location.href}#upcoming-tcg-products`)
		setIsSnackbarOpen(true)
	}, [isSnackbarOpen])

	const handleDisplayDialog = useCallback(() => setEventDialogIsOpen(false), [eventDialogIsOpen])

	return (
		<div id='upcoming-tcg-products' style={{ marginBottom: '3.5rem' }}>
			<img src={'/assets/yugioh-tcg-official-logo.png'} />
			<div className='event-header-container search-icon-container'>
				<Typography className='event-header' variant='h4'>
					Upcoming Yu-Gi-Oh! TCG Products
				</Typography>
				<IconButton onClick={handleShowSnackbar}>
					<LinkIcon />
				</IconButton>
			</div>

			{!isFetchingData && <div className='event-container'>{eventsUI}</div>}
			{!isFetchingData && errFetchingData && (
				<div style={{ backgroundColor: 'white', maxWidth: '60rem', padding: '1rem', borderRadius: '1rem' }}>
					<GenericNonBreakingErr errExplanation='Come back at a different time to see upcoming TCG products!' />
				</div>
			)}
			{isFetchingData && <Skeleton variant='rectangular' height='280' width='100%' className='rounded-skeleton' />}

			<Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} open={isSnackbarOpen} autoHideDuration={3000} onClose={handleSnackbarIsClosed}>
				<Alert onClose={handleSnackbarIsClosed} severity='success'>
					Link copied to clipboard. Share that shit!
				</Alert>
			</Snackbar>

			<Dialog maxWidth='xs' onClose={handleDisplayDialog} open={eventDialogIsOpen}>
				<DialogTitle>TCG Product Details</DialogTitle>
				{eventDialogEventData != undefined ? <EventItem event={eventDialogEventData} /> : undefined}
			</Dialog>
		</div>
	)
}

export default UpcomingTCGProducts
