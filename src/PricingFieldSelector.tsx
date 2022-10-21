import { FC } from 'react';

export type PricingFieldSelectorValue = 'FinalPrice' | 'PackagingFee' | 'FreightFee';

export interface PricingFieldSelectorProps {
	handlePricingFieldSelection: (value: PricingFieldSelectorValue) => void;
};

const PricingFieldSelector: FC<PricingFieldSelectorProps> = ({ handlePricingFieldSelection }) => {
	return (
		<select onChange={(event) => handlePricingFieldSelection(event.currentTarget.value as PricingFieldSelectorValue)}>
			<option value="FinalPrice">Final Price</option>
			<option value="PackagingFee">Packaging Fee</option>
			<option value="FreightFee">Freight Fee</option>
		</select>
	);
};

export default PricingFieldSelector;
