import {
  addNoteReducer,
  updateNoteReducer,
  deleteNoteReducer,
  fetchDataReducer
} from "../slicers/noteSlicer";
import { toast } from "react-toastify"; // Assuming you're using React Toastify for notifications

const auth_token = localStorage.getItem("auth_token");
const host = "http://localhost:4000";

export const fetchNotes = async (dispatch) => {
  const response = await fetch(
    "http://localhost:4000/notes/api/fetchingNotes",
    {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("auth_token"),
      },
    }
  );
  const noteData = await response.json();
  console.log("Value of notedata inside use effect ", noteData);
  dispatch(fetchDataReducer(noteData));
  console.log("fetchdata done for notedata");
};

export const addNote = async (dispatch, title, body_, tag) => {
  try {
    const data = {
      title,
      body: body_,
      tag,
    };
    const response = await fetch(`${host}/notes/api/addingNotes`, {
      method: "POST",
      headers: {
        "auth-token": auth_token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const noteJson = await response.json();
      dispatch(addNoteReducer(noteJson));
      //   toast.success("Note added successfully!"); // Show success notification
      console.log("Notes added successfully");
    } else {
      const errorText = await response.text();
      console.error("Error adding note:", errorText);
      toast.error("An error occurred while adding the note."); // Show error notification
    }
  } catch (error) {
    console.error("Error adding note:", error);
    toast.error("An error occurred while adding the note."); // Show error notification
  }
};

export const deleteNote = async (dispatch, id) => {
  try {
    const response = await fetch(`${host}/notes/api/deletingnotes/${id}`, {
      method: "DELETE",
      headers: {
        "auth-token": auth_token,
      },
    });

    if (response.ok) {
      dispatch(deleteNoteReducer(id));
      console.log("Note Deleted Successfully");
    } else {
      console.log("Value of id passed in the delete node is : ", id);
      const errorText = await response.text();
      console.error("Error deleting note:", errorText);
      toast.error("An error occurred while deleting the note."); // Show error notification
    }
  } catch (error) {
    console.error("Error deleting note:", error);
    toast.error("An error occurred while deleting the note."); // Show error notification
  }
};

export const updateNote = async (dispatch, id, title, body_, tag) => {
  try {
    const data = {
      title,
      body: body_,
      tag,
    };
    const response = await fetch(`${host}/notes/api/updatingnotes/${id}`, {
      method: "PUT",
      headers: {
        "auth-token": auth_token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const updatedNote = await response.json();
      dispatch(updateNoteReducer(updatedNote));
      console.log("Data is updated Successfully");
    } else {
      const errorText = await response.text();
      console.error("Error updating note:", errorText);
      toast.error("An error occurred while updating the note."); // Show error notification
    }
  } catch (error) {
    console.error("Error updating note:", error);
    toast.error("An error occurred while updating the note."); // Show error notification
  }
};
