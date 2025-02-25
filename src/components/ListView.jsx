import React from "react";
import Todo from "./Todo";
import InProgress from "./InProgress";
import Completed from "./Completed";

const ListView = () => {
  return (
    <>
      <div className="w-[90%] mx-auto my-10  sm:border-t border-black/20">
        <ul className=" hidden sm:flex  py-2 font-semibold text-gray-600">
          <li className="w-80">Task name</li>
          <li className="w-64">Due on</li>
          <li className="w-64">Task Status</li>
          <li className="w-64">Task Category</li>
        </ul>
        <div className="my-4 space-y-6">
            <Todo />
            <InProgress />
            <Completed />
        </div>
      </div>
    </>
  );
};

export default ListView;
