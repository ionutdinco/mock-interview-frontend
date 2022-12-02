
import React from 'react'
import { useState } from 'react';
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRef } from "react";
import { IoMdPhotos } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addPost } from '../../public/src/features/postSlice';

const CreatePost = () => {
  const MOCK_INTERVIEW_PLAT_ENDPIONT="http://localhost:8181/api/v1/post";
  const { data: session } = useSession();
  const inputRef = useRef();
  const hiddenFileInput = useRef();
  const [imageToPost, setImageToPost] = useState(null);
  const dispatch = useDispatch();

  const handleClickInputFile = ()=>{
    hiddenFileInput.current.click();
  }

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setImageToPost(e.target.value);
        };
    }
  }

  const handleDeleteImageToPost = () => {
    setImageToPost(null);
  }

  const handlePostFeed = (e) => {
    e.preventDefault();
    if(!inputRef.current.value) return;
    const formData = new FormData();
    formData.append("file", imageToPost);
    formData.append("post", inputRef.current.value);
    formData.append("name", session?.user.name);
    formData.append("email", session?.user.email);
    formData.append("profileImage", session?.user.image);
    axios.post(MOCK_INTERVIEW_PLAT_ENDPIONT, formData,{
        headers: { accept: "application/json"}
    })
    .then((response) => {
        console.log(response.data)
        inputRef.current.value = "";
        dispatch(addPost(response.data))
        handleDeleteImageToPost(); 
    })
    .catch((error) => {
        console.log(error);
    })


  }

  return (
    <div className="bg-white rounded-md shadow-md text-gray-500 p-2  mt-3">
      <div className="flex p-4 space-x-2 items-center">
        <Image
          className="rounded-full"
          src={session?.user.image}
          width="40"
          height="40"
        />
        <form className="flex flex-1">
          <input
            className="rounded-full flex-grow p-3 focus:outline-none text-gray-600 bg-gray-100"
            type="text"
            ref={inputRef}
            placeholder={`Hi, ${session?.user.name}! Share something within your community.`}
          ></input>
          <button hidden onClick={handlePostFeed}></button>
        </form>
      </div>
      {imageToPost && (
          <div className="flex items-center px-4 py-2 space-x-4 filter hover:brightness-110 transition duration-150 cursor-pointer">
              <img src={imageToPost} className="h-10 object-contain"/>
              <RiDeleteBin6Line onClick={handleDeleteImageToPost} className="h-8 text-red-400 hover:text-red-600"/>
          </div>
      )}
      <div onClick={handleClickInputFile} className="flex flex-row max-w-fit p-2 space-x-1 hover:cursor-pointer hover:bg-gray-200 hover: rounded-full">
        <IoMdPhotos className="text-green-400" size={25} />
        <p>Photo/Video</p>
        <input onChange={addImageToPost} type="file" ref={hiddenFileInput} hidden accept="image/*"/>
      </div>
      <div></div>
    </div>
  );
};

export default CreatePost;
