import { createSlice } from "@reduxjs/toolkit";

const Taskreducer = createSlice({
  name: "Todos",
  initialState: {
    items: [],
    filter: "All",
  },
  reducers: {
    addTodo: (state, action) => {
      state.items.push({
        name: action.payload.name,
        taskName: action.payload.taskName,
        date: action.payload.date,
        status: action.payload.status || "Not Completed"
      });
    },
    deleteTodo: (state, action) => {
      const deleteIndex = action.payload;
      state.items = state.items.filter((_, index) => index !== deleteIndex);
    },
    updateTodoStatus: (state, action) => {
      const { index, status } = action.payload;
      state.items[index].status = status;
    },
    statusFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { addTodo, deleteTodo, updateTodoStatus, statusFilter } =
  Taskreducer.actions;
export default Taskreducer.reducer;
