import { FunctionComponent } from 'react'

import { Typography, Paper } from '@material-ui/core'
import styled from 'styled-components'

import GenericLinkPhoto from '../util/photo/GenericLinkPhoto'


const CenteredText = styled(Typography)`
	&&
	{
		text-align: center;
	}
`


const HeaderWithSubheader = styled(CenteredText)`
	&&
	{
		margin-bottom: .25rem;
	}
`


const CenteredImage = styled.div`
	text-align: center;
	margin-bottom: 1rem;
	min-height: 100px;
`


const InfoPaper2 = styled(Paper)`
	&&
	{
		max-width: 100%;
		// padding: 1.4rem;
		border-radius: 1.2rem;

		background: white;
	}
`


type AboutInfoCardProps = {
	title: string
	, subtitle: string
	, body: JSX.Element
	, imgPath: string
	, imgLink: string
}


const AboutInfoCard: FunctionComponent<AboutInfoCardProps> = ({title, subtitle, body, imgPath, imgLink}) => (
	<InfoPaper2 style={{maxWidth: '100%'}} >
		<div style={{background: '#FDF4F3', paddingTop: '1.5rem', paddingBottom: '1.5rem', borderTopLeftRadius: '1.2rem', borderTopRightRadius: '1.2rem'}} >
			<CenteredImage >
				<GenericLinkPhoto
					imageName={imgPath}
					link={imgLink}
				/>
			</CenteredImage>
			<HeaderWithSubheader variant='h4'>
				{title}
			</HeaderWithSubheader>
			<CenteredText
				variant='h5'>
				{subtitle}
			</CenteredText>
		</div>

		<br />

		<Typography variant='body1' style={{padding: '1.4rem'}}>
			{body}
		</Typography>
	</InfoPaper2>
)


export default AboutInfoCard