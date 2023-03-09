import React, { createRef, useEffect, useRef, useState } from "react";
import Question from "./Question";
import { VscAdd } from "react-icons/vsc";
import { nanoid } from "nanoid";
import { MdTimer } from "react-icons/md";
import axios from "axios";
import { useSession } from "next-auth/react";

const Model = () => {
  const MOCK_INTERVIEW_PLAT_ENDPOINT_Quiz = "http://localhost:8181/api/v1/quiz";
  const nameRef = useRef();
  const childRef = useRef([]);
  const [rangeRef, setRangeRef] = useState(10);
  const [questions, setQuestions] = useState([]);
  const { data: session } = useSession();
  const index = useRef(0);

  useEffect(() => {
    childRef.current = Array(20)
      .fill()
      .map((_, i) => childRef.current[i] || createRef());
  });

  const handleSaveModel = () => {
    if (nameRef.current.value === "") {
      alert("Missing title");
      return;
    }

    const formData = {
      email: session?.user.email,
      title: nameRef.current.value,
      timer: rangeRef,
      questions: [],
    };
    const questions = [];

    childRef.current.forEach((ch) => {
      if (ch.current !== null) {
        formData.questions.push(ch.current);
      }
    });
    if (formData.questions.length <= 0) {
      alert("No");
      return;
    }
    console.log("data   :", formData);

    axios
      .post(MOCK_INTERVIEW_PLAT_ENDPOINT_Quiz, formData, {
        headers: {
          accept: "application/json",
          'content-type': 'application/json'
        },
      })
      .then((response) => console.log(response))
      .catch((e) => console.log(e));
  };

  return (
    <>
      <div className="flex flex-col w-4/5 sm:w-3/5 lg:w-2/5 m-auto p-2 rounded-md shadow-md space-y-3">
        <input
          className="p-2 bg-gradient-to-r to-[#f7cbb1] from-[#f2a77f] outline-none focus:bg-[#eb7a4c] text-white placeholder-white"
          type="text"
          ref={nameRef}
          placeholder="Title"
        ></input>
        <div>
          <div className="flex flex-row">
            <MdTimer size={30} />
            <p className="px-2">{rangeRef} min</p>
          </div>
          <input
            className="w-2/3"
            onChange={(e) => setRangeRef(e.currentTarget.value)}
            type="range"
            defaultValue="10"
            min="5"
            max="60"
            step="1"
          />
        </div>
        {questions}
      </div>
      <br />
      <div className="flex flex-row">
        <VscAdd
          className="text-white border-2 border-green-900 bg-gradient-to-r to-[#f7cbb1] from-[#fef5ef] rounded-full shadow-lg cursor-pointer hover:scale-110 mx-auto"
          onClick={() => {
            setQuestions([
              ...questions,
              <Question
                key={nanoid()}
                childFunc={childRef.current[index.current]}
              />,
            ]);
            index.current = index.current + 1;
            console.log(index.current);
            console.log("childRef", childRef);
          }}
          size={60}
        />
        <button
          className="p-3 mx-auto border-2 border-green-900 bg-gradient-to-r to-[#f7cbb1] from-[#fef5ef] rounded-full text-white hover:scale-110"
          onClick={handleSaveModel}
        >
          Save
        </button>
      </div>
    </>
  );
};

export default Model;
