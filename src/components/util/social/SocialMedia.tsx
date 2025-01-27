import { Fragment, FunctionComponent } from 'react'
import { Typography } from '@mui/material'

const SocialMedia: FunctionComponent = () => {
	return (
		<Fragment>
			<Typography variant='h5'>Join The Discord</Typography>
			<Typography variant='body1'>
				Use Discord to chat with others within the community. This is my personal server I use with friends. There are chats for you fine people there too! Lets grow the community!
			</Typography>
			<br />

			<iframe
				title='Discord Widget'
				style={{ borderRadius: '1rem', height: '30rem' }}
				src='https://discord.com/widget?id=659477868799197185&theme=light'
				width='100%'
				sandbox='allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts'
			/>
		</Fragment>
	)
}

export default SocialMedia
