import axios from "axios";
import React, { useDebugValue, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAllPost, selectPost } from "../../public/src/features/postSlice";
import Post from "../Home/Post";

const Posts = () => {
  const MOCK_INTERVIEW_PLAT_ENDPIONT = "http://localhost:8181/api/v1/post";
  const dispatch = useDispatch();
  const posts = useSelector(selectPost);
  useEffect(() => {
    const fetchData = () => {
      const response = axios
        .get(MOCK_INTERVIEW_PLAT_ENDPIONT)
        .then((response) => {
          dispatch(addAllPost(response.data));
          console.log("i fire once");
        });
    };
    fetchData();
  }, []);
  return (
    <div>
      {posts.map((post) => (
        <Post post={post} key={post.id}/>
      ))}
    </div>
  );
};

export default Posts;
