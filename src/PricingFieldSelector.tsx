import { FC } from 'react';

export interface PricingFieldSelectorProps {
	handlePricingFieldSelection: (value: string) => void;
};

const PricingFieldSelector: FC<PricingFieldSelectorProps> = ({ handlePricingFieldSelection }) => {
	return (
		<select onChange={(event) => handlePricingFieldSelection(event.currentTarget.value)}>
			<option value="FinalPrice">Final Price</option>
			<option value="PackagingFee">Packaging Fee</option>
			<option value="FreightFee">Freight Fee</option>
		</select>
	);
};

export default PricingFieldSelector;
