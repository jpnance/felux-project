import { FC } from 'react';
import { PartQuoteItem, QuoteItem } from './QuoteAnalyzer';
import { PricingFieldSelectorValue } from './PricingFieldSelector';

import styles from './QuoteTable.module.css';

export interface QuoteTableProps {
	partQuotes: PartQuoteItem[];
	companyColumns: string[];
	pricingFieldSelection: PricingFieldSelectorValue;
};

type BestWorstQuote = {
	company: string | undefined;
	price: number | undefined;
};

const QuoteTable: FC<QuoteTableProps> = ({ partQuotes, companyColumns, pricingFieldSelection }) => {
	let bestPartQuotes = new Map<string, BestWorstQuote>();
	let worstPartQuotes = new Map<string, BestWorstQuote>();

	partQuotes.forEach((partQuote) => {
		let bestPartQuote: BestWorstQuote = { company: undefined, price: undefined };
		let worstPartQuote: BestWorstQuote = { company: undefined, price: undefined };

		partQuote.Quotes.forEach((partQuoteQuote) => {
			if (!bestPartQuote.price || partQuoteQuote[pricingFieldSelection] < bestPartQuote.price) {
				bestPartQuote.company = partQuoteQuote.Company;
				bestPartQuote.price = partQuoteQuote[pricingFieldSelection];
			}

			if (!worstPartQuote.price || partQuoteQuote[pricingFieldSelection] > worstPartQuote.price) {
				worstPartQuote.company = partQuoteQuote.Company;
				worstPartQuote.price = partQuoteQuote[pricingFieldSelection];
			}
		});

		bestPartQuotes.set(partQuote.PartNo, bestPartQuote);
		worstPartQuotes.set(partQuote.PartNo, worstPartQuote);
	});

	return (
		<table className={styles.quoteTable}>
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

							let isBestQuote = false;
							let isWorstQuote = false;

							let quoteText = '';

							if (quote) {
								quoteText = `$${quote[pricingFieldSelection].toFixed(2)}`;

								let bestPartQuote = bestPartQuotes.get(partQuote.PartNo);
								let worstPartQuote = worstPartQuotes.get(partQuote.PartNo);

								if (bestPartQuote?.company === companyColumn) {
									isBestQuote = true;
								}

								if (worstPartQuote?.company === companyColumn) {
									isWorstQuote = true;
								}
							}

							return <td key={`quote-table-company-column-${i}`} className={`${isBestQuote ? styles.best : null} ${isWorstQuote ? styles.worst : null}`}>{quoteText}</td>
						})}
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default QuoteTable;
