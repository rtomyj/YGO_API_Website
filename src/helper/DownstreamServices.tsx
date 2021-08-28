const API_HOST = process.env.REACT_APP_API_HOST

const NAME_maps_ENDPOINT = {
	'banListsUrl':				`${API_HOST}/api/v1/ban_list/dates`,
	'cardInstanceUrl':			`${API_HOST}/api/v1/card/`,
	'databaseStats':				`${API_HOST}/api/v1/stats`,
	'search':				`${API_HOST}/api/v1/card/search`,
	'browseCriteria':				`${API_HOST}/api/v1/card/browse/criteria`,
	'browse':				`${API_HOST}/api/v1/card/browse`,
	'productDetails':				`${API_HOST}/api/v1/product`,
	'productBrowse':				`${API_HOST}/api/v1/products/en`

}


const HEART_API_HOST_NAME = process.env.REACT_APP_HEART_API_HOST

export default NAME_maps_ENDPOINT

export {HEART_API_HOST_NAME}