import { useState, useEffect } from "react"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import "react-tabs/style/react-tabs.css"

import { getAllFlashCards } from "../services/apiService"

import Error from "../components/Error"
import FormFlashCard from "../components/FormFlashCard"

import { useSelector, useDispatch } from "react-redux"
import { flashCards, tabSelect } from "../reducers/flashCardsSlice"
import StudyFlashCards from "../components/StudyFlashCards"
import ListFlashCards from "../components/ListFlashCards"

const FlashCardsPage = () => {
	const dispatch = useDispatch()
	const { tab } = useSelector(state => state.flashcards)

	const [error, setError] = useState("")

	useEffect(() => {
		const fetchData = async () => {
			try {
				const flashCardsData = await getAllFlashCards()
				dispatch(flashCards(flashCardsData))
			} catch (err) {
				console.log(err)
				setError(err.message)
			}
		}
		fetchData()
	}, [])

	const handleTabSelect = index => {
		dispatch(tabSelect(index))
	}

	if (error) return <Error>{error}</Error>

	// if (loading)
	// 	return (
	// 		<div className="text-center my-10">
	// 			<Loading loading={loading} />
	// 		</div>
	// 	)

	return (
		<>
			<Tabs onSelect={handleTabSelect} selectedIndex={tab}>
				<TabList className="border-b mb-5">
					<Tab>List</Tab>
					<Tab>Create</Tab>
					<Tab>Study</Tab>
				</TabList>

				<TabPanel>
					<ListFlashCards />
				</TabPanel>
				<TabPanel>
					<FormFlashCard />
				</TabPanel>
				<TabPanel>
					<StudyFlashCards />
				</TabPanel>
			</Tabs>
		</>
	)
}

export default FlashCardsPage
