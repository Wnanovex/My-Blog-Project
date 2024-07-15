import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import { useParams } from "react-router-dom";

export default function BlogShow() {
  const { slug } = useParams();

  const [post, setPost] = useState([]);
  const [userPost, setUserPost] = useState({});

  const getPost = async () => {
    await axiosClient.get("/posts/" + slug).then((response) => {
      setPost(response.data.post);
      setUserPost(response.data.post.user);
    });
  };

  useEffect(() => {
    
    getPost();
  }, []);

  return (
    <div className="container d-flex justify-content-center align-items-center flex-column mt-3 p-3">
      <h3 className="display-5 text-center">{post.title}</h3>
      <img
        className="rounded img-fluid"
        src={`http://127.0.0.1:8000/storage/${post.img_path}`}
        style={{ width: "850px", height: "450px" }}
        alt=""
      />

      <div className="mt-4">
        <h4>
          By : <strong> {userPost.name}{" "}  </strong>
          
            {" "}
         <span className="float-md-end d-flex">On : {post.updated_at}</span>
         
        </h4>
        <p className="lead mt-3">{post.body}</p>
      </div>
    </div>
  );
}
