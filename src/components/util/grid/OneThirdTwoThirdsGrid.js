import React from 'react'
import { Typography, Box, Paper } from '@material-ui/core'

import Styled from 'styled-components'
import withWidth from '@material-ui/core/withWidth'

import Parent from '../../Parent'

const LeftBoxHeaderTypography = Styled(Typography)`
	&&
	{
		color: rgba(255, 255, 255, .95);
		margin-bottom: 1rem;
		max-width: 100%;
	}
`

const LeftBoxSectionHeaderTypography = Styled(Typography)`
	&&
	{
		color: rgba(255, 255, 255, .95);
		font-weight: 700;
	}
`


const LeftBoxSectionTypography = Styled(Typography)`
	&&
	{
		color: rgba(255, 255, 255, .95);
		margin-left: .5rem;
		margin-bottom: .2rem;
	}
`


const RightBoxPaper = Styled(Paper)`
	&&
	{
		background: white;
		border-radius: 1.75rem;
		padding-left: .8rem;
		padding-right: .9rem;
		padding-top: 1.2rem;
		padding-bottom: 1.2rem;

		max-width: 100%;

		@media screen and (min-width: 800px)
		{
			padding-left: 1rem;
			padding-right: 1rem;
			padding-top: 1.25rem;
			padding-bottom: 1.25rem;
		}
	}
`


const LeftBoxPaper = Styled(RightBoxPaper)`
	&&
	{
		background: white;
		border-radius: 1.75rem;
		padding-left: .8rem;
		padding-right: .9rem;
		padding-top: 1.2rem;
		padding-bottom: 1.2rem;
		box-shadow: rgba(0, 0, 0, 0.12) 0px .5rem 1.4rem;
		border: 1px solid rgb(221, 221, 221);

		@media screen and (min-width: 800px)
		{
			padding-left: 1rem;
			padding-right: 1rem;
			padding-top: 1.25rem;
		}
	}
`


const RightBoxHeaderContainer = Styled(Box)`
	&&
	{
		margin-bottom: .2rem;
	}
`


const RightBoxHeaderTypography = Styled(Typography)`
	&&
	{
		margin-bottom: .85rem;
	}
`


const RightBoxSubHeaderTypography = Styled(Typography)`
	&&
	{
	}
`


const OneThirdComponent = Styled(Box)`
	&&
	{
		margin-bottom: 2.5rem;

		@media screen and (min-width: 800px)
		{
			min-width: 25rem;
			max-width: 25rem;
		}

		@media screen and (min-width: 1500px)
		{
			min-width: 30rem;
			max-width: 30rem;
		}
	}
`


const MirroredOneThirdComponent = Styled(OneThirdComponent)`
	&&
	{
		@media screen and (min-width: 800px)
		{
			padding-left: 0rem;
		}
	}
`


const TwoThirdComponent = Styled(Box)`
	&&
	{
		@media screen and (min-width: 800px)
		{
			flex-grow: 1;
			padding-left: .8rem;
			width: 1;
		}
	}
`


const MirroredTwoThirdComponent = Styled(Box)`
	&&
	{
		@media screen and (min-width: 800px)
		{
			flex-grow: 1;
			padding-right: .8rem;
			width: 1;
		}
	}
`


function OneThirdTwoThirdsGrid( { oneThirdComponent, twoThirdComponent, mirrored=false } )
{

	return(
		<Parent>
			{(mirrored)? <MirroredTwoThirdComponent>{twoThirdComponent}</MirroredTwoThirdComponent> : <MirroredOneThirdComponent>{oneThirdComponent}</MirroredOneThirdComponent>}
			{(mirrored)? <OneThirdComponent>{oneThirdComponent}</OneThirdComponent> : <TwoThirdComponent>{twoThirdComponent}</TwoThirdComponent>}
		</Parent>
	)
}


export default withWidth()(OneThirdTwoThirdsGrid)

export {LeftBoxHeaderTypography, LeftBoxSectionTypography, LeftBoxSectionHeaderTypography, RightBoxPaper, LeftBoxPaper, RightBoxHeaderTypography, RightBoxSubHeaderTypography, RightBoxHeaderContainer}