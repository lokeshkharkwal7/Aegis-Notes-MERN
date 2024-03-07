import React, { useEffect, useState } from "react";
import notepicture from "../photos/notebg.png";
import { useNavigate } from "react-router-dom";
import { addNote } from "./ProjectApi/noteApiCalls";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotes } from "./ProjectApi/noteApiCalls";
import { addNoteReducer } from "./slicers/noteSlicer";

function NoteForm({ clickOnShowNoteRef }) {
  const authToken = localStorage.getItem("auth_token");

  let notes = useSelector((state) => {
    return state.NOTESLICER;
  });
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // creating an onchange function

  const onChange = (e) => {
    e.preventDefault();
    setText({ ...text, [e.target.name]: e.target.value }); //main logic
  };

  // creating an settingNote function

  const [text, setText] = useState({ title: "", body: "", tag: "" });
  const [clickCounter, setClickCounter] = useState(0);

  const ClickedAddNote = async (e) => {
    e.preventDefault();
    // getting all the values that were inside the text boxes
    const { title, body, tag } = text;
    // Making API Calls for Add Note
    addNote(dispatch, title, body, tag);
    // just  to make sure the useeffect work well

    setClickCounter(clickCounter + 1);

    clickOnShowNoteRef();
    // due to some problem clicking the category navbar to update the changes

    console.log(
      "The Value of notes inside redux state after note edit is : ",
      notes
    );
    // Resetting the title body and tag for other entries
    setText({ title: "", body: "", tag: "" });
  };

  useEffect(() => {
    if (authToken && authToken.length > 5) {
      fetchNotes(dispatch);
    } else {
      console.log(
        "home.js: value of auth token is null so we are redirecting to login page"
      );
      navigate("/login");
    }
  }, [clickCounter]);
  return (
    <>
      <br />
      <div className="container-flex d-flex flex-wrap mt-5 px-5">
        {" "}
        <div className="col-md-7 mb-4">
          <img
            src={notepicture}
            className="img-fluid"
            style={{ maxWidth: "100%" }}
            alt="..."
          />
        </div>
        <div>
          <div className="col-md-25">
            <div className="container-fluid">
              <h1 className="display-4">
                Add a Note <i className="fa-regular fa-note-sticky"></i>
              </h1>
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    onChange={onChange}
                    // for resetting the fields after every submit
                    value={text.title}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="body" className="form-label">
                    Body
                  </label>
                  <textarea
                    className="form-control"
                    id="body"
                    name="body"
                    onChange={onChange}
                    rows="3"
                    value={text.body}
                    required
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Note Category
                  </label>
                  <select
                    id="tag"
                    className="form-select"
                    onChange={onChange}
                    name="tag"
                    value={text.tag}
                  >
                    <option value="" className="text-secondary " disabled>
                      Select Category
                    </option>
                    <option className="text-primary">Personal</option>
                    <option className="text-success">Work/Study</option>
                    <option className="text-info">Ideas and Creativity</option>
                    <option className="text-danger">To-Do List</option>
                  </select>
                </div>

                <div className="mb-3 form-check">
                  <label
                    className="form-check-label"
                    htmlFor="exampleCheck1"
                  ></label>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={ClickedAddNote}
                  disabled={
                    text.title.length < 3 || text.body.length < 3 ? true : false
                  }
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NoteForm;
