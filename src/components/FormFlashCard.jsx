import { useEffect } from "react"
import useForm from "../hooks/useForm"
import Button from "./Button"
import Input from "./Input"
import TextArea from "./TextArea"
import { useSelector, useDispatch } from "react-redux"
import { flashCards, tabSelect, reset } from "../reducers/flashCardsSlice"
import { toast } from "react-toastify"
import { createFlashCard, updateFlashCard } from "../services/apiService"
import { getNewId } from "../services/idService"

const FormFlashCard = ({ onSubmitForm = null }) => {
	const [{ values }, handleChange, handleBlur, handleSubmit, handleReset, handleSelectedItem, handleInitialValues, isFormValid] = useForm()

	const dispatch = useDispatch()
	const { value: data, selected } = useSelector(state => state.flashcards)

	useEffect(() => {
		handleInitialValues({
			title: "",
			description: ""
		})

		if (selected) handleSelectedItem(selected)
	}, [])

	const onHandleReset = () => {
		dispatch(reset())
		handleReset()
	}

	const submitFlashCard = async () => {
		if (!isFormValid()) return
		if (values.id) {
			console.log("updating flash card", values)
			const updatedFlashCard = await toast.promise(updateFlashCard(values), {
				pending: "Editing  a flash card",
				success: "Successfully edited flash card",
				error: "There was a problem. Could not edit a flash card"
			})
			if (!updatedFlashCard) return
			dispatch(flashCards(data.map(card => (card.id === values.id ? { ...card, title: values.title, description: values.description } : card))))
			dispatch(tabSelect(0))
			dispatch(reset())
			console.log("flash card updated", updatedFlashCard)
		} else {
			console.log("creating flash card")
			const newFlashCard = { id: getNewId(), ...values }
			const createdFlashCard = await toast.promise(createFlashCard(newFlashCard), {
				pending: "Adding a new flash card",
				success: "Successfully registered flash card",
				error: "There was a problem. Could not add a new flash card"
			})
			if (!createdFlashCard) return
			dispatch(flashCards([...data, createdFlashCard]))
			dispatch(tabSelect(0))
			console.log("flash card created", createdFlashCard)
		}
	}

	return (
		<form className="flex flex-col space-y-4" onSubmit={handleSubmit(submitFlashCard)} onReset={onHandleReset}>
			<h2>Form</h2>
			<div>
				<Input label="Title" name="title" value={values?.title || ""} onChange={handleChange} onBlur={handleBlur} />
			</div>
			<div>
				<TextArea label="Description" name="description" value={values?.description || ""} onChange={handleChange} onBlur={handleBlur} />
			</div>
			<div className="flex justify-end space-x-2">
				<Button type="reset">Reset</Button>
				<Button type="submit" disabled={!isFormValid()}>
					Submit
				</Button>
			</div>
		</form>
	)
}

export default FormFlashCard
