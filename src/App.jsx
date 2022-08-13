import './App.css';
import Header from './components/Header';
import FlashCardsPage from './pages/FlashCardsPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	return (
		<>
			<Header title="React-flash-cards" />
			<div className="container mx-auto py-4 px-4">
				<FlashCardsPage />
			</div>
			<ToastContainer
				position="top-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</>
	);
}

export default App;
