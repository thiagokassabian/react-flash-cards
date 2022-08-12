const Error = ({ children: message }) => {
	return (
		<span className="text-red-500">
			<strong>{message}</strong>
		</span>
	);
};

export default Error;
