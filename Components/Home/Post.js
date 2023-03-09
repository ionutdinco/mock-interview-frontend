import Image from "next/image";
import React from "react";
import { FcLike } from "react-icons/fc";

const Post = ({ post }) => {
  return (
    <div className="flex flex-col shadow-md">
      <div className="bg-white mt-6 rounded-md p-4">
        <div className="flex items-center space-x-2">
          <img className="rounded-full w-10 h-10" src={post.profilePicture} />
          <div>
            <p className="font-medium">{post.name}</p>
            <p className="text-xs text-gray-500">{post.timeStamp}</p>
          </div>
        </div>
        <p className="py-4">{post.post}</p>
      </div>
      {post.image != "null" && (
        <div className="relative h-60 md:h-96 bg-white">
          <Image src={post.image} fill />
        </div>
      )}
      <div className="flex items-center bg-white">
        <div className="flex items-center m-auto space-x-1 p-1 hover:cursor-pointer hover:bg-slate-200 rounded-full">
          <FcLike size={30} />
          <p className="text-small">Heart</p>
        </div>
      </div>
    </div>
  );
};

export default Post;
