import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Navbar() {
  // using context
  const authToken = localStorage.getItem("auth_token");
  // using useLocation hook
  let location = useLocation();
  const navigate = useNavigate();

  const deactivateAuthToken = () => {
    localStorage.setItem("auth_token", null);
    navigate("/login");
  };

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg bg-secondary border-bottom border-body fixed-top"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">
            Aegis Notes
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {localStorage.getItem("auth_token") && (
                <>
                  <li className={`nav-item`}>
                    <Link
                      className={`nav-link ${
                        location.pathname === "/home"
                          ? "active bg-dark text-alert"
                          : ""
                      }aria-current="true"`}
                      aria-current="page"
                      to="home"
                      style={{ borderRadius: "25%" }}
                    >
                      <i className="fa-solid fa-house-chimney mx-1"></i> Home
                    </Link>
                  </li>
                  <li className={`nav-item`}>
                    <Link
                      className={`nav-link ${
                        location.pathname === "/about"
                          ? "active bg-dark text-light"
                          : ""
                      }aria-current="true"`}
                      to="about"
                      style={{ borderRadius: "25%" }}
                    >
                      About
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Login and Sign Up Buttons */}
          <form className="d-flex ml-auto">
            {authToken === null ? (
              <>
                <Link className="btn btn-light me-2" to="/login" role="button">
                  Login
                </Link>
                <Link className="btn btn-light me-2" to="/signup" role="button">
                  Sign up
                </Link>
              </>
            ) : location.pathname === "/login" ? (
              <>
                <Link className="btn btn-light me-2" to="/signup" role="button">
                  Sign up
                </Link>
              </>
            ) : (
              <>
                <Link
                  className="btn btn-light me-2 "
                  to="/login"
                  role="button"
                  onClick={deactivateAuthToken}
                >
                  Log Out
                </Link>
              </>
            )}
          </form>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
