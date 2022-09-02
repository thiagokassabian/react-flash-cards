import "./App.css"
import Header from "./components/Header"
import FlashCardsPage from "./pages/FlashCardsPage"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Provider } from "react-redux"
import { store } from "./store"

function App() {
	return (
		<>
			<Provider store={store}>
				<Header title="React-flashcards" />
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
			</Provider>
		</>
	)
}

export default App
