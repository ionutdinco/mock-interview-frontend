import Image from "next/image";
import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { IoMdArrowRoundBack } from 'react-icons/io';
import { signOut, useSession } from "next-auth/react";
import { SignOut } from "next-auth/react";
import { useState } from "react";
import { useRouter } from 'next/router';


const Header = ({props}) => {
  const { data: session } = useSession();
  const router = useRouter()
  const handleRoute = () =>{
    router.push('/');
  }

  return (
    <div className="bg-cyan-600 flex items-center p-2 shadow-md top-0 sticky z-50 h-16 rounded-md">
      <div className="flex min-w-fit left-2 cursor-pointer relative" onClick={handleRoute}>
      <IoMdArrowRoundBack size={30} />
      </div>
      <div className="flex flex-grow justify-center">
        <Image
          className="rounded-full"
          src={session?.user.image}
          width="50"
          height="50"
        />
        <p className="p-2 text-2xl text-white">
          {session?.user.name.split(" ")[0]}
        </p>
      </div>
      <div className="flex min-w-fit right-4 cursor-pointer">
        <div className="mr-4">
          <MdOutlineNotificationsActive size={30} />
        </div>
        <div onClick={signOut}>
          <FaSignOutAlt size={40} />
        </div>
      </div>
    </div>
  );
};

export default Header;
