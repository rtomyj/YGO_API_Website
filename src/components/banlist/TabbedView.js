import React, { useState, useEffect, memo } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { AppBar, Tabs, Tab, Badge } from '@material-ui/core'

import { TabPanel } from './TabPanel'



const SummaryBadge = styled(Badge)`
	&& {
		.MuiBadge-badge {
			right: -.45rem;
			top: -.65rem;
			color: white;
		}
	}
`

const CustomTabs = styled(Tabs)`
	&&
	{
		.MuiTabs-flexContainer
		{
			height: 65px;
		}

		.MuiTab-textColorPrimary.Mui-selected {
			background: #fff6e9;
			font-weight: 700;
		}


		@media screen and (min-width: 0px)
		{
			.MuiTab-root {
				min-width: 0;
			}
		}

	}
`

const TabbedView = memo( ( { numForbidden, numLimited, numSemiLimited, forbiddenContent, limitedContent, semiLimitedContent } ) =>
{
	const [currentTab, setCurrentTab] = useState(0)
	const [tabs, setTabs] = useState([])

	useEffect( () => {
		const tabs = []
		tabs.push(
			<Tab
				key='forbidden'
				style={{'textTransform': 'none'}}
				label={
					<SummaryBadge
						badgeContent={ numForbidden }
						variant='standard'
						color='secondary'
						overlap='rectangular' >
						Forbidden
					</SummaryBadge>
				}
				{...allyProps(0) }
			/>
		)

		tabs.push(
			<Tab
				key='limited'
				style={{ 'textTransform': 'none' }}
				label={
					<SummaryBadge
						badgeContent={ numLimited }
						variant='standard'
						color='secondary'
						overlap='rectangular' >
						Limited
					</SummaryBadge>
				}
				{...allyProps(1) }
			/>
		)

		tabs.push(
			<Tab
				key='semiLimited'
				style={{ 'textTransform': 'none' }}
				label={
					<SummaryBadge
						badgeContent={ numSemiLimited }
						variant='standard'
						color='secondary'
						overlap='rectangular' >
						Semi-Limited
					</SummaryBadge>
				}
				{...allyProps(2) }
			/>)

		setTabs(tabs)
	}, [ numForbidden, numLimited, numSemiLimited ])


		return (
			<div  >
				<AppBar
					style={{boxShadow: 'none'}}
					position='static'
					color='transparent'>
					<CustomTabs
						textColor='primary'
						value={currentTab}
						onChange={(event, newValue) => { setCurrentTab(newValue)}}
						variant='fullWidth' >
						{tabs}
					</CustomTabs>
				</AppBar>

				<TabPanel value={ currentTab } index={0}>
					{ forbiddenContent }
				</TabPanel>

				<TabPanel value={ currentTab } index={1}>
					{ limitedContent }
				</TabPanel>

				<TabPanel value={ currentTab } index={2}>
					{ semiLimitedContent }
				</TabPanel>
			</div>
		)
}, (prevProps, nextProps) => {
	if (prevProps.forbiddenContent !== nextProps.forbiddenContent || prevProps.limitedContent !== nextProps.limitedContent || prevProps.semiLimitedContent !== nextProps.semiLimitedContent || prevProps.banList !== nextProps.banList)	return false
	return true
})

function allyProps(index)
{
	return {
		id: `full-width-tab-${index}`,
		'aria-controls': `full-width-tabpanel-${index}`,
	}
}


TabbedView.propTypes =
{
	numForbidden: PropTypes.number.isRequired,
	numLimited: PropTypes.number.isRequired,
	numSemiLimited: PropTypes.number
}


export default TabbedView