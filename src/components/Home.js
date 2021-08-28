
import React, { useEffect, useState, lazy, Suspense } from 'react'
import { Helmet } from 'react-helmet'

import { Typography, Link } from '@material-ui/core'
import { MainContentContainer } from './MainContent'
import { handleFetch } from '../helper/FetchHandler'
import NAME_maps_ENDPOINT from '../helper/DownstreamServices'
import {StickyBox} from './util/StyledContainers'

import OneThirdTwoThirdsGrid from './util/grid/OneThirdTwoThirdsGrid'

import { LeftBoxPaper, RightBoxPaper, RightBoxHeaderTypography, RightBoxSubHeaderTypography } from './util/grid/OneThirdTwoThirdsGrid'

import {HEART_API_HOST_NAME} from '../helper/DownstreamServices'

const Breadcrumb = lazy(() => import('./util/Breadcrumb'))
const DatabaseSearch = lazy(() => import('./util/DatabaseSearch'))
const YouTubeUploads = lazy(() => import('./util/YouTubeUploads'))
const SocialMedia = lazy(() => import('./util/SocialMedia'))
const DatabaseInfo = lazy(() => import('./util/database-info/DatabaseInfo'))


export default function Home({ history }) {
	const [cardTotal, setCardTotal] = useState(0)
	const [banListTotal, setBanListTotal] = useState(0)
	const [productTotal, setProductTotal] = useState(0)

	const [youtubeData, setYoutubeData] = useState(undefined)

	useEffect(() => {
		handleFetch(NAME_maps_ENDPOINT['databaseStats'], history, (json) => {
			setCardTotal(json.cardTotal)
			setBanListTotal(json.banListTotal)
			setProductTotal(json.productTotal)
		})


		handleFetch(`${HEART_API_HOST_NAME}/v1/yt/channel/uploads?channelId=UCBZ_1wWyLQI3SV9IgLbyiNQ`, history, json => {
			setYoutubeData(json)
		})
	}, [history])


	return (
		<MainContentContainer>
			<Helmet>
				<title>The Supreme Kings Castle</title>
				<meta
					name={`The Supreme Kings Castle`}
					content={`YuGiOh Site for checking; card information, current and past ban lists, search cards, and browse cards.`}
					/>
				<meta name="keywords" content={`YuGiOh, ban list, card info, The Supreme Kings Castle`} />
			</Helmet>

			<Suspense>
				<Breadcrumb crumbs={['Home']} />
				<DatabaseSearch history={history} />
				<DatabaseInfo cardTotal={cardTotal} banListTotal={banListTotal} productTotal={productTotal} />
			</Suspense>

			<OneThirdTwoThirdsGrid
				mirrored={true}
				oneThirdComponent={
					<StickyBox >
						<LeftBoxPaper>
							<SocialMedia />
						</LeftBoxPaper>
					</StickyBox>
				}
				twoThirdComponent={
					<div style={{maxWidth: '100%'}}>
						<RightBoxPaper >
							<RightBoxHeaderTypography variant='h4' >
								Yo!
							</RightBoxHeaderTypography>

							<RightBoxSubHeaderTypography variant='h5'>
								Welcome To The BEST Yu-Gi-Oh! Site
							</RightBoxSubHeaderTypography>

							<Typography variant='body1' >
								This is a site dedicated to Yu-Gi-Oh! content. The main differences between this site and others is that this site is incredibly fast and intuitive and has no Ads or trackers.
							</Typography>

							<br />

							<Typography variant='body1' >
								Yugioh is ever expanding and evolving. New products are continuously released and new ban lists established. As such this website will also  be continuously updated to accommodate.
								Want to learn more? Check out the <Link color='secondary' href='/about'><strong>About</strong></Link> section
							</Typography>
						</RightBoxPaper>
						<div style={{maxWidth: '100%', marginTop: '2.25rem', marginBottom: '2.25rem' }} >
							<RightBoxPaper >
								<YouTubeUploads history={history} youtubeData={youtubeData} />
							</RightBoxPaper>
						</div>
					</div>
					}
				/>

		</MainContentContainer>
	)
}