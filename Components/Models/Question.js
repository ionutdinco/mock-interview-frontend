import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import { IoMdPhotos } from "react-icons/io";


const Question = ({childFunc}) => {
  const hiddenFileInput = useRef();
  const [imageToPost, setImageToPost] = useState(null);
  const selector = [2, 3, 4, 5, 6];
  const [responses, setResponses] = useState({
    state: false,
    respNr: 0,
    checkboxValues: [],
    answersValues: [],
    title: "",
    description: ""
  });

  useEffect(() => {
    childFunc.current = handleSaveModel();
  }, [responses])

  const handleClickInputFile = () => {
    hiddenFileInput.current.click();
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    console.log("files:", e.target.files);
    console.log("files:", e.target.files);
    console.log("target:", e.target);
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        setImageToPost(e.target.value);
      };
    }
  };

  const handelResponsesNr = (e) => {
    const res = parseInt(e.target.value);
    setResponses({...responses,
      state: true,
      respNr: res,
      checkboxValues: Array(res).fill(false),
      answersValues: Array(res).fill(""),
    });
  };

  const handleCheckboxValue = (e) => {
    const index = parseInt(e.currentTarget.getAttribute("a-index"));
    setResponses({
      ...responses,
      checkboxValues: [
        ...responses.checkboxValues.slice(0, index),
        !responses.checkboxValues[index],
        ...responses.checkboxValues.slice(index + 1),
      ],
    });
    console.log(responses);
  };

  const handleAnswerValue = (e) => {
    const index = parseInt(e.currentTarget.getAttribute("a-index"));
    setResponses({
      ...responses,
      answersValues: [
        ...responses.answersValues.slice(0, index),
        e.currentTarget.value,
        ...responses.answersValues.slice(index + 1),
      ],
    });
    console.log(responses);
  };

  function handleSaveModel() {
    if (
      responses.title === "" ||
      responses.respNr === 0 ||
      (responses.description === "" && imageToPost === null)
    )
      return null;

    return {
      question: responses.title,
      description: responses.description,
      image: imageToPost,
      answersTypes: responses.checkboxValues,
      answersValues: responses.answersValues,
    };
  };

  return (
    <div className="bg-gradient-to-r to-[#f7cbb1] from-[#f2a77f]">
      <div className="flex flex-col">
        <input
          className="p-2 bg-transparent outline-none focus:bg-[#eb7a4c] text-white placeholder-white"
          onInput={(e) => setResponses({...responses, title:e.target.value})}
          type="text"
          placeholder="Question/Resume"
        ></input>
        <textarea
          className="p-2 bg-transparent outline-none focus:bg-[#eb7a4c] text-white placeholder-white"
          onInput={(e) => setResponses({...responses, description:e.target.value})}
          placeholder="Description"
          rows="5"
        ></textarea>
      </div>
      <div
        onClick={handleClickInputFile}
        className="flex flex-row max-w-fit p-2 space-x-1 text-[#73231b] hover:cursor-pointer hover:bg-gray-200 hover: rounded-full"
      >
        <IoMdPhotos className="text-green-400" size={25} />
        <p>Photo/Video</p>
        <input
          onChange={addImageToPost}
          type="file"
          ref={hiddenFileInput}
          hidden
          accept="image/*"
        />
      </div>
      <select
        className="px-2 bg-transparent outline-none focus:bg-[#eb7a4c] text-white"
        onChange={handelResponsesNr}
      >
        <option selected hidden disabled>
          {" "}
          Answer options{" "}
        </option>
        {selector.map((element) => (
          <option value={element} key={element}>
            {element}
          </option>
        ))}
      </select>
      <div className="flex flex-col p-1">
        {responses.state &&
          [...Array(parseInt(responses.respNr))].map((_, index) => (
            <div className="flex flex-row" key={index}>
              <input
                a-index={index}
                onChange={handleCheckboxValue}
                className="p-2"
                type="checkbox"
              ></input>
              <input
                a-index={index}
                onChange={handleAnswerValue}
                className="p-2 w-full bg-transparent outline-none focus:bg-[#eb7a4c] text-white placeholder-white"
                type="text"
                placeholder="Type Answer"
              ></input>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Question;
