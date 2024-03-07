 
import { noteReducer } from "./noteSlicer";
import { configureStore } from "@reduxjs/toolkit";
 export const store = configureStore({
    reducer: {
        NOTESLICER: noteReducer,
      }   });
  