import React, { useContext, useEffect, useRef, useState } from "react";
import MyContext from "../context/notes/noteContext";
import NoteCard from "./noteCard";
import NoteForm from "./noteform";

import { useNavigate } from "react-router-dom";

function Home() {
  // CONTEXTS
  const { notes, addNote, fetchData, updateNoteInContext, authToken } =
    useContext(MyContext);
  // STATES
  const [text, setText] = useState({ title: "", body: "", tag: "" });
  const [stateId, setstateID] = useState("");
  const [dataFetched, setDataFetched] = useState(false);

  console.log(authToken);

  const ref = useRef(null);
  // for another modal which will show success the note have been updated
  const refupdated = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAndRedirect =  () => {
      try {
        if (authToken && authToken.length > 5) {
          console.log("home.js : got auth token and loading the fetch data")
           fetchData();
        } else {
          console.log("home.js : value of auth token is null so we are redirecting to login page")
          // navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error appropriately
      }
    };

    fetchAndRedirect();
  }, [authToken, fetchData, navigate]);
  

  // useEffect(() => {
  //   const fetchDataAsync = async () => {
  //     try {
  //       await fetchData();
  //       setDataFetched(true);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
   //     }
  //   };

   //   if (authToken !== null) {
   //     fetchDataAsync();
  //   } else {
  //     console.log("Auth token is not available : ", authToken);
   //     navigate("/login");
  //   }
  // }, [fetchData, authToken, navigate]);



  
   const settingNote = (e) => {
    e.preventDefault();
    const { title, body, tag } = text; //text is a state variable that holds the entire node info
    addNote(title, body, tag);
    console.log("Note value returned by the form ", text);
  };

  const settingupdatednote = (e) => {
    e.preventDefault();
    // getting all the values that were inside the text boxes
    const { title, body, tag } = text;

    updateNoteInContext(stateId, title, body, tag);
    console.log("Note value returned by the form ", text);
    // setText({ title: "", body: "", tag: "" });
  };

  // passing an complete object to our state which will be text

  // if anything is entered in the text box
  const onChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);

    setText({ ...text, [e.target.name]: e.target.value });
    console.log(text);
  };

  // FUNCTIONS FOR SHOWING NOTES
  const updateNote = (note) => {
    ref.current.click();
    console.log(ref.current);
    //      ID
    setstateID(note._id);
  };

  // For showing note is successfully updated
  const successUpdated = (e) => {
    console.log("Success updated clicked buddy step 1 done success updated");
    ref.current.click();
    settingupdatednote(e); //it's a function call with argument e
  };

  const refreshpage = () => {
    window.location.reload();
  };

  return (
    <>
      <>
        {/* ADDING NOTES  */}
        <NoteForm />

        {/* SHOWING AVAILABLE NOTES  */}
        <div className="container">
          <div className="mt-4">
            <h2 className="display-4">Available Notes</h2>
            <br />
            <div className="row">
              {notes.length > 0 ? (
                notes.map((note) => (
                  <div className="col-md-3 my-2" key={note._id}>
                    {
                      <NoteCard
                        note={note}
                        updateNote={updateNote}
                        key={note._id}
                      />
                    }{" "}
                  </div>
                ))
              ) : (
                <h4 className="display-6 fs-4">No Notes to Display</h4>
              )}
            </div>
          </div>

          {/* Modal for editing the note , note this is a button that we have hide out with the help of d-none */}
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
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
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
                  {/* Actual form which is inside the modal of editing values  */}

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
                      <>
                        {/* Button trigger modal */}
                        <button
                          type="submit"
                          className="btn btn-primary"
                          // onClick={settingupdatednote}
                          onClick={successUpdated}
                        >
                          Submit
                        </button>
                      </>

                  
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}

export default Home;
