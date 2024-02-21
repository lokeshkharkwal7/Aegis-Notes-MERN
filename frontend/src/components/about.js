import React from "react";
import notepicture from "../photos/notes.jpg";

function About() {
  return (
    <div>
      <h1 className=""></h1>
      <div className="card mb-3" style={{ maxWidth: 1200 }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={notepicture}
              className="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title display-1">About KNote</h5>
              <p className="card-text">
                Your Ultimate Note-Taking Companion KNote, a cutting-edge
                note-taking application built on the robust MERN (MongoDB,
                Express.js, React, Node.js) stack, stands out as your ultimate
                companion for seamless and efficient note management. In a world
                bustling with information, KNote simplifies the process of
                storing and organizing your thoughts, ideas, and tasks on the
                go. Designed with user convenience in mind, KNote offers an
                intuitive and user-friendly interface that caters to both
                novices and seasoned note-takers. The application's MERN
                foundation ensures reliability, scalability, and responsiveness,
                providing a smooth and satisfying user experience. One of
                KNote's standout features is its accessibility across various
                devices, enabling users to access their notes anytime, anywhere.
                Whether you're using a desktop, laptop, tablet, or smartphone,
                KNote ensures that your notes are at your fingertips whenever
                inspiration strikes or tasks need tackling. KNote's advanced
                features include customizable tags, allowing users to categorize
                and filter notes effortlessly. The application's search
                functionality further enhances efficiency, helping users locate
                specific notes promptly. With the ability to add, edit, and
                delete notes seamlessly, KNote adapts to your dynamic
                note-taking needs. Security is paramount, and KNote prioritizes
                the protection of your data. Utilizing MongoDB for database
                management, the application ensures a secure environment for
                your valuable notes. In summary, KNote is not just a note-taking
                application; it's a dynamic, versatile tool that aligns with the
                fast-paced nature of modern life. Experience the convenience,
                flexibility, and security that KNote brings to the realm of
                digital note-taking. Elevate your productivity, creativity, and
                organization with KNote – because your ideas deserve a reliable
                home, and that home is KNote.
              </p>
              <p className="card-text">
                <small className="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
}

export default About;
