
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { throttle } from 'underscore'

import { InputBase, Paper, IconButton, Avatar } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete'
import { handleFetch } from '../../helper/FetchHandler'
import NAME_maps_ENDPOINT from '../../helper/DownstreamServices'

import {RenderGroup, SearchSuggestionTypography} from './Search'

const DBSearch = styled(Autocomplete)`
	&&&
	{
		.MuiAutocomplete-popper
		{
			background-color: black;
		}
	}
`

const CardAvatar = styled(Avatar)`
	&& {
		margin-right: .75rem;
		&&.MuiAvatar-root {
			width: 60px;
			height: 60px;
		}
	}
`


const searchThrottle = throttle((searchSubject, setSearchOptions, history) => {
	handleFetch(`${NAME_maps_ENDPOINT['search']}?limit=10&cName=${searchSubject}`, history, json => { setSearchOptions(json) })
}, 15)


export default function DatabaseSearch({ history }) {

	const [searchInput, setSearchInput] = useState('')
	const [searchOptions, setSearchOptions] = useState([])

	useEffect(() => {
		if (searchInput !== '') {
			searchThrottle(searchInput, setSearchOptions, history)
		}
	} , [searchInput, history])


	return (
		<Paper style={{ display: 'flex', maxWidth: '500px', margin: '0 auto', borderRadius: '2.5rem', marginBottom: '2rem' }} >
			<DBSearch
				id='search'
				clearOnEscape
				selectOnFocus
				style={{ flex: '1' }}
				noOptionsText={(searchInput === '') ? 'Type For Suggestions' : 'No Results'}
				getOptionLabel={option => option.cardName}
				options={searchOptions}
				groupBy={option => option.cardColor}
				onChange={ (event, value, reason) => {
					if (reason === 'select-option') { window.location.assign(`/card/${value.cardID}`) }
				}
				}
				renderGroup={option => {
					return (
						<RenderGroup
							group={option.group}
							children={option.children}
						/>
					)
				}}
				renderInput={(params) => (
					<div style={{ display: 'flex', padding: '.2rem', paddingLeft: '1rem', paddingRight: '1rem' }} >
						<InputBase
							ref={params.InputProps.ref}
							inputProps={params.inputProps}
							style={{ color: 'rgba(0,0,0,.90)', flex: '1', margin: '.65rem', fontSize: '1.1rem' }}
							placeholder='Search database for specific card...'
							onChange={event => { setSearchInput(event.target.value) }}
						/>
						<IconButton >
							<SearchIcon style={{fontSize: '2.1rem'}} />
						</IconButton>
					</div>
				)}
				renderOption={option => {
					const CARD_NAME = option.cardName
					const UPPERCASE_CARD_NAME = CARD_NAME.toUpperCase()
					const UPPERCASE_SEARCH_TERM = searchInput.toUpperCase()

					const INDEX_OF_SEARCH_TERM = UPPERCASE_CARD_NAME.indexOf(UPPERCASE_SEARCH_TERM)
					const LENGTH_OF_SEARCH_TERM = UPPERCASE_SEARCH_TERM.length

					return (
						<div style={{display: 'flex', width: '100%'}} >
							<CardAvatar alt={`${CARD_NAME}-Avatar`} src={`https://images.thesupremekingscastle.com/cards/tn/${option.cardID}.jpg`} />
							<div style={{ padding: '0rem', margin: '0rem' }} >
								<SearchSuggestionTypography variant='body1'>
									{CARD_NAME.slice(0, INDEX_OF_SEARCH_TERM)}
									<strong>{CARD_NAME.slice(INDEX_OF_SEARCH_TERM, INDEX_OF_SEARCH_TERM + LENGTH_OF_SEARCH_TERM)}</strong>
									{CARD_NAME.slice(INDEX_OF_SEARCH_TERM + LENGTH_OF_SEARCH_TERM)}
								</SearchSuggestionTypography>
								<SearchSuggestionTypography variant='body1' style={{ color: 'rgb(81,99,114)' }} >{option.monsterType}</SearchSuggestionTypography>
							</div>
						</div>
					)
				}}
			/>
		</Paper>
	)
}