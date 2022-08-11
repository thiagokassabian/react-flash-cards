import { useState, useEffect } from 'react';
import { getNewId } from '../services/idService';
import FlashCard from '../components/FlashCard';
import { helperShuffleArray } from '../helpers/arrayHelpers';
import Button from '../components/Button';
import RadioButton from '../components/RadioButton';

function FlashCardsPage() {
	const [data, setData] = useState([]);
	const [showAllTitles, setShowAllTitles] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			const dataFromServer = await getData();
			setData(dataFromServer);
		};
		fetchData();
	}, []);

	async function getData() {
		const response = await fetch('./flashcards.json');
		const jsonData = await response.json();
		return jsonData;
	}

	function handleClickShuffle() {
		const dataToShuffle = [...data];
		const newShuffledData = helperShuffleArray(dataToShuffle);
		setData(newShuffledData);
	}

	function handleRadioButtonShowTitle() {
		setShowAllTitles(true);
	}

	function handleRadioButtonShowDescription() {
		setShowAllTitles(false);
	}

	return (
		<>
			<div className="mb-3 text-right">
				<Button onButtonClick={handleClickShuffle}>Shuffle cards</Button>
			</div>
			<div className="flex justify-center space-x-4 mb-4">
				<RadioButton
					name="radioButtonShowInfo"
					onButtonClick={handleRadioButtonShowTitle}
					buttonChecked={showAllTitles}>
					Title
				</RadioButton>
				<RadioButton
					name="radioButtonShowInfo"
					onButtonClick={handleRadioButtonShowDescription}
					buttonChecked={!showAllTitles}>
					Description
				</RadioButton>
			</div>
			<div className="grid grid-cols-2 gap-4">
				{data.map(({ title, description }) => (
					<FlashCard key={getNewId()} title={title} description={description} showCardTitle={showAllTitles} />
				))}
			</div>
		</>
	);
}

export default FlashCardsPage;
