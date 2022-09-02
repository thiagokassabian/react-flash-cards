import FlashCardItem from "./FlashCardItem"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { flashCards, selected, tabSelect } from "../reducers/flashCardsSlice"
import { deleteFlashCard } from "../services/apiService"

const ListFlashCards = () => {
	const dispatch = useDispatch()
	const { value: data } = useSelector(state => state.flashcards)

	const handleDeleteFlashCard = async cardId => {
		console.log(cardId)
		const removeCard = await toast.promise(deleteFlashCard(cardId), {
			pending: "Deleting  flash card",
			success: "Successfully deleted flash card",
			error: "There was a problem. Could not delete a flash card"
		})
		if (!removeCard) return
		dispatch(flashCards(data.filter(card => card.id !== cardId)))
	}

	const handleEditFlashCard = flashCard => {
		dispatch(selected(flashCard))
		dispatch(tabSelect(1))
	}

	return (
		<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
			{data.map(card => (
				<div key={card.id} className="border rounded p-3 flex flex-col justify-between">
					<FlashCardItem key={card.id} onDelete={handleDeleteFlashCard} onEdit={handleEditFlashCard}>
						{card}
					</FlashCardItem>
				</div>
			))}
		</div>
	)
}

export default ListFlashCards
