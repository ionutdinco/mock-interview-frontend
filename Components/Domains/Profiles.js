import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

const Profiles = ({ props }) => {
  const MOCK_INTERVIEW_PLAT_ENDPOINT_PROFESSIONAL =
    "http://localhost:8181/api/v1/professional";
  const MOCK_INTERVIEW_PLAT_ENDPOINT_CONTACTS =
    "http://localhost:8181/api/v1/contacts";
  const { data: session } = useSession();
  const [data, setData] = useState();

  useEffect(() => {
    console.log("uff:", props);
    const fetchData = () => {
      axios
        .get(MOCK_INTERVIEW_PLAT_ENDPOINT_PROFESSIONAL, {
          params: { domain: props },
        })
        .then((response) => {
          setData(response.data);
          console.log("data-", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, []);

  const InviteHandler = (email, name, icon) => {
    console.log(email);
    console.log(session?.user.email);
    const formData = new FormData();
    formData.append("emailF", session?.user.email);
    formData.append("nameF", session?.user.name);
    formData.append("iconF", session?.user.image);
    formData.append("emailS", email);
    formData.append("nameS", name);
    formData.append("iconS", icon);
    formData.forEach((e) => console.log(e))
    axios
      .post(MOCK_INTERVIEW_PLAT_ENDPOINT_CONTACTS, formData, {
        headers: { accept: "application/json", 'Content-Type': 'application/json' 
      },
      })
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col space-y-2 max-w-xs overflow-auto">
      {data?.map((prop) => (
        <div className="flex flex-row" key={prop.email}>
          <img
            className="w-12 rounded-full border-2 border-teal-700 shadow-md"
            src={prop?.icon}
            alt="Profile Picture"
          ></img>
          <div className="flex flex-col w-full">
            <p className="px-2">{prop?.name}</p>
            <p className="font-thin px-2 text-[#e37d95d3]">
              {prop?.profession}
            </p>
          </div>
          <button
            className="border-2 shadow-md rounded-md px-2"
            onClick={() => InviteHandler(prop?.email, prop?.name, prop?.icon)}
          >
            Add
          </button>
        </div>
      ))}
    </div>
  );
};

export default Profiles;
