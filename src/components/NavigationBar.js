import React from 'react'

import { AppBar, Toolbar, Typography, Link } from '@material-ui/core'

import { NAME_maps_ROUTE } from '../Routes.tsx'

export default function NavigationBar()
{
	return (
		<AppBar position='static' className='app-bar-container' >
			<Toolbar
				className='app-bar' >
				<Link
					underline='none'
					color='inherit'
					href={NAME_maps_ROUTE.Home} >
					<Typography
						className='app-bar-button'
						color='inherit' >
						Supreme Kings Castle [BETA]
					</Typography>
				</Link>

			</Toolbar>


			<div
				className='scrollable-nav' >
				<Link
					underline='none'
					color='inherit'
					href={ NAME_maps_ROUTE.Home } >
					<Typography
						className='nav-button'
						color='inherit'
						>
						Home
					</Typography>
				</Link>

				<Link
					underline='none'
					color='inherit'
					href={ NAME_maps_ROUTE.BanList } >
					<Typography
						className='nav-button' color='inherit' >
						Ban List
					</Typography>
				</Link>

				<Link
					underline='none'
					color='inherit'
					href={ NAME_maps_ROUTE.CardBrowse } >
					<Typography
						className='nav-button' color='inherit' >
						Card Browse
					</Typography>
				</Link>

				<Link
					underline='none'
					color='inherit'
					href={ NAME_maps_ROUTE.ProductBrowse } >
					<Typography
						className='nav-button' color='inherit' >
						Product Browse
					</Typography>
				</Link>

				<Link
					underline='none'
					color='inherit'
					href={ NAME_maps_ROUTE.About } >
					<Typography
						className='nav-button' color='inherit' >
						About
					</Typography>
				</Link>

			</div>
		</AppBar>
	)
}