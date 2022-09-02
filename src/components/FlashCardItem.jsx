import { PencilIcon, TrashIcon } from "@heroicons/react/solid"
import Button from "./Button"

const FlashCardItem = ({ children: flashCard, onDelete = null, onEdit = null }) => {
	const { id, title, description } = flashCard

	const handleButtonDelete = () => {
		if (onDelete) onDelete(id)
	}

	const handleButtonEdit = () => {
		if (onEdit) onEdit(flashCard)
	}

	return (
		<>
			<ul className="mb-2">
				<li>
					<strong>Title:</strong> {title}
				</li>
				<li>
					<strong>Description:</strong> {description}
				</li>
			</ul>
			<div className="flex justify-end space-x-2">
				<Button onButtonClick={handleButtonEdit}>
					<PencilIcon className="h-3 w-3 text-white" />
				</Button>
				<Button onButtonClick={handleButtonDelete}>
					<TrashIcon className="h-3 w-3 text-white" />
				</Button>
			</div>
		</>
	)
}

export default FlashCardItem
