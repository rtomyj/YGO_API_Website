import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from './components/Home'
import BanList from './components/banlist/BanList'
import About from './components/about/About'
import ServerError from './components/exception/server_err'
import NotFound from './components/exception/not_found'


const NAME_maps_ROUTE =
{
	'Home': '/',
	'BanList': '/ban_list',
	'About': '/about',
	'ServerError': '/server_err'
}


export default function Routes()
{
	return (
		<Router >
			<Switch>
				<Route path={NAME_maps_ROUTE.Home} exact component={Home} />
				<Route path={NAME_maps_ROUTE.BanList} exact component={BanList} />
				<Route path={NAME_maps_ROUTE.About} exact component={About} />
				<Route path={NAME_maps_ROUTE.ServerError} exact component={ServerError} />
				<Route component={NotFound} />
			</Switch>
		</Router>
	)
}


export { NAME_maps_ROUTE }