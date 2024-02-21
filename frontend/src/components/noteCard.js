import React, { useContext, useEffect } from "react";
import MyContext from "../context/notes/noteContext";
import notepicture from "../photos/notesicon.png";

function NoteCard({ note, updateNote }) {
  const { deleteNote, fetchData } = useContext(MyContext);
  const onDelete = () => {
    deleteNote(note._id);
  };
  const onUpdate = () => {
    updateNote(note);
  };
  useEffect(() => {
    fetchData();
  },[]);
  // import picture from "../../public/notes"
  return (
    <>
      <div className="card text-white bg-primary mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              // src="https://loremflickr.com/900/1200"
              src={notepicture}
              className="col-md-12 row img-fluid"
              alt="📝"
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{note.title}</h5>
              <p className="card-text">{note.body}</p>
              <a href="#" className="btn">
                <i
                  className="fa-regular fa-pen-to-square"
                  onClick={onUpdate}
                ></i>
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
        </div>
      </div>
    </>

  
  );
}

export default NoteCard;
