import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotes, updateNote } from "./ProjectApi/noteApiCalls";
import { useNavigate } from "react-router-dom";
import NoteCard from "./noteCard";
import NoteForm from "./noteform";
import CategoryNavbar from "./CategoryNavbar";

function Home() {
  

  const dispatch = useDispatch();
  const notes = useSelector((state) => state.NOTESLICER.data);
  const authToken = localStorage.getItem("auth_token");
  const [text, setText] = useState({ title: "", body: "", tag: "" });
  const [stateId, setstateID] = useState("");
  const ref = useRef(null);
  const navigate = useNavigate();

  // for makig buttons to click by itself
  const updateref = useRef(null);
  

  const clickOnShowAllNotes = () => {
    console.log("Called ref drill");
    setTimeout(() => {
      updateref.current.click();
    }, 900);
  };

  const settingupdatednote = (e) => {
    e.preventDefault();
    const { title, body, tag } = text;
    updateNote(dispatch, stateId, title, body, tag);
  };

  const onChange = (e) => {
    e.preventDefault();
    setText({ ...text, [e.target.name]: e.target.value });
  };

  const updateNoteForId = (note) => {
    console.log("Clecked on edit button and text is been aligned");
    ref.current.click();
    setstateID(note._id);
    setText({ title: note.title, tag: note.tag, body: note.body });
  };

  const successUpdated = async (e) => {
    e.preventDefault();
    const { title, body, tag } = text;
    console.log("updating the note begin on clicking the button");
    // ... (Optional: Perform necessary updates or validations)
    await updateNote(dispatch, stateId, title, body, tag);
    fetchNotes(dispatch);
    ref.current.click(); // Close the modal
    clickOnShowAllNotes();
  };

  // code for prope drilling inside the admin navbar to changed the notes categoryNotes state using useState

  const [categoryNotes, setCategoryNotes] = useState([]);
  const settingcategoryNotes = (notedata) => {
    setCategoryNotes(notedata);
  };

  const getNotesByCategories = (category) => {
    setCategoryNotes(category);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (authToken && authToken.length > 5) {
        await fetchNotes(dispatch);
        setCategoryNotes(notes);
        // THIS WILL CLICK ON THE SHOW NOTES BUTTON IN THE CATAGORICAL NAVBAR 
        clickOnShowAllNotes()
      } else {
        console.log(
          "home.js: value of auth token is null so we are redirecting to login page"
        );
        navigate("/login");
      }
    };

    fetchData(); // Call the async function
  }, [authToken, dispatch, navigate]); //////////

  return (
    <div className="container-fluid bg-dark text-light">
      <NoteForm
        clickOnShowNoteRef={clickOnShowAllNotes}
        savingData={settingcategoryNotes}
      />
      <div className="mt-4">
         <h2 className="display-4">Available Notes</h2>
        <br />
        <CategoryNavbar
          gettingNotesByCategories={getNotesByCategories}
          actualNotes={notes}
          updateref={updateref}
        />

        <div className="row">
          {categoryNotes.length > 0 ? (
            categoryNotes.map((note) => (
              <div className="col-md-3 my-2" key={note._id}>
                <NoteCard
                  note={note}
                  updateNoteForId={updateNoteForId}
                  key={note._id}
                  clickOnShowAllNotes={clickOnShowAllNotes}
                />
              </div>
            ))
          ) : (
            <h4 className="display-6 fs-4 mt-5 mb-5">No Notes to Display</h4>
          )}
        </div>
      </div>

      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch ( This is a Hidden Button in which we click and go to modal (
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog    ">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 text-dark" id="exampleModalLabel">
                Note Update Module
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Updated Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    onChange={onChange}
                    value={text.title}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="body" className="form-label">
                    Updated Body
                  </label>
                  <textarea
                    className="form-control"
                    id="body"
                    name="body"
                    onChange={onChange}
                    rows="3"
                    value={text.body}
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Updated Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="tag"
                    onChange={onChange}
                    name="tag"
                    value={text.tag}
                  />
                </div>

                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="exampleCheck1"
                  ></label>
                </div>

                <div className="modal-footer">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={successUpdated}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

// HERE IN THE CODE I USED REFS TO CLICK THE ALL NOTES BUTTON IN THE CATEGORICAL NAVBAR WITH A SETTIMEOUT OF 1 SEC , I HAVE USED THIS APPRACH SINCE I AM MOVING THE DATA FROM ONE STATE TO ANOTHER SINCE I AM WORKING ON REAL TIME CATEGORICAL DISPLAY OF DATA DEBUG THE CODE FOR DEEPER UNDERSTANDING 
