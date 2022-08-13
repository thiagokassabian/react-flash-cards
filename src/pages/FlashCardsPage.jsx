import { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { helperShuffleArray } from '../helpers/arrayHelpers';
import {
	deleteFlashCard,
	getFlashCards,
	createFlashCard,
	getAllFlashCards,
	updateFlashCard,
} from '../services/apiService';
import { toast } from 'react-toastify';

import FlashCard from '../components/FlashCard';
import Button from '../components/Button';
import RadioButton from '../components/RadioButton';
import Loading from '../components/Loading';
import Error from '../components/Error';
import FlashCardItem from '../components/FlashCardItem';
import FormFlashCard from '../components/FormFlashCard';
import { getNewId } from '../services/idService';

const FlashCardsPage = () => {
	const [data, setData] = useState([]);
	const [showAllTitles, setShowAllTitles] = useState(true);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [selectedFlashCard, setSelectedFlashCard] = useState(null);
	const [tabIndex, setTabIndex] = useState(0);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const allFlashCards = await getAllFlashCards();
				setData(allFlashCards);
				setLoading(false);
			} catch (err) {
				console.log(err);
				setError(err.message);
			}
		};
		fetchData();
	}, []);

	const handleClickShuffle = () => {
		const newShuffledData = helperShuffleArray([...data]);
		setData(newShuffledData);
	};

	const handleRadioButtonShowTitle = () => setShowAllTitles(true);

	const handleRadioButtonShowDescription = () => setShowAllTitles(false);

	const handleDeleteFlashCard = async cardId => {
		const removeCard = await toast.promise(deleteFlashCard(cardId), {
			pending: 'Deleting  flash card',
			success: 'Successfully deleted flash card',
			error: 'There was a problem. Could not delete a flash card',
		});
		if (!removeCard) return;
		setData(currentData => [...currentData].filter(card => card.id !== cardId));
	};

	const handleSubmitForm = async flashCard => {
		if (flashCard.id) {
			console.log('updating flash card', flashCard);
			const updatedFlashCard = await toast.promise(updateFlashCard(flashCard), {
				pending: 'Editing  a flash card',
				success: 'Successfully edited flash card',
				error: 'There was a problem. Could not edit a flash card',
			});
			if (!updatedFlashCard) return;
			setData(
				data.map(card =>
					card.id === flashCard.id
						? { ...card, title: flashCard.title, description: flashCard.description }
						: card
				)
			);
			setTabIndex(0);
			console.log('flash card updated', updatedFlashCard);
		} else {
			console.log('creating flash card');
			flashCard = { id: getNewId(), ...flashCard };
			const createdFlashCard = await toast.promise(createFlashCard(flashCard), {
				pending: 'Adding a new flash card',
				success: 'Successfully registered flash card',
				error: 'There was a problem. Could not add a new flash card',
			});
			if (!createdFlashCard) return;
			setData(currentData => [...currentData, createdFlashCard]);
			setTabIndex(0);
			console.log('flash card created', createdFlashCard);
		}
	};

	const handleEditFlashCard = flashCard => {
		setSelectedFlashCard(flashCard);
		setTabIndex(1);
	};

	const handleTabSelect = index => {
		setSelectedFlashCard(null);
		setTabIndex(index);
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
			<Tabs onSelect={handleTabSelect} selectedIndex={tabIndex}>
				<TabList className="border-b mb-5">
					<Tab>List</Tab>
					<Tab>Create</Tab>
					<Tab>Study</Tab>
				</TabList>

				<TabPanel>
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
						{data.map(card => (
							<div key={card.id} className="border rounded p-3 flex flex-col justify-between">
								<FlashCardItem
									key={card.id}
									onDelete={handleDeleteFlashCard}
									onEdit={handleEditFlashCard}>
									{card}
								</FlashCardItem>
							</div>
						))}
					</div>
				</TabPanel>
				<TabPanel>
					<FormFlashCard onSubmitForm={handleSubmitForm}>{selectedFlashCard}</FormFlashCard>
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

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
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
