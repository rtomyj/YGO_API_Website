import { useState, useEffect, lazy, FunctionComponent } from 'react'
import { Helmet } from 'react-helmet'

import { MainContentContainer } from '../MainContent'

import {handleFetch} from '../../helper/FetchHandler'
import NAME_maps_ENDPOINT from '../../helper/DownstreamServices'
import {RightBoxPaper, RightBoxHeaderTypography, RightBoxSubHeaderTypography, RightBoxHeaderContainer} from '../util/grid/OneThirdTwoThirdsGrid'

import createTable from '../../helper/TableHelpers'
import { getDateString, months } from '../../helper/Dates'
import { History } from 'history'

const Breadcrumb = lazy( () => import('../util/Breadcrumb') )

type args = {
	history: History
}

const ProductBrowse:FunctionComponent<args> = ({history}) =>
{
	const [productJson, setProductJson] = useState([])
	const [productGridItems, setProductGridItems] = useState<JSX.Element | undefined>(undefined)
	const [isDataLoaded, setIsDataLoaded] = useState(false)


	useEffect( () => {
		handleFetch(NAME_maps_ENDPOINT['productBrowse'], history, json => {
			setProductJson(json.products)
			setIsDataLoaded(true)
		})
	}, [])


	useEffect( () => {
		const headers: string[] = ['Name', 'ID', 'Type', 'Sub-Type', 'Release']
		const rowOnClick: {(): void}[] = []
		const productRows: string[][] =  productJson.map( (product: ProductInfo): string[] => {
			rowOnClick.push( () => window.location.assign(`/product/${product.productId}`) )
			return [product.productName!, product.productId, product.productType!, product.productSubType!, getDateString(months, new Date(product.productReleaseDate))]
		})

		setProductGridItems(createTable(headers, productRows, rowOnClick))

	}, [productJson])


	return (
		<MainContentContainer style={{}} >
			<Helmet>
				<title>{`SKC - Product Browser`}</title>
				<meta
					name={`SKC - Product Browser`}
					content={`Browse all products in database to check the progression of YuGiOh.`}
					/>
				<meta name="keywords" content={`YuGiOh, product browse, The Supreme Kings Castle`} />
			</Helmet>


			<Breadcrumb crumbs={ ['Home', 'Product Browse'] } />

			<RightBoxPaper>
				<RightBoxHeaderContainer >
					<RightBoxHeaderTypography variant='h4' >
						Products In Database
					</RightBoxHeaderTypography>
					<RightBoxSubHeaderTypography variant='h5' >
						Sorted By Release Date
					</RightBoxSubHeaderTypography>
				</ RightBoxHeaderContainer>

				<div style={{ backgroundImage: 'linear-gradient(326deg, #a4508b 0%, #5f0a87 74%)', paddingTop: '2rem', paddingBottom: '2rem', borderRadius: '2rem' }} >
					{(isDataLoaded)? productGridItems : undefined}
				</div>
			</RightBoxPaper>

		</MainContentContainer>
	)
}

export default ProductBrowse