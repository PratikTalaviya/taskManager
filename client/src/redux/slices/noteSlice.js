import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userNotes: [],
  reloadNote: false,
};

const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    setNotes: (state, action) => {
      state.userNotes = action.payload;
    },
    setNote: (state, action) => {
      state.userNotes.push(action.payload);
    },
    setReloadNote: (state) => {
      state.reloadNote = !state.reloadNote;
    },
  },
});

export const { setNotes, setNote, setReloadNote } = noteSlice.actions;

export default noteSlice.reducer;
