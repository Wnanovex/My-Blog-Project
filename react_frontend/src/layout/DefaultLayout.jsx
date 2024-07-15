import { Outlet, Link, useNavigate } from "react-router-dom";
import { StateContext } from "../contexts/ContextsProvider";
import { useContext, useEffect } from "react";
import axiosClient from "../axios-client";

export default function DefaultLayout() {
  const { token, user, setUser, setToken } = useContext(StateContext);

  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    await axiosClient.post("/logout").then(() => {
      setUser({});
      setToken(null);
      navigate("/login");
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    await axiosClient.get("/user").then((responce) => {
      setUser(responce.data);
    });
  };

  return (
    <>
      <nav className="navbar navbar-expand-md bg-dark navbar-dark fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand text-info" to="/dashboard">
            GreatPost
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
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link active" to="/dashboard">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/blog">
                  Blog
                </Link>
              </li>
              {token ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link active" to="#">
                      {user.name}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      onClick={handleLogout}
                      to="#"
                    >
                      Logout
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link active" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" to="/signup">
                      Signup
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <main>
        <Outlet />
      </main>

      <footer className="bg-dark text-light py-3 mt-5">
        <div className="container d-flex align-items-center justify-content-around flex-md-row flex-column">
          <ul className="list-unstyled d-flex align-items-center gap-5 flex-md-row flex-column">
            <li>
              <Link to="/dashboard" className="text-white">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/blog" className="text-white">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-white">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/services" className="text-white">
                Services
              </Link>
            </li>
          </ul>
          <p className="text-secondary">Copyright &copy; GreatPost 2024</p>
        </div>
      </footer>
    </>
  );
}
