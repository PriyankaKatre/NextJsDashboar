import { createSlice } from "@reduxjs/toolkit";

const loadTasksFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    try {
      const tasks = localStorage.getItem("tasks");
      return tasks ? JSON.parse(tasks) : [];
    } catch (e) {
      console.error("Failed to parse tasks from localStorage:", e);
      return [];
    }
  }
  return [];
};

const initialState = {
  tasks: loadTasksFromLocalStorage(),
};

const kanbanSlice = createSlice({
  name: "kanban",
  initialState,
  reducers: {
    setTasks(state, action) {
      state.tasks = action.payload;
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
  },
});

export const { setTasks } = kanbanSlice.actions;
export default kanbanSlice.reducer;
