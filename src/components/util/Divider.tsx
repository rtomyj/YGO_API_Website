import {Divider} from '@material-ui/core'
import Styled from 'styled-components'


const BaseDivider = Styled(Divider)`
	&&
	{
		margin: auto;
		margin-top: 1.25rem;
		margin-bottom: 1.75rem;
		height: 3px;
		border-radius: 1000rem;
		max-width: 97%;
	}
`


const LightTranslucentDivider = Styled(BaseDivider)`
	&&
	{
		background-color: rgba(255, 255, 255, .25);
	}
`


const DarkTranslucentDivider = Styled(BaseDivider)`
	&&
	{
		background-color: #ECBD0B;
		background-image: linear-gradient(315deg, #ECBD0B 0%, #DC5010 44%);
	}
`


export {LightTranslucentDivider, DarkTranslucentDivider}