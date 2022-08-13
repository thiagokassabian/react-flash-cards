import { useState } from 'react';

const useForm = callback => {
	const [initialValues, setInitialValues] = useState({});
	const [values, setValues] = useState({});
	const [loading, setLoading] = useState(false);

	const handleSelectedItem = selectedValues => {
		setValues(selectedValues);
	};

	const handleChange = event => {
		const auxValues = { ...values };
		auxValues[event.target.name] = event.target.value;
		setValues(auxValues);
	};

	const handleBlur = event => {
		const { name, value } = event.target;
		setValues({ ...values, [name]: value.trim() });
	};

	const handleSubmit = callback => event => {
		event.preventDefault();
		setLoading(true);
		callback();
		setLoading(false);
	};

	const handleInitialValues = initValues => {
		setInitialValues(initValues);
		setValues(initValues);
	};

	const handleReset = () => setValues(initialValues);

	const isFormValid = () => Object.keys(values).every(k => !!values[k].trim());

	return [
		{ values, loading },
		handleChange,
		handleBlur,
		handleSubmit,
		handleReset,
		handleSelectedItem,
		handleInitialValues,
		isFormValid,
	];
};

export default useForm;
