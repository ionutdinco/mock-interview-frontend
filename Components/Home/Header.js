import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { signOut, useSession } from "next-auth/react";
import { SignOut } from "next-auth/react";
import { FcQuestions } from "react-icons/fc";
import TopNav from "./TopNav";
import { useState } from "react";
import axios from "axios";
import Link from 'next/link';


const Header = ({ props }) => {
  const MOCK_INTERVIEW_PLAT_ENDPOINT_QUIZ =
    "http://localhost:8181/api/v1/quiz/notification";
  const { data: session } = useSession();
  const [topNav, setTopNav] = useState(false);
  const [topQuizNot, setTopQuizNot] = useState(false);
  const quizNotifications = useRef([]);

  useEffect(() => {
    axios
      .get(
        MOCK_INTERVIEW_PLAT_ENDPOINT_QUIZ,
        { params: { email: session?.user.email } },
        { headers: { accept: "application/json" } }
      )
      .then((resp) => {
        quizNotifications.current = resp.data;
        console.log("resp->", quizNotifications.current.quizEntity);
      })
      .catch((err) => console.log(err));
  });

  const handleTopNav = () => setTopNav(!topNav);

  const handleQuizNotifications = () => setTopQuizNot(!topQuizNot);

  const solveQuiz = () => {

  }

  return (
    <div className="bg-cyan-600 flex items-center p-2 shadow-md top-0 sticky z-50 h-16 rounded-md">
      <div className="flex min-w-fit left-2 cursor-pointer relative">
        <BsFillMenuButtonWideFill size={40} onMouseEnter={handleTopNav} />
        {topNav && (
          <div
            className="absolute w-36 h-40 rounded-md bg-[#76deea] -bottom-[10rem] border-2 border-[#1f5a6b]"
            onMouseLeave={handleTopNav}
          >
            <TopNav props={props} />
          </div>
        )}
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
      <div className="flex items-center min-w-fit right-4 cursor-pointer">
        <div className="relative">
          <FcQuestions
            onClick={handleQuizNotifications}
            className="mx-4"
            size={40}
          />
          {topQuizNot && (
              quizNotifications.current.quizEntity.map((notification) => (
                <div key={notification.id} className='flex flex-row w-32 absolute rounded-md bg-[#76deea] p-2 justify-evenly cursor-pointer hover:bg-[#4dbcc8] '
                onClick={solveQuiz}
                >
                  <Link href={`/models/${notification.id}`} className="">{notification.title}</Link>
                  <p className="bg-red-300">{notification.timer}min</p>
                </div>
              ))
            )}
        </div>
        <div className="mx-4">
          <MdOutlineNotificationsActive color="white" size={30} />
        </div>
        <div onClick={signOut}>
          <FaSignOutAlt className="mx-4" size={40} />
        </div>
      </div>
    </div>
  );
};

export default Header;
