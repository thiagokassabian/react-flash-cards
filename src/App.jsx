import './App.css';
import Header from './components/Header';
import FlashCardsPage from './pages/FlashCardsPage';

function App() {
	return (
		<>
			<Header title="React-flash-cards" />
			<div className="container mx-auto py-4">
				<FlashCardsPage />
			</div>
		</>
	);
}

export default App;
