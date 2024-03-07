import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { updateDataByCategoryReducer } from "./slicers/noteSlicer";

function CategoryNavbar({ gettingNotesByCategories, actualNotes, updateref }) {
  const dispatch = useDispatch();

  const clickedOnCategory = (categoryName) => {
    const notesByCategory = actualNotes.filter((note) => {
      return note.tag === categoryName;
    });
    gettingNotesByCategories(notesByCategory);
  };

  const resetingAllNotes = () => {
    gettingNotesByCategories(actualNotes);
  };

  return (
    <div>
      <nav className="navbar navbar-dark  navbar-expand-lg ">
        <div className="container-fluid">
          <button
            className="navbar-brand btn"
            onClick={() => resetingAllNotes()}
            ref={updateref}
          >
            All Notes
          </button>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <button
                  className="nav-link active"
                  aria-current="page"
                  onClick={() => clickedOnCategory("Personal")}
                >
                  Personal
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link"
                  onClick={() => clickedOnCategory("Work/Study")}
                >
                  Work/Study
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link"
                  onClick={() => clickedOnCategory("Ideas and Creativity")}
                >
                  Ideas and Creativity
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link"
                  onClick={() => clickedOnCategory("To-Do List")}
                >
                  To Do List
                </button>
              </li>
            </ul>
            <div className="btn-light " style={{ borderRadius: "10%" }}>
              Choose by Category
            </div>
            {/* <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search Notes"
                aria-label="Search"
              />
              <button className="btn btn-light" type="submit">
                Search
              </button>
            </form> */}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default CategoryNavbar;
