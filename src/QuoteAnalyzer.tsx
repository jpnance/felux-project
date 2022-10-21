import partQuotes from './datasample.json';

import { useState } from 'react';

import PricingFieldSelector, { PricingFieldSelectorValue } from './PricingFieldSelector';
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

export interface SelectedQuoteItem {
	partNumber: string,
	company: string,
	price: number,
	weight: number
};

const QuoteAnalyzer = () => {
	const [pricingFieldSelection, setPricingFieldSelection] = useState('FinalPrice' as PricingFieldSelectorValue);

	let handlePricingFieldSelection = (value: PricingFieldSelectorValue) => {
		setPricingFieldSelection(value);
	};

	const [selectedPartQuotes, setSelectedPartQuotes] = useState<SelectedQuoteItem[]>([]);

	let handleQuoteSelection = (partNumber: string, company: string, price: number, weight: number) => {
		let newSelectedPartQuotes = selectedPartQuotes.slice();
		let existingSelectedPartQuote = newSelectedPartQuotes.find((selectedPartQuote) => selectedPartQuote.partNumber === partNumber);

		if (existingSelectedPartQuote) {
			newSelectedPartQuotes = newSelectedPartQuotes.filter((selectedPartQuote) => selectedPartQuote.partNumber !== partNumber);
		}

		if (!existingSelectedPartQuote || existingSelectedPartQuote.company !== company) {
			newSelectedPartQuotes.push({ partNumber: partNumber, company: company, price: price, weight: weight });
		}

		setSelectedPartQuotes(newSelectedPartQuotes);
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
			<QuoteTable
				partQuotes={partQuotes}
				companyColumns={companyColumns}
				pricingFieldSelection={pricingFieldSelection}
				handleQuoteSelection={handleQuoteSelection}
			/>
		</div>
	);
};

export default QuoteAnalyzer;
