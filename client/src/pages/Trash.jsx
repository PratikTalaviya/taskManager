import clsx from "clsx";
import React, { useEffect, useState } from "react";
import {
  MdDelete,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdOutlineRestore,
} from "react-icons/md";
import toast from "react-hot-toast";
import { tasks } from "../assets/data";
import Title from "../components/Title";
import Button from "../components/Button";
import { PRIOTITYSTYELS, TASK_TYPE } from "../utils";
import AddUser from "../components/AddUser";
import ConfirmatioDialog from "../components/Dialogs";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setTrashedTasks, setReloadTrash } from "../redux/slices/taskSlice";
import Loading from "../components/Loader";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const Trash = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState(null);
  const [type, setType] = useState("delete");
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState("");

  const { user } = useSelector((state) => state.auth);
  const { trashedTasks, reloadTrash } = useSelector((state) => state.task);
  const token = user.token;
  const dispatch = useDispatch();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Set the Authorization header with the token
    },
  };

  useEffect(() => {
    const fetchTask = async () => {
      try {
        // const response = await axios.get("http://localhost:5000/api/task?isTrashed=true", config);
        const response = await axios.get("https://task-manager-steel-delta.vercel.app/api/task?isTrashed=true", config);
        dispatch(setTrashedTasks(response.data.tasks));
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTask();
  }, [reloadTrash]);

  const deleteRestoreHandler = async () => {
    const deleteRestore = async () => {
      try {
        const response = await axios.delete(
          // `http://localhost:5000/api/task/delete-restore/${selected}?actionType=${type}`,
          `https://task-manager-steel-delta.vercel.app/api/task/delete-restore/${selected}?actionType=${type}`,
          config
        );
        setOpenDialog(false);
        setLoading(false);
        toast.success(response.data.message);
        dispatch(setReloadTrash());
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    deleteRestore();
  };

  const deleteAllClick = () => {
    setType("deleteAll");
    setMsg("Do you want to permenantly delete all items?");
    setOpenDialog(true);
  };

  const restoreAllClick = () => {
    setType("restoreAll");
    setMsg("Do you want to restore all items in the trash?");
    setOpenDialog(true);
  };

  const deleteClick = (id) => {
    setType("delete");
    setSelected(id);
    setOpenDialog(true);
  };

  const restoreClick = (id) => {
    setSelected(id);
    setType("restore");
    setMsg("Do you want to restore the selected item?");
    setOpenDialog(true);
  };

  const TableHeader = () => (
    <thead className="border-b border-gray-300">
      <tr className="text-black  text-left">
        <th className="py-2">Task Title</th>
        <th className="py-2">Priority</th>
        <th className="py-2">Stage</th>
        <th className="py-2 line-clamp-1">Modified On</th>
      </tr>
    </thead>
  );

  const TableRow = ({ item }) => (
    <tr className="border-b border-gray-200 text-gray-600 hover:bg-gray-400/10">
      <td className="py-2">
        <div className="flex items-center gap-2">
          <div className={clsx("w-4 h-4 rounded-full", TASK_TYPE[item.stage])} />
          <p className="w-full line-clamp-2 text-base text-black">{item?.title}</p>
        </div>
      </td>

      <td className="py-2 capitalize">
        <div className={"flex gap-1 items-center"}>
          <span className={clsx("text-lg", PRIOTITYSTYELS[item?.priority])}>{ICONS[item?.priority]}</span>
          <span className="">{item?.priority}</span>
        </div>
      </td>

      <td className="py-2 capitalize text-center md:text-start">{item?.stage}</td>
      <td className="py-2 text-sm">{new Date(item?.date).toDateString()}</td>

      <td className="py-2 flex gap-1 justify-end">
        <Button icon={<MdOutlineRestore className="text-xl text-gray-500" />} onClick={() => restoreClick(item._id)} />
        <Button icon={<MdDelete className="text-xl text-red-600" />} onClick={() => deleteClick(item._id)} />
      </td>
    </tr>
  );

  return loading ? (
    <div className="py-10">
      <Loading />
    </div>
  ) : (
    <>
      <div className="w-full md:px-1 px-0 mb-6">
        <div className="flex items-center justify-between mb-8">
          <Title title="Trashed Tasks" />

          <div className="flex gap-2 md:gap-4 items-center">
            <Button
              label="Restore All"
              icon={<MdOutlineRestore className="text-lg hidden md:flex" />}
              className="flex flex-row-reverse gap-1 items-center  text-black text-sm md:text-base rounded-md 2xl:py-2.5"
              onClick={() => restoreAllClick()}
            />
            <Button
              label="Delete All"
              icon={<MdDelete className="text-lg hidden md:flex" />}
              className="flex flex-row-reverse gap-1 items-center  text-red-600 text-sm md:text-base rounded-md 2xl:py-2.5"
              onClick={() => deleteAllClick()}
            />
          </div>
        </div>
        <div className="bg-white px-2 md:px-6 py-4 shadow-md rounded">
          <div className="overflow-x-auto">
            <table className="w-full mb-5">
              <TableHeader />
              <tbody>
                {trashedTasks?.map((tk, id) => (
                  <TableRow key={id} item={tk} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* <AddUser open={open} setOpen={setOpen} /> */}

      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        msg={msg}
        setMsg={setMsg}
        type={type}
        setType={setType}
        onClick={() => deleteRestoreHandler()}
      />
    </>
  );
};

export default Trash;
