import React from 'react'
import { Box } from '@material-ui/core'

import Styled from 'styled-components'

const OuterParent = Styled(Box)`
	&&
	{
		@media screen and (min-width: 800px)
		{
			display: flex;
		}
`


export default function Parent( { children } )
{

	return(
		<OuterParent>
			{children}
		</OuterParent>
	)
}