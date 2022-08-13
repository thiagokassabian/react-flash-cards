import { getNewId } from '../services/idService';

const TextArea = ({
	id = getNewId(),
	type = 'text',
	label = 'Label',
	value = 'Text',
	name = 'name',
	rows = 4,
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
			<textarea
				id={id}
				rows={rows}
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

export default TextArea;
