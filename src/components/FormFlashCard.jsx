import { useEffect } from 'react';
import useForm from '../hooks/useForm';
import Button from './Button';
import Input from './Input';
import TextArea from './TextArea';

const FormFlashCard = ({ children: selectedFlashCard, onSubmitForm = null }) => {
	const [
		{ values },
		handleChange,
		handleBlur,
		handleSubmit,
		handleReset,
		handleSelectedItem,
		handleInitialValues,
		isFormValid,
	] = useForm();

	useEffect(() => {
		handleInitialValues({
			title: '',
			description: '',
		});
		if (selectedFlashCard) {
			handleSelectedItem(selectedFlashCard);
		}
	}, []);

	const submitFlashCard = () => {
		if (onSubmitForm && isFormValid()) onSubmitForm(values);
		else console.log('empty fields');
	};

	return (
		<form className="flex flex-col space-y-4" onSubmit={handleSubmit(submitFlashCard)} onReset={handleReset}>
			<h2>Form</h2>
			<div>
				<Input
					label="Title"
					name="title"
					value={values?.title || ''}
					onChange={handleChange}
					onBlur={handleBlur}
				/>
			</div>
			<div>
				<TextArea
					label="Description"
					name="description"
					value={values?.description || ''}
					onChange={handleChange}
					onBlur={handleBlur}
				/>
			</div>
			<div className="flex justify-end space-x-2">
				<Button type="reset">Reset</Button>
				<Button type="submit" disabled={!isFormValid()}>
					Submit
				</Button>
			</div>
		</form>
	);
};

export default FormFlashCard;
