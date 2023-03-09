import React from "react";
import SelectProfession from "./SelectProfession";
import CreateProfession from "./CreateProfession";

const Professional = () => {
  return (
    <div className="flex flex-col align-cente w-64">
      <SelectProfession />
      <br/>
      <CreateProfession />
    </div>
  );
};

export default Professional;
