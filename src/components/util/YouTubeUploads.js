import React, {useEffect, useState} from 'react'
import { RightBoxHeaderTypography, RightBoxSubHeaderTypography } from './grid/OneThirdTwoThirdsGrid'

import VideoInfoContainer from './VideoInfoContainer'

import { Skeleton } from '@material-ui/lab'


export default function YouTubeUploads({ youtubeData })
{
	const [videos, setVideos] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
			if (youtubeData !== undefined)
			{
				setVideos(youtubeData.videos.map(item => {
					const img = new Image()
					img.src = item.thumbnailUrl
					return(
						<VideoInfoContainer
							thumbnailImg={img}
							title={item.title}
							description={item.description}
							url={item.url}
						/>
					)
				}))
				setIsLoading(false)
			}
	}, [youtubeData])


	return(
		<div >
			<RightBoxHeaderTypography variant='h4'>
				YouTube
			</RightBoxHeaderTypography>
			<RightBoxSubHeaderTypography variant='h5'>
				Catch Up On Previous Uploads
			</RightBoxSubHeaderTypography>

			{(isLoading === true)
				? <Skeleton width='100%' height='24rem' style={{transform: 'none', borderRadius: '2rem'}} />:
				<div style={{display: 'grid', gridAutoFlow: 'column', gridTemplateRows: 'auto auto', overflowX: 'scroll', paddingBottom: '.75rem', maxWidth: '100%'}}>
					{videos}
				</div>
			}

		</div>
	)
}