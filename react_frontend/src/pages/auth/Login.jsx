import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import axiosClient from "../../axios-client";
import { StateContext } from "../../contexts/ContextsProvider";

export default function Login() {
  const { setUser, setToken } = useContext(StateContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handeleSumbit = async (e) => {
    e.preventDefault();
    console.log(formData);

    await axiosClient
      .post("/login", formData)
      .then((response) => {
        console.log(response.data);
        setUser(response.data.user);
        setToken(response.data.token);
        // console.log(response.data.token)
        // console.log(response.data.user)
      })
      .catch((err) => {
        console.log(err);
        const response = err.response;
        if (response && response.status === 422) {
          if (response.data.errors) {
            setErrors(response.data.errors);
          } else {
            setErrors({
              email: [response.data.message],
            });
          }
        }
      });
  };

  return (
    <>
      <section className="bg-light py-3 py-md-5 py-xl-8">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
              <div className="card border border-light-subtle rounded-4">
                <div className="card-body p-3 p-md-4 p-xl-5">
                  <form onSubmit={handeleSumbit}>
                    <h4 className="text-center mb-4">Sign in</h4>
                    {errors && (
                      <div className="alert alert-danger" role="alert">
                        {Object.keys(errors).map((key) => (
                          <p key={key}>{errors[key][0]}</p>
                        ))}
                      </div>
                    )}
                    <div className="row gy-3 overflow-hidden">
                      <div className="col-12">
                        <div className="form-floating mb-1">
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            id="email"
                            placeholder="name@example.com"
                            value={formData.email}
                            onChange={handleChange}
                          />
                          <label htmlFor="email" className="form-label">
                            Email
                          </label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating mb-1">
                          <input
                            type="password"
                            className="form-control"
                            name="password"
                            id="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                          />
                          <label htmlFor="password" className="form-label">
                            Password
                          </label>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="d-grid">
                          <button
                            className="btn btn-primary btn-lg"
                            type="submit"
                          >
                            Login
                          </button>
                        </div>
                      </div>
                      <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-center mt-3">
                        <p className="m-0 text-secondary text-center">
                          Already have an account?{" "}
                          <Link
                            to="/signup"
                            className="link-primary text-decoration-none"
                          >
                            Sign up
                          </Link>
                        </p>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
