import { PencilIcon, TrashIcon } from '@heroicons/react/solid';
import Button from './Button';

const FlashCardItem = ({ children: flashCard, onDelete = null }) => {
	const { id, title, description } = flashCard;

	const handleButtonDelete = () => {
		if (onDelete) onDelete(id);
	};

	return (
		<>
			<ul>
				<li>
					<strong>Title:</strong> {title}
				</li>
				<li>
					<strong>Description:</strong> {description}
				</li>
			</ul>
			<div className="flex justify-end space-x-2">
				<Button>
					<PencilIcon className="h-5 w-5 text-white" />
				</Button>
				<Button onButtonClick={handleButtonDelete}>
					<TrashIcon className="h-5 w-5 text-white" />
				</Button>
			</div>
		</>
	);
};

export default FlashCardItem;
