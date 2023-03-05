import { FC, memo, useCallback } from 'react'
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import { AcceptableBanListFormat } from '../../helper/BanListUtil'

type _BanListFormat = {
	format: AcceptableBanListFormat
	setFormat: React.Dispatch<React.SetStateAction<AcceptableBanListFormat>>
}

const BanListFormat: FC<_BanListFormat> = memo(
	({ format, setFormat }) => {
		const handleFormatChanged = useCallback((_: React.ChangeEvent<HTMLInputElement>, value: string) => setFormat(value as AcceptableBanListFormat), [setFormat])

		return (
			<div className='ban-list-format-section group'>
				<FormControl>
					<FormLabel id='ban-list-format-label'>Format</FormLabel>
					<RadioGroup value={format} onChange={handleFormatChanged} row aria-labelledby='ban-list-format-label' name='ban-list-format-buttons-group'>
						<FormControlLabel value='TCG' control={<Radio />} label='TCG' />
						<FormControlLabel value='MD' control={<Radio />} label='Master Duel' />
						<FormControlLabel value='DL' control={<Radio />} label='Duel Links' />
					</RadioGroup>
				</FormControl>
			</div>
		)
	},
	(prevProps, nextProps) => {
		if (prevProps.format !== nextProps.format) return false
		return true
	}
)

export default BanListFormat
