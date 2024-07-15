import { useContext, useEffect, useState } from "react";
import { StateContext } from "../../contexts/ContextsProvider";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../axios-client";

export default function BlogEdit() {
  const { user } = useContext(StateContext);

  const navigate = useNavigate();

  const { slug } = useParams();

  const [postData, setPostData] = useState({
    title: "",
    body: "",
    img: null, // name
  });

  const [errors, setErrors] = useState(null);

  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const getPost = async () => {
    await axiosClient.get("/posts/" + slug).then((response) => {
      if (response.data.post.user_id !== user.id) {
        navigate("/blog");
      }

      setPostData({
        title: response.data.post.title,
        body: response.data.post.body,
        img: response.data.post.img, // name
      });
    });
  };

  useEffect(() => {
    getPost();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(postData)

    // Create a new FormData object with the put method
    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("title", postData.title);
    formData.append("body", postData.body);
    if (postData.img) formData.append("img", postData.img); // name

    await axiosClient
      .post(`/posts/${slug}`, formData, {
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
            <h1 className="text-center">Update a blog post</h1>

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
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
