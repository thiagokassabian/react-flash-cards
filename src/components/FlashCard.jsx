import { useEffect, useState } from 'react';
import './FlashCard.css';

const FlashCard = ({
	title = 'Card Title',
	description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
	showCardTitle = true,
}) => {
	const [showTitle, setShowTitle] = useState(true);

	useEffect(() => {
		setShowTitle(showCardTitle);
	}, [showCardTitle]);

	const handleCardClick = () => setShowTitle(currentShowTitle => !currentShowTitle);

	return (
		<>
			<div
				className="card cursor-pointer border rounded p-4 shadow-md flex items-center justify-center"
				onClick={handleCardClick}>
				{showTitle ? title : description}
			</div>
		</>
	);
};

export default FlashCard;
