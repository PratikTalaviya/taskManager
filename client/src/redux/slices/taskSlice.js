import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userTasks: [],
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
      console.log(state.userTasks[taskIndex]);
    },
  },
});

export const { setTasks, setTask, setSubTask } = taskSlice.actions;

export default taskSlice.reducer;
