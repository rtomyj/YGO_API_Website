import {Table, TableHead, TableRow, TableBody, TableCell, TableContainer, Box} from '@material-ui/core'
import '../css/card-information-styles.css'


function createHeaderRow(headerNames: string[]) {
	return headerNames.map( (header: string) => {
		return <TableCell className={'table-cell'} >{header}</TableCell>
	})
}


function createRows(rowValues: string[][], rowOnClick: { (): void }[] = [] ): JSX.Element[] {
	return rowValues.map( (row: string[], index: number) => {
		const columns: JSX.Element[] = row.map( (value: string) => {
			return <TableCell className={'table-cell'} >{value}</TableCell>
		})

		return (
			(rowOnClick.length === 0)?
			<TableRow>
				{columns}
			</TableRow>
			:
			<TableRow className={'table-row'} onClick={rowOnClick[index]} >
				{columns}
			</TableRow>
		)
	})
}


export default function createTable(headerNames: string[], rowValues: string[][], rowOnClick: { (): void }[] = []): JSX.Element {
	return <TableContainer className={'table-container'} component={Box} >
			<Table size='small' >
				<TableHead className={'table-head'} >
					{createHeaderRow(headerNames)}
				</TableHead>
				<TableBody>
					{createRows(rowValues, rowOnClick)}
				</TableBody>
			</Table>
		</TableContainer>
}

export {createHeaderRow, createRows}