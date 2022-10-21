import { FC } from 'react';
import { SelectedQuoteItem } from './QuoteAnalyzer';

import styles from './Kpi.module.css';

export interface KpisProps {
	selectedPartQuotes: SelectedQuoteItem[];
}

const Kpis: FC<KpisProps> = ({ selectedPartQuotes }) => {
	let kpis = [];

	let totalWeight = selectedPartQuotes.map((selectedPartQuote) => selectedPartQuote.weight).reduce((previous, current) => previous + current, 0);
	let totalInvoice = selectedPartQuotes.map((selectedPartQuote) => selectedPartQuote.price * selectedPartQuote.weight / 100).reduce((previous, current) => previous + current, 0);
	let averageDollarPerCwt = (totalInvoice / totalWeight * 100) || 0;

	kpis.push({ title: 'Total Weight', value: totalWeight.toLocaleString('en-US') });
	kpis.push({ title: 'Invoice', value: totalInvoice.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) });
	kpis.push({ title: 'Avg $/CWT', value: averageDollarPerCwt.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) });

	return (
		<div>
			{kpis.map((kpi) => (
				<div className={styles.kpi}>
					<h3>{kpi.title}</h3>
					<h1>{kpi.value}</h1>
				</div>
			))}
		</div>
	);
};

export default Kpis;
