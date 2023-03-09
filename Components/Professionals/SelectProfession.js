import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { FcTodoList } from "react-icons/fc";
import {
  addProfession,
  selectProfession,
} from "../../public/src/features/professionSlice";
import { useDispatch } from "react-redux";

const SelectProfession = () => {
  const MOCK_INTERVIEW_PLAT_ENDPIONT_DOMAIN =
    "http://localhost:8181/api/v1/profession/domain";
  const MOCK_INTERVIEW_PLAT_ENDPIONT_PROFESSION =
    "http://localhost:8181/api/v1/profession/professions";
  const MOCK_INTERVIEW_PLAT_ENDPIONT_PROFESSIONAL =
    "http://localhost:8181/api/v1/professional";
  const { data: session } = useSession();
  const [domains, setDomains] = useState();
  const [professions, setProfessions] = useState();
  const [selectProf, setSelectProf] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = () => {
      const response = axios
        .get(MOCK_INTERVIEW_PLAT_ENDPIONT_DOMAIN)
        .then((response) => {
          setDomains(Object.values(response.data));
        });
    };
    fetchData();
  }, []);

  const handleDomainSelect = (e) => {
    axios
      .get(MOCK_INTERVIEW_PLAT_ENDPIONT_PROFESSION, {
        params: { domain: e.target.value },
      })
      .then((response) => {
        setProfessions(Object.values(response.data));
      });
    if (!selectProf) setSelectProf(!selectProf);
  };

  const handleProfSelect = (e) => {
    const formData = new FormData();
    formData.append("email", session?.user.email);
    formData.append("name", session?.user.name);
    formData.append("icon", session?.user.image);
    formData.append("profession", e.target.value);
    axios
      .post(MOCK_INTERVIEW_PLAT_ENDPIONT_PROFESSIONAL, formData, {
        headers: {
          accept: "application/json",
          "Content-type": "application/json",
        },
      })
      .then((response) => {
        console.log("post:", response.data);
        dispatch(addProfession(response.data));
        setSelectProf(!selectProf);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="flex flex-col items-center bg-[#eee7ff] space-y-2 rounded-md py-3">
      <div className="flex flex-row">
        <FcTodoList className="my-auto p-1 text-[#5210a2]" size={20} />
        <label className="p-1 text-[#5210a2]">Select Profession</label>
      </div>
      <select
        className="w-4/5 outline-none rounded-md bg-transparent h-8 border-b-2 border-[#5210a2] text-[#5210a2]"
        onChange={handleDomainSelect}
      >
        <option selected hidden disabled>
          {" "}
          Choose a domain{" "}
        </option>
        {domains?.map((domain) => (
          <option className="text-teal-800" value={domain.name} key={domain.id}>
            {domain.name}
          </option>
        ))}
      </select>
      {selectProf && (
        <select
          className="w-4/5 outline-none rounded-md bg-transparent h-8 border-b-2 border-[#5210a2] text-[#5210a2]"
          onChange={handleProfSelect}
        >
          <option selected hidden disabled>
            {" "}
            Choose a profession{" "}
          </option>
          {professions?.map((profession) => (
            <option value={profession.name} key={profession.id}>
              {profession.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default SelectProfession;
