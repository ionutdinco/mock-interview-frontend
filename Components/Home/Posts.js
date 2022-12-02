import React, { useDebugValue } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPost } from "../../public/src/features/postSlice";
import Post from "../Home/Post";

const PostNews = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectPost);
  return (
    <div>
      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
};

export default PostNews;
