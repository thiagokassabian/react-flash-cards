const Button = ({ children: description = 'Button', type = 'button', disabled = false, onButtonClick = null }) => {
	const handleButtonClick = () => {
		if (onButtonClick) onButtonClick();
	};

	return (
		<button className="btn btn-primary" type={type} disabled={disabled} onClick={handleButtonClick}>
			{description}
		</button>
	);
};

export default Button;
