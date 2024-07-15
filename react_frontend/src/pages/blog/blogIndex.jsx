import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { StateContext } from "../../contexts/ContextsProvider";
import axiosClient from "../../axios-client";

export default function Blog() {
  const { token, user } = useContext(StateContext);

  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    await axiosClient.get("/posts").then((response) => {
      setPosts(response.data.posts);
      // console.log(response.data.posts)
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  const handleDeletePost = async (e, post) => {
    e.preventDefault();

    if (!window.confirm("Are you sure to delete this post?")) {
      return;
    }

    await axiosClient.delete(`/posts/${post.slug}`).then((response) => {
      getPosts();
    });
  };

  return (
    <>
      <div className="container">
        <h1 className="text-center mt-3">All Posts</h1>

        {token && (
          <div
            className="d-flex justify-content-center mt-3 pb-3"
            style={{ borderBottom: "1px solid black" }}
          >
            <Link className="btn btn-info text-white" to="/blog/create">
              Create A New Post
            </Link>
          </div>
        )}

        {posts.length > 0 ? (
          posts.map((post) => {
            return (
              <div
                key={post.id}
                className="post container d-flex align-items-start gap-3 mt-5 m-auto p-4 flex-lg-row flex-column justify-content-center"
                style={{ borderBottom: "1px solid black" }}
              >
                <img
                  className="rounded img-fluid"
                  src={`http://127.0.0.1:8000/storage/${post.img_path}`}
                  alt=""
                  style={{ width: "400px", height: "350px" }}
                />

                <div>
                  <h2>{post.title}</h2>
                  <h6>
                    By :{" "}
                    <strong>
                      {" "}
                      {
                        post.user.name
                        // get username of author
                      }
                      .
                    </strong>{" "}
                    <span className="float-md-end d-flex">On : {post.updated_at}</span>
                  </h6>
                  <p className="lead">{post.body.substring(0,300) + ' ...'}</p>
                  <div className="d-flex align-items-center gap-2 flex-sm-row flex-column justify-content-center">
                    <Link
                      to={"/blog/" + post.slug}
                      className="btn btn-secondary px-3"
                      style={{ background: "#3c3737", border: "none" }}
                    >
                      READ MORE
                    </Link>

                    {token && user.id === post.user_id && (
                      <>
                        <Link
                          to={"/blog/" + post.slug + "/edit"}
                          className="btn btn-primary mx-4 px-4"
                        >
                          EDIT
                        </Link>
                        <button
                          className="btn btn-danger px-4"
                          onClick={(e) => handleDeletePost(e, post)}
                        >
                          DELETE
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center">No Any Posts</div>
        )}
      </div>
    </>
  );
}
