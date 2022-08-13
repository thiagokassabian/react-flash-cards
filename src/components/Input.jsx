import { getNewId } from '../services/idService';

const Input = ({
	id = getNewId(),
	type = 'text',
	label = 'Label',
	value = 'Text',
	name = 'name',
	onChange = null,
	onBlur = null,
}) => {
	const handleChange = event => {
		if (onChange) onChange(event);
	};

	const handleBlur = event => {
		if (onBlur) onBlur(event);
	};

	return (
		<div className="flex flex-col space-y-1">
			<label htmlFor={id}>{label}</label>
			<input
				id={id}
				className="border rounded p-1"
				type={type}
				value={value}
				name={name}
				onChange={handleChange}
				onBlur={handleBlur}
			/>
		</div>
	);
};

export default Input;
