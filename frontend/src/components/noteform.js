import React, { useContext, useEffect, useRef, useState } from "react";
import MyContext from "../context/notes/noteContext";
import notepicture from "../photos/notebg.png";
import { useNavigate } from "react-router-dom";

function NoteForm() {
  useEffect(() => {
    if (authToken.length > 5) {
      console.log("Auth token is not null : ", typeof authToken);
      fetchData();

      // Call the fetchData function only if data hasn't been fetched
    } else if (authToken === null) {
      console.log("Auth token is not available : ", authToken);
      // Redirect to the login page
      navigate("/login");
      console.log("Auth token is not available 2");
    }
  }, []);
  // context variables
  const { notes, addNote, fetchData, updateNoteInContext, authToken } =
    useContext(MyContext);

  const navigate = useNavigate();

  // creating an onchange function

  const onChange = (e) => {
    e.preventDefault();
    console.log(e.target.value); // this will be the text inside the form input
    // setText is the state variable
    setText({ ...text, [e.target.name]: e.target.value }); //main logic
    console.log(text);
  };

  // creating an settingNote function

  const [text, setText] = useState({ title: "", body: "", tag: "" });

  const settingNote = (e) => {
    e.preventDefault();
    // getting all the values that were inside the text boxes
    const { title, body, tag } = text;

    addNote(title, body, tag);
    console.log("Note value returned by the form ", text);
    setText({ title: "", body: "", tag: "" });
  };

  return (
    <>
      <div className="container d-flex flex-wrap">
        {" "}
        <div className="col-md-4 mb-4">
          <img
            src={notepicture}
            className="img-fluid"
            style={{ maxWidth: "100%" }}
            alt="..."
          />
        </div>
        <div>
          <div className="col-md-15">
            <div className="container">
              <h1 className="display-4">Add a Note</h1>
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
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="tag"
                    onChange={onChange}
                    name="tag"
                    value={text.tag}
                    required
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
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={settingNote}
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
