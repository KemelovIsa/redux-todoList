import { createSlice } from "@reduxjs/toolkit";

interface counterSliceType {
	value: number;
}

const initialState: counterSliceType = {
	value: 0,
};

const counterSlice = createSlice({
	name: "counter",
	initialState,
	reducers: {
		handleAddByAmount: (state, action) => {
			state.value = action.payload;
		},
	},
});

export const { handleAddByAmount } = counterSlice.actions;
export const counterReducer = counterSlice.reducer;
