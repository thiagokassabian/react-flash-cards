import Button from "./Button"
import RadioButton from "./RadioButton"
import FlashCard from "./FlashCard"
import { useDispatch, useSelector } from "react-redux"
import { flashCards } from "../reducers/flashCardsSlice"
import { useState } from "react"
import { helperShuffleArray } from "../helpers/arrayHelpers"

const StudyFlashCards = () => {
	const dispatch = useDispatch()
	const { value: data } = useSelector(state => state.flashcards)

	const [showAllTitles, setShowAllTitles] = useState(true)

	const handleClickShuffle = () => {
		const newShuffledData = helperShuffleArray(data)
		dispatch(flashCards(newShuffledData))
	}

	const handleRadioButtonShowTitle = () => setShowAllTitles(true)

	const handleRadioButtonShowDescription = () => setShowAllTitles(false)

	return (
		<>
			<div className="mb-3 text-right">
				<Button onButtonClick={handleClickShuffle}>Shuffle cards</Button>
			</div>
			<div className="flex justify-center space-x-4 mb-4">
				<RadioButton name="radioButtonShowInfo" onButtonClick={handleRadioButtonShowTitle} buttonChecked={showAllTitles}>
					Title
				</RadioButton>
				<RadioButton name="radioButtonShowInfo" onButtonClick={handleRadioButtonShowDescription} buttonChecked={!showAllTitles}>
					Description
				</RadioButton>
			</div>

			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
				{data.map(({ id, title, description }) => (
					<FlashCard key={id} title={title} description={description} showCardTitle={showAllTitles} />
				))}
			</div>
		</>
	)
}

export default StudyFlashCards
