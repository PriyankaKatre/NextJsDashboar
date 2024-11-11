import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: string;
}

 interface KanbanState {
  tasks: Task[];
}

export interface RootState { kanban: KanbanState; }

const loadTasksFromLocalStorage = (): Task[] => {
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

const initialState: KanbanState = {
  tasks: loadTasksFromLocalStorage(),
};

const kanbanSlice = createSlice({
  name: "kanban",
  initialState,
  reducers: {
    setTasks(state: KanbanState, action: PayloadAction<Task[]>) {
      state.tasks = action.payload;
      try {
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      } catch (e) {
        console.error("Failed to save tasks to localStorage:", e);
      }
    },
  },
});
export const { setTasks } = kanbanSlice.actions;
export default kanbanSlice.reducer;