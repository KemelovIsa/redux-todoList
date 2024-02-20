import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Todo {
	id: number;
	name: string;
	age: number;
	img: string;
	completed: boolean;
}

interface TodoState {
	data: Todo[];
}

const initialState: TodoState = {
	data: [],
};

const todoSlice = createSlice({
	name: "todo",
	initialState,
	reducers: {
		addTodo: (
			state,
			action: PayloadAction<{
				name: string;
				age: number;
				img: string;
				completed: boolean;
			}>
		) => {
			const newTodo: Todo = {
				id: Date.now(),
				name: action.payload.name,
				age: action.payload.age,
				img: action.payload.img,
				completed: action.payload.completed,
			};
			state.data.push(newTodo);
		},
		removeTodo: (state, action: PayloadAction<number>) => {
			state.data = state.data.filter((item) => item.id !== action.payload);
		},
		removeAllTodos: (state) => {
			state.data = [];
		},
		editTodo: (
			state,
			action: PayloadAction<{
				id: number;
				name: string;
				age: number;
				img: string;
			}>
		) => {
			const todoToEdit = state.data.find(
				(item) => item.id === action.payload.id
			);
			if (todoToEdit) {
				todoToEdit.name = action.payload.name;
				todoToEdit.age = action.payload.age;
				todoToEdit.img = action.payload.img;
			}
		},
		toggleCompleted: (state, action: PayloadAction<number>) => {
			const todoToToggle = state.data.find(
				(item) => item.id === action.payload
			);
			if (todoToToggle) {
				todoToToggle.completed = !todoToToggle.completed;
			}
		},
	},
});

export const {
	addTodo,
	removeTodo,
	removeAllTodos,
	editTodo,
	toggleCompleted,
} = todoSlice.actions;
export const todoReducer = todoSlice.reducer;
