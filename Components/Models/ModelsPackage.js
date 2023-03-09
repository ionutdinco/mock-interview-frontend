import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddAllQuiz, selectQuiz } from "../../public/src/features/quizSlice";
import { TfiTimer } from "react-icons/tfi";
import { ImShare } from "react-icons/im";
import { useSession } from "next-auth/react";
import { FaWpforms } from "react-icons/fa";
import { FcShare } from "react-icons/fc";

const ModelsPackage = () => {
  const MOCK_INTERVIEW_PLAT_ENDPOINT_QUIZ = "http://localhost:8181/api/v1/quiz";
  const MOCK_INTERVIEW_PLAT_ENDPOINT_QUIZ_NOTIF =
    "http://localhost:8181/api/v1/quiz/notification";
  const MOCK_INTERVIEW_PLAT_ENDPOINT_CONTACTS =
    "http://localhost:8181/api/v1/contacts";
  const quizSet = useSelector(selectQuiz);
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const [selected, setSelected] = useState([]);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    console.log("useEffect");
    const fetchQuizSet = () => {
      axios
        .get(MOCK_INTERVIEW_PLAT_ENDPOINT_QUIZ, {
          params: { email: session?.user.email },
        })
        .then((response) => {
          dispatch(AddAllQuiz(response.data));
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchQuizSet();
  }, []);

  const handleSelectQuiz = (id) => {
    console.log("iddddd", selected);
    const idExists = selected.find((el) => el === id);
    if (idExists === undefined) {
      console.log("not existssssss");
      setSelected((selected) => [...selected, id]);
    } else {
      const index = selected.findIndex((el) => el === id);
      console.log("index:", index);
      setSelected((selected) => [
        ...selected.slice(0, index),
        ...selected.slice(index + 1),
      ]);
    }
  };

  const showContacts = () => {
    if (contacts.length > 0) {
      setContacts([]);
      return;
    }
    axios
      .get(MOCK_INTERVIEW_PLAT_ENDPOINT_CONTACTS, {
        params: { email: session?.user.email },
      })
      .then((response) => {
        console.log("resp AXIOS:", response.data);
        setContacts(response.data);
      });
  };

  const sendQuiz = (email) => {
    const data = new FormData();
    data.append("email", email);
    data.append("id", selected);
    axios
      .post(MOCK_INTERVIEW_PLAT_ENDPOINT_QUIZ_NOTIF, data,{
        headers: { accept: "application/json"}
    })
      .then((response) => console.log(response.data))
      .catch((err) => console.log(err));
  };

  return (
    <>
      {selected.length > 0 && (
        <FcShare
          className="mx-auto p-2 my-4 border-b-2 rounded-md shadow-md border-[#2784e1b9] cursor-pointer"
          size={50}
          onClick={showContacts}
        />
      )}
      {contacts.length > 0 && selected.length > 0 && (
        <div className=" w-2/5 max-h-[350px] overflow-auto bg-red-300 mx-auto p-2 rounded-md border-2 border-red-600">
          {contacts?.map((contact) => (
            <div className="flex flex-row justify-evenly" key={contact.id}>
              <div className="relative w-8 h-8">
                <img
                  className="rounded-full border border-gray-100 shadow-sm"
                  src={contact.iconS}
                  alt="user image"
                />
              </div>
              <p className="font-serif text-cyan-200 my-auto">
                {contact.nameS}
              </p>
              <button
                onClick={() => sendQuiz(contact.emailS)}
                className="font-serif text-cyan-200 rounded-full hover:bg-red-700 p-1"
              >
                Send
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="flex flex-wrap justify-evenly mx-20">
        {quizSet?.map((quiz) => (
          <div
            className={`w-[250px] rounded-md rounded-tr-[20px] border-2 px-2 py-5 shadow-md space-y-4 m-10 relative cursor-pointer hover:scale-105 hover:text-white hover:bg-[#4d56ca] ${
              selected.includes(quiz.id)
                ? "bg-[#4d56ca] text-white"
                : "bg-[#e2ebfd] text-[#33397c]"
            }`}
            key={quiz.id}
          >
            <div className="flex flex-row w-fit mx-auto">
              <FaWpforms size={35} />
              <p className="text-inherit px-2">{quiz.title}</p>
            </div>
            <div className="flex flex-row w-fit mx-auto">
              <TfiTimer size={25} />
              <p className="text-inherit px-2">{quiz.timer} min</p>
            </div>
            <ImShare
              className="w-fit mx-auto"
              size={30}
              onClick={() => handleSelectQuiz(quiz.id)}
            />
            <p className="absolute top-0 left-0 rotate-[-45deg] border-b-2 rounded-md text-inherit">
              quiz
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ModelsPackage;
