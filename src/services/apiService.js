import { get, remove } from "./httpService";

const BASE_URL = 'http://localhost:3001/flashcards'

const getFlashCards = async () => {
	const allFlashCards = await get(BASE_URL)
	return allFlashCards
}

const deleteCard = async id => {
	const deleteCard = await remove(BASE_URL, id)
	return deleteCard
}

export { getFlashCards, deleteCard }