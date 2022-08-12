import { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { helperShuffleArray } from '../helpers/arrayHelpers';
import { deleteCard, getFlashCards } from '../services/apiService';

import FlashCard from '../components/FlashCard';
import Button from '../components/Button';
import RadioButton from '../components/RadioButton';
import Loading from '../components/Loading';
import Error from '../components/Error';
import FlashCardItem from '../components/FlashCardItem';

const FlashCardsPage = () => {
	const [data, setData] = useState([]);
	const [showAllTitles, setShowAllTitles] = useState(true);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			try {
				// const dataFromServer = await getData();
				const allFlashCards = await getFlashCards();
				setTimeout(() => {
					setData(allFlashCards);
					setLoading(false);
				}, 500);
			} catch (err) {
				console.log(err);
				setError(err.message);
			}
		};
		fetchData();
	}, []);

	//* FETCH DE DADOS LOCAL */
	// async function getData() {
	// 	const response = await fetch('./flashcards_v1.json');
	// 	const jsonData = await response.json();
	// 	return jsonData;
	// }

	const handleClickShuffle = () => {
		const dataToShuffle = [...data];
		const newShuffledData = helperShuffleArray(dataToShuffle);
		setData(newShuffledData);
	};

	const handleRadioButtonShowTitle = () => setShowAllTitles(true);

	const handleRadioButtonShowDescription = () => setShowAllTitles(false);

	const handleDeleteFlashCard = async cardId => {
		const removeCard = await deleteCard(cardId);
		if (removeCard) {
			const newData = [...data].filter(card => card.id !== cardId);
			setData(newData);
		}
	};

	if (error) return <Error>{error}</Error>;

	if (loading)
		return (
			<div className="text-center my-10">
				<Loading loading={loading} />
			</div>
		);

	return (
		<>
			<Tabs>
				<TabList>
					<Tab>List</Tab>
					<Tab>Create</Tab>
					<Tab>Study</Tab>
				</TabList>

				<TabPanel>
					<div className="flex flex-col space-y-2">
						{data.map(card => (
							<div key={card.id} className="border rounded p-3">
								<FlashCardItem key={card.id} onDelete={handleDeleteFlashCard}>
									{card}
								</FlashCardItem>
							</div>
						))}
					</div>
				</TabPanel>
				<TabPanel>
					<h2>Any content 2</h2>
				</TabPanel>
				<TabPanel>
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
						{data.map(({ id, title, description }) => (
							<FlashCard key={id} title={title} description={description} showCardTitle={showAllTitles} />
						))}
					</div>
				</TabPanel>
			</Tabs>
		</>
	);
};

export default FlashCardsPage;
