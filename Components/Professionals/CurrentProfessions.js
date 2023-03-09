import React, { useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import {
  addAllProfession,
  selectProfession,
} from "../../public/src/features/professionSlice";
import { useDispatch, useSelector } from "react-redux";
import { MdDoubleArrow } from 'react-icons/md';
import {MdOutlinePlaylistAddCheck} from 'react-icons/md';
import {TiDeleteOutline} from 'react-icons/ti';

const CurrentProfessions = ({ props }) => {
  const MOCK_INTERVIEW_PLAT_ENDPIONT =
    "http://localhost:8181/api/v1/profession";
  const dispatch = useDispatch();
  const professions = useSelector(selectProfession);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = () => {
      const response = axios
        .get(MOCK_INTERVIEW_PLAT_ENDPIONT, {
          params: { email: session?.user.email },
        })
        .then((response) => {
          dispatch(addAllProfession(response.data));
          console.log(response.data);
        });
    };
    fetchData();
  }, []);
  return (
    <div className="flex flex-col h-fit border-2 bg-[#eee7ff] shadow-md rounded-md px-6 py-4">
      <div className="flex flex-row">
        <MdOutlinePlaylistAddCheck className="my-auto" size={20}/>
        <p className="p-2">Professions</p>
      </div>
      {professions?.map((profession) => (
        <div key={profession.id} className="flex flex-row h-fit shadow-md rounded-md">
          <MdDoubleArrow className="w-15 my-auto" />
          <p className="w-full font-semibold text-[#5210a2] p-2">{profession.name}</p>
          <TiDeleteOutline className="my-auto pr-2 text-red-600 cursor-pointer" size={45}/>
        </div>
      ))}
    </div>
  );
};

export default CurrentProfessions;
