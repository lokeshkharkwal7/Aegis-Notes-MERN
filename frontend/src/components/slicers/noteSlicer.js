import { createSlice } from "@reduxjs/toolkit";
const data = {
    data : [] ,
    loading : true
}

const noteSlicer = createSlice({
  name: "NOTESLICER",
  initialState: data,
  reducers: {
    fetchDataReducer(state, action)   {
      state.data =  action.payload
      state.loading = false
    },
    addNoteReducer(state, action)   {
      state.data.concat(action.payload);
    },
    deleteNoteReducer(state, action)   {
      state.data.filter((notes)=>{
        return notes._id !== action.payload;
      });
    },
    // for navbar which is inside the note 
    updateDataByCategoryReducer(state, action)   {
      state.data.filter((notes)=>{
        return notes.tag === action.payload;
      });
    },
    updateNoteReducer(state, action)   {
      //   deleting and adding note
      state.data.map((note)=>{
        if (note._id === action.payload._id) {
          note.title = action.payload.title;
          note.body = action.payload.body;
          note.tag = action.payload.tag;
        }
      });
    },
  },
});

export const noteReducer = noteSlicer.reducer;
export const {
  addNoteReducer,
  updateNoteReducer,
  deleteNoteReducer,
  fetchDataReducer,
  updateDataByCategoryReducer
} = noteSlicer.actions;
