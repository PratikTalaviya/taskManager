import React from "react";
import TaskCard from "./TaskCard";
import { useSelector } from "react-redux";

const BoardView = () => {
  const { userTasks } = useSelector((state) => state.task);
  return (
    <div className="w-full py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 2xl:gap-10">
      {userTasks.map((task, index) => (
        <TaskCard task={task} key={index}/>
      ))}
    </div>
  );
};

export default BoardView;
