import { useEffect, useState, FunctionComponent } from 'react'
import '../../../css/card-information-styles.css'
import {Paper} from '@material-ui/core'
import {Skeleton} from '@material-ui/lab'

import { LightTypography } from '../../util/CustomTypography'

import { getDateString, months } from '../../../helper/Dates'
import {Hint} from '../../util/Hints'
import createTable from '../../../helper/TableHelpers'

type args = {
	isLoading: boolean,
	hasInfo: boolean,
	cardID: string
	productInfo: ProductInfo[]
}


const CardProductInformation: FunctionComponent<args> = ({ isLoading, hasInfo, productInfo, cardID }) =>
{
	const [productTable, setProductTable] = useState<JSX.Element | undefined>(undefined)

	useEffect(() => {
		if (productInfo === null || productInfo === undefined || productInfo.length === 0) return

		const headerNames: string[] = ['ID', 'Pos', 'Release', 'Rarities']
		const rowValues: string[][] = [];
		const rowOnClick: { (): void }[] = []

		productInfo.forEach( (product: ProductInfo) => {
			product.productContent.forEach( (productContent: ProductContent ) => {
				const row: [string, string, string ,string] = [ product.productId, productContent.productPosition, getDateString(months, new Date(product.productReleaseDate)), productContent.rarities.join(', ') ]
				rowValues.push(row)
				rowOnClick.push(() => setTimeout( () => window.location.assign(`/product/${product.productId}#${cardID}`), 150 ))
			})

		})

		setProductTable(createTable(headerNames, rowValues, rowOnClick))
	}, [productInfo, cardID])


	return(
		<Paper className={'products card-info-section'} >
			{
				(isLoading)?
					<Skeleton width={150} height={25} />
					: <LightTypography variant='h6' className={'card-info-header'} >
						{'Products'}
					</LightTypography>
			}

			{
				(isLoading)?
					undefined
					: (hasInfo)?
						productTable
						: <Hint variant='subtitle1' backgroundColor='rgba(0, 0, 0, 0.3)' textColor='white'>
							{'Not Found In Any Product'}
						</Hint>
			}
		</Paper>
	)
}

export default CardProductInformation