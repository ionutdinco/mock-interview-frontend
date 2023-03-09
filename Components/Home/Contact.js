import React from "react";
import { AiFillMessage } from "react-icons/ai";
import { FcVideoCall } from "react-icons/fc";

const Contact = ({ name, src, status, id }) => {
  return (
    <div className="flex flex-row pb-1 pt-2 border-b-2 cursor-pointer hover:bg-[#339bae] rounded-md space-x-1">
      <div className="flex">
        <div className="relative w-8 h-8">
          <img
            className="rounded-full border border-gray-100 shadow-sm"
            src={src}
            alt="user image"
          />
          {status == "Online" && (
            <div className="absolute top-0 right-0 h-3 w-3 my-1 border-2 border-white rounded-full bg-green-400 z-2"></div>
          )}
          {status == "Offline" && (
            <div className="absolute top-0 right-0 h-3 w-3 my-1 border-2 border-white rounded-full bg-gray-400 z-2"></div>
          )}
        </div>
      </div>
      <span className="flex-grow font-serif text-cyan-200 pl-2 h-fit pt-2">
        {name}
      </span>
      {/* <AiFillMessage className="text-green-400 cursor-pointer pt-2" size={25} />
      <FcVideoCall className="cursor-pointer pt-1" size={25} /> */}
    </div>
  );
};

export default Contact;
