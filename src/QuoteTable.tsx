import { FC } from 'react';
import { PartQuoteItem } from './QuoteAnalyzer';

export interface QuoteTableProps {
	partQuotes: PartQuoteItem[];
	companyColumns: string[];
};

const QuoteTable: FC<QuoteTableProps> = ({ partQuotes, companyColumns }) => {
	return (
		<table>
			<thead>
				<tr>
					<th>Location</th>
					<th>Part No.</th>
					<th>Steel Product</th>
					<th>Weight</th>
					{companyColumns.map((companyColumn) => <th>{companyColumn}</th>)}
				</tr>
			</thead>
			<tbody>
				{partQuotes.map((partQuote, i) => (
					<tr key={`partQuote-table-${partQuote.PartNo}`}>
						<td>{partQuote.Location}</td>
						<td>{partQuote.PartNo}</td>
						<td>{partQuote.Product}</td>
						<td>{partQuote.Weight}</td>
						{companyColumns.map((companyColumn) => <td>{partQuote.Quotes.find((partQuote) => partQuote.Company === companyColumn)?.FinalPrice || ''}</td>)}
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default QuoteTable;
