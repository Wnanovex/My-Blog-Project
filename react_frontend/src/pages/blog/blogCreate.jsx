import { useContext, useState } from "react";
import { StateContext } from "../../contexts/ContextsProvider";
import { Navigate, useNavigate } from "react-router-dom";
import axiosClient from "../../axios-client";

export default function BlogCreate() {
  const { token } = useContext(StateContext);

  const navigate = useNavigate();

  if (!token) {
    if (window.location == "http://localhost:5173/blog/create") {
      return <Navigate to="/" />;
    }
  }

  const [postData, setPostData] = useState({
    title: "",
    body: "",
    img: "", // name
  });

  const [errors, setErrors] = useState(null);

  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(postData)

    await axiosClient
      .post("/posts", postData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        navigate("/blog");
      })
      .catch((err) => {
        console.log(err);
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };

  return (
    <>
      <div className="container mt-3">
        <div className="d-flex align-items-center justify-content-center p-3">
          <div className="row">
            <h1 className="text-center">Create a new blog post</h1>

            {errors && (
              <div className="alert alert-danger" role="alert">
                {Object.keys(errors).map((key) => (
                  <p key={key}>{errors[key][0]}</p>
                ))}
              </div>
            )}

            <form className="col-12" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Enter Title"
                  className="form-control"
                  id="title"
                  name="title"
                  value={postData.title}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="body" className="form-label">
                  Content
                </label>
                <textarea
                  name="body"
                  placeholder="Enter Content"
                  id="body"
                  className="form-control"
                  value={postData.body}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="img" className="form-label">
                  Default file input example
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="img"
                  name="img"
                  onChange={(e) =>
                    setPostData({ ...postData, img: e.target.files[0] })
                  }
                />
              </div>
              <div className="d-grid col-6 mx-auto">
                <button type="submit" className="btn btn-primary">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
