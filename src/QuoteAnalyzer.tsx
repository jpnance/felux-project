import partQuotes from './datasample.json';

import { useState } from 'react';

import PricingFieldSelector from './PricingFieldSelector';
import QuoteTable from './QuoteTable';

export interface QuoteItem {
	Company: string;
	FinalPrice: number;
	PackagingFee: number;
	FreightFee: number;
};

export interface PartQuoteItem {
	Location: string;
	PartNo: string;
	Product: string;
	Weight: number;
	Quotes: QuoteItem[];
};

const QuoteAnalyzer = () => {
	const [pricingFieldSelection, setPricingFieldSelection] = useState('FinalPrice'); 

	let handlePricingFieldSelection = (value: string) => {
		setPricingFieldSelection(value);
	};

	let companyColumns: string[] = [];

	partQuotes.forEach((quoteItem) => {
		quoteItem.Quotes.forEach((quote) => {
			if (!companyColumns.includes(quote.Company)) {
				companyColumns.push(quote.Company);
			}
		});
	});

	return (
		<div>
			<PricingFieldSelector handlePricingFieldSelection={handlePricingFieldSelection} />
			<QuoteTable partQuotes={partQuotes} companyColumns={companyColumns} pricingFieldSelection={pricingFieldSelection} />
		</div>
	);
};

export default QuoteAnalyzer;
