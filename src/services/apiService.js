import { getAll, remove, add, update, get } from "./httpService";

// const BASE_URL = 'http://localhost:3001/flashcards'
const FLASHCARDS_URL = '/flashcards'

const getAllFlashCards = async () => {
	const allFlashCards = await getAll(FLASHCARDS_URL)
	return allFlashCards
}

const getFlashCard = async id => {
	const card = await get(`${FLASHCARDS_URL}/${id}`)
	return card
}

const deleteFlashCard = async id => {
	const deletedCard = await remove(`${FLASHCARDS_URL}/${id}`)
	return deletedCard
}

const createFlashCard = async flashCard => {
	const createdCard = await add(FLASHCARDS_URL, flashCard)
	return createdCard
}

const updateFlashCard = async flashCard => {
	const updatedCard = await update(`${FLASHCARDS_URL}/${flashCard.id}`, flashCard)
	return updatedCard
}

export { getAllFlashCards, deleteFlashCard, createFlashCard, updateFlashCard, getFlashCard }