import { getNewId } from '../services/idService';

function RadioButton({
	children: label = 'Radio button',
	id = getNewId(),
	name = 'radioButtonName',
	onButtonClick = null,
	buttonChecked = false,
}) {
	function handleRadioButtonChange(event) {
		if (onButtonClick) onButtonClick();
	}

	return (
		<div className="inline-flex space-x-1">
			<input type="radio" id={id} name={name} onChange={handleRadioButtonChange} checked={buttonChecked} />
			<label htmlFor={id}>{label}</label>
		</div>
	);
}

export default RadioButton;
