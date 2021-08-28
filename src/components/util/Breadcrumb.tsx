import { FunctionComponent, memo } from 'react'
import '../../css/breadcrumb.css'

import {Breadcrumbs, Link, Box, Typography} from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

import HomeIcon from '@material-ui/icons/Home'
import Block from '@material-ui/icons/Block'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info';

import { NAME_maps_ROUTE } from '../../Routes'


type BreadcrumbProps = {
	crumbs: string[]
}


const Breadcrumb: FunctionComponent<BreadcrumbProps> = memo( ( { crumbs }  ) =>
{
	var Crumbs: JSX.Element[] = crumbs.map((item: string, ind: number) =>
	{
		if ((ind === crumbs.length - 1))
		{
			return(
				(item === '') ?
					<Skeleton
						key={item}
						variant='text'
						width={ 50 }
					/>
					: <Link
						className='breadcrumb'
						variant='subtitle2'
						color='inherit'
						key={item}
						underline='none' >
							{ BreadcrumbStaticFields.BREADCRUMB_maps_ICON.get(item) }
							<Typography className='breadcrumb breadcrumb-text' >{ item }</Typography>
					</Link>
			)
		}

		return(
			<Link
				className='breadcrumb'
				variant='subtitle2'
				color='inherit'
				href={ NAME_maps_ROUTE[item.replace(' ', '')] }
				key={item} >
					{ BreadcrumbStaticFields.BREADCRUMB_maps_ICON.get(item) }
					<Typography className='breadcrumb breadcrumb-text' >{ item }</Typography>
			</Link>
		)
	})

	return(
		<Box className='breadcrumb-parent' >
			<Breadcrumbs
				separator={'/'}
				aria-label='breadcrumb' >
					{ Crumbs }
			</Breadcrumbs>
		</Box>
	)
}, (prevProps, newProps) => {
	if ( prevProps.crumbs[prevProps.crumbs.length - 1] !== newProps.crumbs[newProps.crumbs.length - 1] )
		return false

	return true
})

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