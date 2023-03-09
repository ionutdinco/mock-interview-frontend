// printed-books/:book-id
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../../Components/Professionals/Header";
import Head from "next/head";

export default function Quiz({ data }) {
  const MOCK_INTERVIEW_PLAT_ENDPOINT_QUIZ =
    "http://localhost:8181/api/v1/quiz/verify";
  const [matrix, setMatrix] = useState(
    Array.from({ length: data.questions.length }, () =>
      Array.from({ length: 6 }, () => false)
    )
  );
  const [showResults, setShowResults] = useState({state:false, value:-1});

  useEffect(() => {
    console.log("params:", data);
  }, []);

  const handleChange = (row, column) => {
    const i = parseInt(row);
    const j = parseInt(column);
    console.log("indexs:", row, "   ", column);
    let copy = [...matrix];
    copy[i][j] = !matrix[i][j];
    setMatrix(copy);

    console.log(matrix);
  };

  const verifyAnswers = () => {
    const resp = {
      checkboxArray: matrix,
    };
    axios
      .post(MOCK_INTERVIEW_PLAT_ENDPOINT_QUIZ, matrix, {
        params: { id: data.id },
      })
      .then((resp) => {
        console.log(resp.data);
        setShowResults({state:true, value:resp.data});
      })
      .catch((err) => console.log(err));
  };

  const handleTryAgain = () => {
    setShowResults({state:false, value:-1});
  }

  return (
    <div>
      <Head>
        <title>Mock Interview App Home</title>
        <meta name="Professional" content="Professions management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        {showResults.state && (
          <div className="flex flex-col justify-center w-32 h-32 mx-auto mt-32 rounded-full border-2 border-teal-900 bg-teal-700 text-white shadow-md">
            <p className="w-fit mx-auto p-2">Correct Ans: {showResults.value}</p>
            <p className="w-fit mx-auto cursor-pointer p-2" onClick={handleTryAgain}>Try Again</p>
          </div>
        )}
        { !showResults.state && (
          <div className="w-2/5 mx-auto space-y-2">
            <p className="w-fit mx-auto mt-3 p-2 border-2 border-red-400 rounded-md bg-red-200">
              {data.title}
            </p>
            <br />
            {data?.questions.map((question, x) => (
              <div className="bg-red-200 rounded-md p-3 shadow-md" key={x}>
                <div>
                  <p className="border-b-2 border-red-600 p-1 font-thin">
                    Question
                  </p>
                  <p className="p-2">{question.question}</p>
                </div>
                <div>
                  <p className="border-b-2 border-red-600 p-1 font-thin">
                    Description
                  </p>
                  <p className="p-2">{question.description}</p>
                </div>
                {question?.answersValues.map((val, y) => (
                  <div className="flex flex-row" key={y}>
                    <input
                      type="checkBox"
                      onClick={() => handleChange(x, y)}
                    ></input>
                    <p className="p-2">{val}</p>
                  </div>
                ))}
              </div>
            ))}
            <button
              className="p-2 bg-red-200 border-2 rounded-full hover:bg-green-200 shadow-md"
              onClick={verifyAnswers}
            >
              Finish
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;

  const res = await fetch(
    "http://localhost:8181/api/v1/quiz/" + `${params.quizId}`
  );
  const data = await res.json();

  return {
    props: { data },
  };
}
