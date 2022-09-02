import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	value: [],
	selected: null,
	loading: false,
	tab: 0
};

export const flashCardsSlice = createSlice({
	name: "flashCards",
	initialState,
	reducers: {
		flashCards: (state, action) => {
			state.value = action.payload;
		},
		selected: (state, action) => {
			state.selected = action.payload;
		},
		loading: (state, action) => {
			state.loading = action.payload;
		},
		reset: (state) => {
			state.selected = null;
		},
		tabSelect: (state, action) => {
			state.tab = action.payload;
		}
	}
});

export const { flashCards, loading, selected, reset, tabSelect } = flashCardsSlice.actions;