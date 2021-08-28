import axios, { AxiosError, AxiosResponse } from 'axios'
import { NAME_maps_ROUTE } from '../Routes'
import { History } from 'history'

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID

function handleFetch(endPoint: string, history: History, onJsonReceived: {(res: any): void}) {
	axios
		.get(endPoint, {
			headers: {
				'CLIENT_ID': CLIENT_ID
			}
		})
		.then((res: AxiosResponse) => {
			if (res.status === 200) return res.data
			else
			{
				const err = new Error(res.statusText)
				err.name = res.status.toString()
				throw err
			}
		})
		.then(onJsonReceived)
		.catch((err) => handleRedirect(err, history) )
}


function handleRedirect(err: AxiosError, history: History)
{
	if ( err.name === 'TypeError' )
	{
		history.push(NAME_maps_ROUTE[503])
	}
	history.push(NAME_maps_ROUTE[err.name])
}


export { handleFetch }