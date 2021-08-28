import {FunctionComponent, ReactNode} from 'react'
import { Typography } from '@material-ui/core'
import Styled from 'styled-components'
import { PropTypes } from '@material-ui/core'
import { Variant } from '@material-ui/core/styles/createTypography'

type args = {
	className: string,
	children: ReactNode,
	variant: Variant | 'inherit',
	align?: PropTypes.Alignment
}

const LightTypographyStyle = Styled(Typography)`
	&&
	{
		color: rgba(255, 255, 255, .97);
	}
`

const LightTypography:FunctionComponent<args> = ({ className, children, variant, align }) =>
{
	return(
		<LightTypographyStyle align={align} variant={variant} className={className} >
			{children}
		</LightTypographyStyle>
	)
}


export { LightTypography }