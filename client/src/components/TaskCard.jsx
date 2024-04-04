import clsx from "clsx";
import React, { useState } from "react";
import { MdAttachFile, MdKeyboardArrowDown, MdKeyboardArrowUp, MdKeyboardDoubleArrowUp } from "react-icons/md";
import { BGS, PRIOTITYSTYELS, TASK_TYPE, formatDate } from "../utils";
import TaskDialog from "./task/TaskDialog";
import { FaList } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import AddSubTask from "./task/AddSubTask";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const TaskCard = ({ task }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="w-full h-fit bg-white shadow-md p-4 rounded">
        <div className="w-full flex justify-between">
          <div className={clsx("flex flex-1 gap-1 items-center text-sm font-medium", PRIOTITYSTYELS[task?.priority])}>
            <span className="text-lg">{ICONS[task?.priority]}</span>
            <span className="uppercase">{task?.priority} Priority</span>
          </div>

          <TaskDialog task={task} />
        </div>

        <>
          <div className="flex items-center gap-2">
            <div className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])} />
            <h4 className="line-clamp-1 text-black">{task?.title}</h4>
          </div>
          <span className="text-sm text-gray-600">{formatDate(new Date(task?.date))}</span>
        </>

        <div className="w-full border-t border-gray-200 my-2" />
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="flex gap-1 items-center text-sm text-gray-600 ">
              <FaList />
              <span>0/{task?.subTasks?.length}</span>
            </div>
          </div>
        </div>

        {task?.subTasks?.length > 0 ? (
          task?.subTasks?.map((subTask) => (
            <div className="px-5 py-2 border-t border-gray-200" key={subTask.id}>
              <h5 className="text-base line-clamp-1 text-black">{subTask?.title}</h5>
              <div className=" space-x-8">
                <span className="text-sm text-gray-600">{formatDate(new Date(subTask?.date))}</span>
                <span className="bg-blue-600/10 px-3 py-1 rounded-full text-blue-700 font-medium">{subTask?.tag}</span>
              </div>
            </div>
          ))
        ) : (
          <>
            <div className="py-4 border-t border-gray-200">
              <span className="text-gray-500">No Sub Task</span>
            </div>
          </>
        )}

        <div className="w-full pb-2">
          <button
            onClick={() => setOpen(true)}
            className="w-full flex gap-4 items-center text-sm text-gray-500 font-semibold disabled:cursor-not-allowed disabled::text-gray-300"
          >
            <IoMdAdd className="text-lg" />
            <span>ADD SUBTASK</span>
          </button>
        </div>
      </div>

      <AddSubTask open={open} setOpen={setOpen} id={task._id} />
    </>
  );
};

export default TaskCard;
