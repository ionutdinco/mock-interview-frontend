import axios from "axios";
import React, { useRef } from "react";
import { MdAddToPhotos } from "react-icons/md";
import { useDispatch } from "react-redux";
import { MdCreate } from "react-icons/md";

const CreateProfession = () => {
  const MOCK_INTERVIEW_PLAT_ENDPIONT =
    "http://localhost:8181/api/v1/profession/create";
  const domainref = useRef();
  const professionRef = useRef();
  const dispatch = useDispatch();

  const handlePostProffesion = (e) => {
    e.preventDefault();
    if (!domainRef.current.value || !professionRef.current.value) return;
    const formData = new FormData();
    formData.append("domain", domainref.current.value);
    formData.append("profession", professionRef.current.value);
    axios
      .post(MOCK_INTERVIEW_PLAT_ENDPIONT, formData, {
        headers: { accept: "application/json" },
      })
      .then((response) => {
        dispatch(addProfession(response.data));
        domainref.current.value = "";
        professionRef.current.value = "";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form className="flex flex-col space-y-2 bg-[#eee7ff] rounded-md py-3 items-center">
      <div className="flex flex-row">
        <MdCreate className="my-auto p-1" size={20} />
        <label className="p-1 text-[#5210a2]">Add Profession</label>
      </div>
      <input
        className="rounded-md outline-none shadow-md p-2"
        type="text"
        placeholder="Domain..."
        ref={domainref}
      ></input>
      <input
        className="rounded-md outline-none shadow-md p-2"
        type="text"
        placeholder="Profession..."
        ref={professionRef}
      ></input>
      <MdAddToPhotos
        size={35}
        className="text-green-600 cursor-pointer border-2 shadow-sm m-auto hover:text-green-800 hover:border-2 hover:border-sky-200"
        onClick={handlePostProffesion}
      />
    </form>
  );
};

export default CreateProfession;
