import React from 'react'
import {Typography, Button} from '@material-ui/core'
import Styled from 'styled-components'


const Title = Styled(Typography)`
	&& {
		white-space: pre-wrap;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;

		color: rgb(255, 255, 255);
		font-weight: 800;

	}
`


const Parent = Styled.div`
	&&
	{
		background: linear-gradient(120deg, #FF4D4B, #DC4240);
		// flex: 0 0 25rem;
		padding: 1rem;
		margin-right: .5rem;
		margin-bottom: .5rem;
		border-radius: .85rem;
		width: 24rem;
	}
`


export default function YouTubeUploads({ thumbnailImg, title, url })
{
	return(
		<Parent>
			<div style={{marginBottom: '1rem', borderRadius: '3rem', borderStyle: 'solid', borderColor: 'rgba(255, 255, 255, .5)', borderWidth: '.4rem'}}>
				<img src={thumbnailImg.src} alt='YouTube Video Thumbnail For Channel: Supreme King' width='100%' style={{borderRadius: '2.6rem' }} />
			</div>


			<div style={{display: 'flex'}}>
				<div style={{flex: '1'}} >
					<Title variant='h6' >
						{title}
					</Title>
				</div>
				<Button style={{marginLeft: '1rem', background: 'rgba(255, 255, 255, .9)', color: 'black', textTransform: 'none'}} onClick={() => window.open(url)} >
					Watch
				</Button>
			</div>
		</Parent>
	)
}