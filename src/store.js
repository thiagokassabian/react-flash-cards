import { configureStore } from "@reduxjs/toolkit";
import { flashCardsSlice } from "./reducers/flashCardsSlice";

export const store = configureStore({
	reducer: {
		flashcards: flashCardsSlice.reducer
	}
});