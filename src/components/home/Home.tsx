import { useEffect, useState, lazy, Suspense } from 'react'
import { Helmet } from 'react-helmet'

import { MainContentContainer } from '../util/MainContent'
import { handleFetch } from '../../helper/FetchHandler'
import NAME_maps_ENDPOINT from '../../helper/DownstreamServices'
import { StickyBox } from '../util/StyledContainers'

import OneThirdTwoThirdsGrid from '../util/grid/OneThirdTwoThirdsGrid'
import Section from '../util/Section'

import DatabaseInfo from '../util/database-info/DatabaseInfo'

const Breadcrumb = lazy(() => import('../header-footer/Breadcrumb'))
const Welcome = lazy(() => import('./Welcome'))
const YouTubeData = lazy(() => import('./YouTubeData'))
const SocialMedia = lazy(() => import('../util/social/SocialMedia'))

export default function Home() {
	const [cardTotal, setCardTotal] = useState(0)
	const [banListTotal, setBanListTotal] = useState(0)
	const [productTotal, setProductTotal] = useState(0)

	useEffect(() => {
		handleFetch(NAME_maps_ENDPOINT['databaseStats'], (json) => {
			setCardTotal(json.cardTotal)
			setBanListTotal(json.banListTotal)
			setProductTotal(json.productTotal)
		})
	}, [])

	return (
		<MainContentContainer>
			<Helmet>
				<title>The Supreme Kings Castle</title>
				<meta name={`The Supreme Kings Castle`} content={`YuGiOh Site for checking; card information, current and past ban lists, search cards, and browse cards.`} />
				<meta name='keywords' content={`YuGiOh, ban list, card info, The Supreme Kings Castle`} />
			</Helmet>

			<Suspense fallback={null}>
				<Breadcrumb crumbs={['Home']} />
				<DatabaseInfo cardTotal={cardTotal} banListTotal={banListTotal} productTotal={productTotal} />
			</Suspense>

			<OneThirdTwoThirdsGrid
				mirrored={true}
				oneThirdComponent={
					<StickyBox>
						<Section sectionName='Social' sectionContent={<SocialMedia />} />
					</StickyBox>
				}
				twoThirdComponent={
					<Section
						sectionName='Welcome'
						sectionContent={
							<div>
								<Welcome />
								<YouTubeData />
							</div>
						}
					/>
				}
			/>
		</MainContentContainer>
	)
}
