import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectContacts, addAllContacts } from "../../public/src/features/contactsSlice";
import Contact from "../Home/Contact";
import axios from 'axios';

const Contacts = () => {
  const MOCK_INTERVIEW_PLAT_ENDPIONT = "http://localhost:8181/api/v1/contacts";
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();
  const {data: session} = useSession();
  useEffect(() => {
    const fetchData = () => {
      const response = axios
        .get(MOCK_INTERVIEW_PLAT_ENDPIONT,{
          params: {email: session?.user.email}
        })
        .then((response) => {
          console.log("contacts:", response.data);
          dispatch(addAllContacts(response.data))
        }); 
    };
    fetchData();
  }, []);
  return (
    <div className="flex flex-col px-4 pt-4 overflow-auto space-y-2">
      {
        contacts?.map((contact) => (
          <Contact key={contact.id} src={contact.iconS } name = {contact.nameS} id={contact.emailS} status="Offline"/>
        ))
      }
     
    </div>
  );
};

export default Contacts;
