import { FC } from 'react';
import { PartQuoteItem, QuoteItem } from './QuoteAnalyzer';

export interface QuoteTableProps {
	partQuotes: PartQuoteItem[];
	companyColumns: string[];
	pricingFieldSelection: string;
};

const QuoteTable: FC<QuoteTableProps> = ({ partQuotes, companyColumns, pricingFieldSelection }) => {
	return (
		<table>
			<thead>
				<tr>
					<th>Location</th>
					<th>Part No.</th>
					<th>Steel Product</th>
					<th>Weight</th>
					{companyColumns.map((companyColumn, i) => <th key={`quote-table-company-column-header-${i}`}>{companyColumn}</th>)}
				</tr>
			</thead>
			<tbody>
				{partQuotes.map((partQuote, i) => (
					<tr key={`partQuote-table-${partQuote.PartNo}`}>
						<td>{partQuote.Location}</td>
						<td>{partQuote.PartNo}</td>
						<td>{partQuote.Product}</td>
						<td>{partQuote.Weight}</td>
						{companyColumns.map((companyColumn, i) => {
							let quote = partQuote.Quotes.find((partQuoteQuote) => partQuoteQuote.Company === companyColumn);

							let quoteText = '';

							if (quote) {
								quoteText = `$${(quote[pricingFieldSelection as keyof QuoteItem] as number).toFixed(2)}`;
							}

							return <td key={`quote-table-company-column-${i}`}>{quoteText}</td>
						})}
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default QuoteTable;
