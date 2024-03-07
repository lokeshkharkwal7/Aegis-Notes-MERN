import React, { useEffect, useState } from "react";
import notepicture from "../photos/notesicon.png";
import { deleteNote } from "./ProjectApi/noteApiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchNotes } from "./ProjectApi/noteApiCalls";
import { deleteNoteReducer } from "./slicers/noteSlicer";

function NoteCard({ note, updateNoteForId, clickOnShowAllNotes }) {
  let authToken = localStorage.getItem("auth_token");
  const [countDeleteClicks, setcountDeleteClicks] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.NOTESLICER.data);

  let noteTag;
  switch (note.tag) {
    case "Personal":
      noteTag = "primary";
      break;
    case "Work/Study":
      noteTag = "success";
      break;
    case "Ideas and Creativity":
      noteTag = "info";
      break;
    case "To-Do List":
      noteTag = "danger";
      break;
    default:
      noteTag = "primary";
      break;
  }
  const onDelete = async () => {
    setcountDeleteClicks(countDeleteClicks + 1);
    await deleteNote(dispatch, note._id);
    // dispatch(deleteNoteReducer(note._id));
    clickOnShowAllNotes()
        
    console.log("Notes inside redux : ", notes);
     

    fetchNotes(dispatch);
  };
  const onUpdate = () => {
    updateNoteForId(note);
       
  };

  useEffect(() => {
    const fetchNoteAsync = async () => {
      if (authToken && authToken.length > 5) {
        await fetchNotes(dispatch);
      } else {
        console.log(
          "home.js: value of auth token is null so we are redirecting to login page"
        );
        navigate("/login");
      }
    };
    fetchNoteAsync();
  }, [countDeleteClicks]);

  // import picture from "../../public/notes"
  return (
    <>
      <div
        className={`card bg-${noteTag} text-white`}
        style={{ width: "18rem" }}
      >
        <img
          // src="https://loremflickr.com/900/1200"
          src={notepicture}
          className="col-md-12 row img-fluid"
          style={{ maxHeight: "2rem", maxWidth: "2rem" }}
          alt="📝"
        />
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.body}</p>

          <a href="#" className="btn">
            <i className="fa-regular fa-pen-to-square" onClick={onUpdate}></i>
          </a>

          {/* using deleting icon as an button  */}
          <a href="#" className="btn">
            <i className="fa-solid fa-trash" onClick={onDelete}></i>
          </a>
          <p className="card-text">
            <small className="text-muted-light">{note.date}</small>
          </p>
        </div>
      </div>
    </>
  );
}

export default NoteCard;

      
