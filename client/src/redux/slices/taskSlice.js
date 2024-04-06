import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userTasks: [],
  trashedTasks: [],
  reloadTask: false,
  reloadTrash: false,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.userTasks = action.payload;
    },
    setTask: (state, action) => {
      state.userTasks.push(action.payload);
    },
    setSubTask: (state, action) => {
      const { taskId, subTask } = action.payload;
      const taskIndex = state.userTasks.findIndex((task) => task.id === taskId);
      if (taskIndex !== -1) {
        state.userTasks[taskIndex].subTasks.push(subTask);
      }
    },
    setTrashedTasks: (state, action) => {
      state.trashedTasks = action.payload;
    },
    setReloadTask: (state) => {
      state.reloadTask = !state.reloadTask;
    },
    setReloadTrash: (state) => {
      state.reloadTrash = !state.reloadTrash;
    },
  },
});

export const { setTasks, setTask, setSubTask, setTrashedTasks, setReloadTask, setReloadTrash } = taskSlice.actions;

export default taskSlice.reducer;
