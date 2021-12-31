import { FunctionComponent, memo } from 'react'

import { Breadcrumbs, Link, Box, Typography } from '@mui/material'
import { Skeleton } from '@mui/material'

import HomeIcon from '@mui/icons-material/Home'
import Block from '@mui/icons-material/Block'
import ErrorIcon from '@mui/icons-material/Error'
import InfoIcon from '@mui/icons-material/Info'

import { _SKCSiteRoutes } from '../Routes'

import '../../css/nav/breadcrumb.css'

type BreadcrumbProps = {
	crumbs: string[]
}

const Breadcrumb: FunctionComponent<BreadcrumbProps> = memo(
	({ crumbs }) => {
		var Crumbs: JSX.Element[] = crumbs.map((item: string, ind: number) => {
			if (ind === crumbs.length - 1) {
				return item === '' ? (
					<Skeleton key={item} variant='text' width={50} />
				) : (
					<Link className='breadcrumb' variant='subtitle2' color='inherit' key={item} underline='none'>
						{BreadcrumbStaticFields.BREADCRUMB_maps_ICON.get(item)}
						<Typography className='breadcrumb breadcrumb-text'>{item}</Typography>
					</Link>
				)
			}

			return (
				<Link underline='none' className='breadcrumb' variant='subtitle2' color='inherit' href={_SKCSiteRoutes.NAME_maps_ROUTE[item.replace(' ', '')]} key={item}>
					{BreadcrumbStaticFields.BREADCRUMB_maps_ICON.get(item)}
					<Typography className='breadcrumb breadcrumb-text'>{item}</Typography>
				</Link>
			)
		})

		return (
			<Box className='breadcrumb-parent'>
				<Breadcrumbs separator={'/'} aria-label='breadcrumb'>
					{Crumbs}
				</Breadcrumbs>
			</Box>
		)
	},
	(prevProps, newProps) => {
		if (prevProps.crumbs[prevProps.crumbs.length - 1] !== newProps.crumbs[newProps.crumbs.length - 1]) return false

		return true
	}
)

class BreadcrumbStaticFields {
	static BREADCRUMB_maps_ICON = BreadcrumbStaticFields.getBreadcrumbIcons()

	static getBreadcrumbIcons(): Map<string, JSX.Element> {
		const BREADCRUMB_maps_ICON = new Map()
		BREADCRUMB_maps_ICON.set('Home', <HomeIcon className='breadcrumb breadcrumb-icon' />)
		BREADCRUMB_maps_ICON.set('Ban List', <Block className='breadcrumb breadcrumb-icon' />)
		BREADCRUMB_maps_ICON.set('404 - Err', <ErrorIcon className='breadcrumb breadcrumb-icon' />)
		BREADCRUMB_maps_ICON.set('About', <InfoIcon className='breadcrumb breadcrumb-icon' />)

		return BREADCRUMB_maps_ICON
	}
}

export default Breadcrumb
