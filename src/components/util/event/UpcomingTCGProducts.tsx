import '../../../css/util/event.css'
import { Alert, IconButton, Snackbar, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import DownstreamServices from '../../../helper/DownstreamServices'
import Fetch from '../../../helper/FetchHandler'
import EventItem from './EventItem'
import LinkIcon from '@mui/icons-material/Link'

const UpcomingTCGProducts = () => {
	const [events, setEvents] = useState<HeartApiEventItem[]>([])
	const [eventsUI, setEventsUI] = useState<JSX.Element[]>([])
	const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false)

	const upcomingTCGProductsCB = (eventOutput: HeartApiEventOutput) => {
		setEvents(eventOutput.events)
	}

	useEffect(() => {
		Fetch.handleFetch(`${DownstreamServices.HEART_API_HOST_NAME}/api/v1/events?service=skc&tags=product-release`, upcomingTCGProductsCB, false)?.catch((_err) => {
			// setErrorFetchingMessages(true)
		})
	}, [])

	useEffect(() => {
		const eUI = events.map((event: HeartApiEventItem) => <EventItem event={event} />)

		setEventsUI(eUI)
	}, [events])

	return (
		<div className='event-container-end'>
			<div className='event-header-container search-icon-container'>
				<IconButton
					onClick={() => {
						navigator.clipboard.writeText(`${window.location.href}#upcoming-tcg-products`)
						setIsSnackbarOpen(true)
					}}
				>
					<LinkIcon />
				</IconButton>
				<Typography className='event-header' variant='h4'>
					Upcoming Yu-Gi-Oh! TCG Products
				</Typography>
			</div>

			<div className='event-container'>{eventsUI}</div>
			<Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} open={isSnackbarOpen} autoHideDuration={3000} onClose={() => setIsSnackbarOpen(false)}>
				<Alert onClose={() => setIsSnackbarOpen(false)} severity='success'>
					Link copied to clipboard
				</Alert>
			</Snackbar>
		</div>
	)
}

export default UpcomingTCGProducts
