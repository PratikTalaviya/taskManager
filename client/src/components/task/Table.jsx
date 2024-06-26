import React, { useState } from "react";
import { BiMessageAltDetail } from "react-icons/bi";
import { MdAttachFile, MdKeyboardArrowDown, MdKeyboardArrowUp, MdKeyboardDoubleArrowUp } from "react-icons/md";
import { toast } from "sonner";
import { BGS, PRIOTITYSTYELS, TASK_TYPE, formatDate } from "../../utils";
import clsx from "clsx";
import { BsDash } from "react-icons/bs";
import { FaList } from "react-icons/fa";
import UserInfo from "../UserInfo";
import Button from "../Button";
import ConfirmatioDialog from "../Dialogs";
import { useDispatch, useSelector } from "react-redux";
import { setReloadTask } from "../../redux/slices/taskSlice";
import axios from "axios";
import AddTask from "./AddTask";
import ViewTask from "./ViewTask";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  normal: <BsDash />,
  low: <MdKeyboardArrowDown />,
};

const Table = () => {
  const { userTasks } = useSelector((state) => state.task);
  const [openDialog, setOpenDialog] = useState(false);
  const [selected, setSelected] = useState(null);
  const [selectedTask, setSelectedTask] = useState({});
  const [open, setOpen] = useState(false);
  const [openTask, setOpenTask] = useState(false);
  const dispatch = useDispatch();

  const deleteClicks = (id) => {
    setSelected(id);
    setOpenDialog(true);
  };

  const editClicks = (task) => {
    setSelectedTask(task);
    setOpen(true);
  };

  const taskOpen = (task) => {
    setSelectedTask(task);
    setOpenTask(true);
  };

  const deleteHandler = async () => {
    try {
      console.log("deleted");
      // const response = await axios.put(`http://localhost:5000/api/task/${selected}`);
      const response = await axios.put(`https://task-manager-steel-delta.vercel.app/api/task/${selected}`);
      toast.success(response.data.message);
      setOpenDialog(false);
      dispatch(setReloadTask());
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const TableHeader = () => (
    <thead className="w-full border-b border-gray-300">
      <tr className="w-full text-black  text-left">
        <th className="py-2">Task Title</th>
        <th className="py-2">Priority</th>
        <th className="py-2 line-clamp-1">Created At</th>
        <th className="py-2">Deadline</th>
        <th className="py-2 pl-3">Sub Tasks</th>
      </tr>
    </thead>
  );

  const TableRow = ({ task }) => (
    <tr className="border-b border-gray-200 text-gray-600 hover:bg-gray-300/10" onClick={() => taskOpen(task)}>
      <td className="py-2">
        <div className="flex items-center gap-2">
          <div className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])} />
          <p className="w-full line-clamp-2 text-base text-black">{task?.title}</p>
        </div>
      </td>

      <td className="py-2">
        <div className={"flex gap-1 items-center"}>
          <span className={clsx("text-lg", PRIOTITYSTYELS[task?.priority])}>{ICONS[task?.priority]}</span>
          <span className="capitalize line-clamp-1">{task?.priority} Priority</span>
        </div>
      </td>

      <td className="py-2">
        <span className="text-sm text-gray-600">{formatDate(new Date(task?.createdAt))}</span>
      </td>
      <td className="py-2">
        <span className="text-sm text-gray-600">{formatDate(new Date(task?.date))}</span>
      </td>

      <td className="py-2">
        <div className="flex items-center justify-center gap-3">
          {/* <div className='flex gap-1 items-center text-sm text-gray-600'>
            <BiMessageAltDetail />
            <span>{task?.activities?.length}</span>
          </div>
          <div className='flex gap-1 items-center text-sm text-gray-600 dark:text-gray-400'>
            <MdAttachFile />
            <span>{task?.assets?.length}</span>
          </div> */}
          <div className="flex gap-1 items-center text-sm text-gray-600 dark:text-gray-400">
            <FaList />
            <span>0/{task?.subTasks?.length}</span>
          </div>
        </div>
      </td>

      {/* <td className="py-2">
        <div className="flex">
          {task?.team?.map((m, index) => (
            <div
              key={m._id}
              className={clsx(
                "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
                BGS[index % BGS?.length]
              )}
            >
              <UserInfo user={m} />
            </div>
          ))}
        </div>
      </td> */}

      <td className="py-2 flex gap-2 md:gap-4 justify-end">
        <Button
          className="text-blue-600 hover:text-blue-500 sm:px-0 text-sm md:text-base"
          label="Edit"
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            editClicks(task);
          }}
        />

        <Button
          className="text-red-700 hover:text-red-500 sm:px-0 text-sm md:text-base"
          label="Delete"
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            deleteClicks(task._id);
          }}
        />
      </td>
    </tr>
  );
  return (
    <>
      <div className="bg-white  px-2 md:px-4 pt-4 pb-9 shadow-md rounded">
        <div className="overflow-x-auto">
          <table className="w-full ">
            <TableHeader />
            <tbody>
              {userTasks.map((task, index) => (
                <TableRow key={index} task={task} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ViewTask open={openTask} setOpen={setOpenTask} task={selectedTask} />

      <AddTask open={open} setOpen={setOpen} task={selectedTask} key={new Date().getTime()} />

      <ConfirmatioDialog open={openDialog} setOpen={setOpenDialog} onClick={deleteHandler} />
    </>
  );
};

export default Table;
