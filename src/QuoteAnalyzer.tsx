import partQuotes from './datasample.json';
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
	let companyColumns: string[] = [];

	partQuotes.forEach((quoteItem) => {
		quoteItem.Quotes.forEach((quote) => {
			if (!companyColumns.includes(quote.Company)) {
				companyColumns.push(quote.Company);
			}
		});
	});

	return (
		<QuoteTable partQuotes={partQuotes} companyColumns={companyColumns} />
	);
};

export default QuoteAnalyzer;
