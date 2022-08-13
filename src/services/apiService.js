import { getAll, remove, add, update } from "./httpService";

const BASE_URL = 'http://localhost:3001/flashcards'

const getAllFlashCards = async () => {
	const allFlashCards = await getAll(BASE_URL)
	return allFlashCards
}

const deleteCard = async id => {
	const deletedCard = await remove(BASE_URL, id)
	return deletedCard
}

const createCard = async flashCard => {
	const createdCard = await add(BASE_URL, flashCard)
	return createdCard
}

const updateCard = async flashCard => {
	const updatedCard = await update(BASE_URL, flashCard)
	return updatedCard
}

export { getAllFlashCards, deleteCard, createCard, updateCard }