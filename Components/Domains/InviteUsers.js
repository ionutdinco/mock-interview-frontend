import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  addAllDomain,
  selectDomain,
} from "../../public/src/features/domainSlice";
import { useRef } from "react";
import Profiles from "./Profiles";

const InviteUsers = ({ data }) => {
  const MOCK_INTERVIEW_PLAT_ENDPOINT_DOMAIN =
    "http://localhost:8181/api/v1/profession/domain";
  const dispatch = useDispatch();
  const domains = useSelector(selectDomain);
  const profList = useRef([]);
  const [selectors, setSelector] = useState(
    Array(data + 1).fill({ seen: false })
  );

  useEffect(() => {
    const fetchData = () => {
      const response = axios
        .get(MOCK_INTERVIEW_PLAT_ENDPOINT_DOMAIN)
        .then((response) => {
          dispatch(addAllDomain(response.data));
          setDomains(Object.values(response.data));
          console.log(Object.values(response.data));
        })
        .catch((e) => {
          console.log("error:" + e);
        });
    };
    fetchData();
  }, []);

  const fetchResources = (e) => {
    const index = e .currentTarget.getAttribute("a-index");    

    setSelector(
      selectors.map((selector, i) => {
        if (i == index) {
          return { ...selector, seen: !selector.seen };
        } else {
          return { selector };
        }
      })
    );
  };

  return (
    <>
      <div className="block">
        <p className="w-fit h-20 pt-7 text-lg font-semibold m-auto border-b-2 border-teal-700">
          Ask for help!
        </p>
      </div>
      <br />
      <div className="flex flex-wrap w-3/5 min-h-full overflow-y-auto m-auto justify-evenly">
        {domains?.map((domain, i) => (
          <div className="" key={domain.id}>
            <div
              onClick={fetchResources}
              ref={(el) => (profList.current[i] = el)}
              className="flex rounded-full h-36 w-36 mx-14 my-5 bg-[#fef2f3] text-center text-xl text-[#154c77] font-semibold hover:bg-[#e7a1b0] hover:text-white shadow-lg cursor-pointer"
              a-index={i}
            >
              <p a-index={i} className="m-auto">
                {domain.name}
              </p>
            </div>
            {selectors[i].seen && (<Profiles props={domain.id} />)}
          </div>
        ))}
      </div>
    </>
  );
};

export default InviteUsers;
  
