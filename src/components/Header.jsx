function Header({ title }) {
	return (
		<div className="bg-gray-200">
			<div className="container mx-auto py-5">
				<h1>{title}</h1>
			</div>
		</div>
	);
}

export default Header;
