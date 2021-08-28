import { useEffect, useState, FunctionComponent } from 'react'
import '../../../css/card-information-styles.css'
import {Paper,} from '@material-ui/core'
import {Skeleton} from '@material-ui/lab'
import { LightTypography } from '../../util/CustomTypography'

import { getDateString, months } from '../../../helper/Dates'
import {Hint} from '../../util/Hints'

import createTable from '../../../helper/TableHelpers'

type args = {
	isLoading: boolean,
	hasInfo: boolean,
	banListInfo: BanListInfo[]
}

type BanListInfo = {
	banListDate: string,
	banStatus: string
}

const CardBanListInformation: FunctionComponent<args> = ({ isLoading, hasInfo, banListInfo } ) =>
{

	const [banListTable, setBanListTable] = useState<JSX.Element | undefined>(undefined)

	useEffect(() => {
		if (banListInfo === null || banListInfo === undefined || banListInfo.length === 0) return

		const headerNames: string[] = ['Date', 'Status']
		const rowValues: string[][] = banListInfo.map( (banList: BanListInfo) => [getDateString(months, new Date(banList.banListDate)), banList.banStatus])

		const banListTable: JSX.Element = createTable(headerNames, rowValues)

		setBanListTable(banListTable)
	}, [banListInfo])


	return(
		<Paper className={'ban-lists card-info-section'} >
			{
				(isLoading)?
					<Skeleton width={150} height={25} />
					: <LightTypography variant='h6' className={'card-info-header'} >
						{'Ban Lists'}
					</LightTypography>
			}

			{
				(isLoading)?
					undefined
					: (hasInfo)?
						banListTable
						: <Hint variant='subtitle1' backgroundColor='rgba(0, 0, 0, 0.3)' textColor='white'>
							{'Not Found In Any Ban List'}
						</Hint>
			}
		</Paper>
	)
}

export default CardBanListInformation