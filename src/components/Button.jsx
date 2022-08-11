function Button({ children: description = 'Button', onButtonClick = null }) {
	function handleButtonClick() {
		if (onButtonClick) onButtonClick();
	}

	return (
		<button className="btn btn-primary" onClick={handleButtonClick}>
			{description}
		</button>
	);
}

export default Button;
