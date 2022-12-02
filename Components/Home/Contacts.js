import React from "react";
import Contact from "../Home/Contact";

const Contacts = () => {
  return (
    <div className="flex flex-col px-4 pt-4 overflow-auto space-y-2">
      <Contact src="https://randomuser.me/api/portraits/women/81.jpg" name={"Dinco Ionut-Andrei"} status="Online" />
      <Contact src="https://randomuser.me/api/portraits/women/81.jpg" name={"Dinco Ionut"} status="Offline"/>
      <Contact src="https://randomuser.me/api/portraits/women/81.jpg" name={"Dinco Andrei"} status="Offline"/>
     
    </div>
  );
};

export default Contacts;
