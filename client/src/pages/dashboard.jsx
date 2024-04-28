import React, { useEffect, useState } from "react";
import { MdAdminPanelSettings, MdKeyboardArrowDown, MdKeyboardArrowUp, MdKeyboardDoubleArrowUp } from "react-icons/md";
import { LuClipboardEdit } from "react-icons/lu";
import { FaNewspaper } from "react-icons/fa";
import { FaArrowsToDot } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { BsDash } from "react-icons/bs";
import moment from "moment";
import clsx from "clsx";
import { Chart } from "../components/Chart";
import { BGS, PRIOTITYSTYELS, TASK_TYPE, getInitials } from "../utils";
import axios from "axios";

const TaskTable = ({ tasks }) => {
  const ICONS = {
    high: <MdKeyboardDoubleArrowUp />,
    medium: <MdKeyboardArrowUp />,
    normal: <BsDash />,
    low: <MdKeyboardArrowDown />,
  };

  const TableHeader = () => (
    <thead className="border-b border-gray-300 ">
      <tr className="text-black text-left">
        <th className="py-2">Task Title</th>
        <th className="py-2">Priority</th>
        <th className="py-2">Created At</th>
        <th className="py-2 ">Deadline</th>
      </tr>
    </thead>
  );

  const TableRow = ({ task }) => (
    <tr className="border-b border-gray-300 text-gray-600 hover:bg-gray-300/10">
      <td className="py-2">
        <div className="flex items-center gap-2">
          <div className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])} />

          <p className="text-base text-black">{task.title}</p>
        </div>
      </td>

      <td className="py-2">
        <div className="flex gap-1 items-center">
          <span className={clsx("text-lg", PRIOTITYSTYELS[task.priority])}>{ICONS[task.priority]}</span>
          <span className="capitalize">{task.priority}</span>
        </div>
      </td>

      <td className="py-2">
        <span className="text-base text-gray-600">{moment(task?.createdAt).fromNow()}</span>
      </td>

      <td className="py-2">
        <span className="text-base text-gray-600">{moment(task?.date).fromNow()}</span>
      </td>
    </tr>
  );
  return (
    <>
      <div className="w-full bg-white md:px-4 pt-4 pb-4 shadow-md rounded">
        <div className="overflow-x-auto p-2">
          <table className="w-full ">
            <TableHeader />
            <tbody>
              {tasks?.map((task, id) => (
                <TableRow key={id} task={task} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

const Dashboard = () => {
  const [data, setData] = useState({
    status: true,
    message: "Successfully",
    totalTasks: 0,
    last10Task: [],
    tasks: {},
    graphData: [],
  });

  const { user } = useSelector((state) => state.auth);
  const token = user.token;

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/task/dashboard", config);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const totals = data.tasks;
  const stats = [
    {
      _id: "1",
      label: "TOTAL TASK",
      total: data?.totalTasks || 0,
      icon: <FaNewspaper />,
      bg: "bg-[#1d4ed8]",
    },
    {
      _id: "2",
      label: "COMPLTED TASK",
      total: totals["completed"] || 0,
      icon: <MdAdminPanelSettings />,
      bg: "bg-[#0f766e]",
    },
    {
      _id: "3",
      label: "TASK IN PROGRESS ",
      total: totals["in progress"] || 0,
      icon: <LuClipboardEdit />,
      bg: "bg-[#f59e0b]",
    },
    {
      _id: "4",
      label: "TODOS",
      total: totals["todo"] || 0,
      icon: <FaArrowsToDot />,
      bg: "bg-[#be185d]",
    },
  ];

  const Card = ({ label, count, bg, icon }) => {
    return (
      <div className="w-full h-32 bg-white p-5 pr-8 shadow-md rounded-md flex items-center justify-between">
        <div className="h-full flex flex-1 flex-col justify-between p-2">
          <p className="text-base text-gray-600 ">{label}</p>
          <span className="text-2xl font-semibold mb-2 ">{count}</span>
        </div>

        <div className={clsx("w-10 h-10 rounded-full flex items-center justify-center text-white", bg)}>{icon}</div>
      </div>
    );
  };

  return (
    <div classNamee="h-full py-4">
      <h1 className="text-3xl text-gray-600 font-bold">Welcome {user.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-5">
        {stats.map(({ icon, bg, label, total }, index) => (
          <Card key={index} icon={icon} bg={bg} label={label} count={total} />
        ))}
      </div>

      <div className="w-full bg-white my-16 p-5 rounded shadow-sm">
        <h4 className="text-xl text-gray-600 font-semibold mb-5">Chart by Priority</h4>
        <div className="pt-5 pr-12">
          <Chart chartData={data.graphData} />
        </div>
      </div>

      <div className="w-full py-8">
        <TaskTable tasks={data.last10Task} />
      </div>
    </div>
  );
};

export default Dashboard;
