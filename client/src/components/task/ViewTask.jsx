// import React from "react";
// import ModalWrapper from "../ModalWrapper";
// import { Dialog } from "@headlessui/react"; // Import Dialog from headlessui
// import Button from "../Button";
// import Title from "../Title"; // Import Title component if not already imported

// const ViewTask = ({ open, setOpen, task }) => {
//   // Add setOpen prop
//   return (
//     <ModalWrapper open={open} setOpen={setOpen}>
//       {" "}
//       {/* Pass setOpen prop */}
//       <Dialog.Title as="h2" className="text-base font-bold leading-6 text-gray-900 mb-4">
//         {/* {" "} */}
//         Task Details
//       </Dialog.Title>
//       <div className="mt-2">
//         {/* Display task details here */}
//         <Title title={task.title} /> {/* Render task title */}
//         {/* Render other task details as needed */}
//       </div>
//       <div className="py-3 mt-4 flex sm:flex-row-reverse gap-4">
//         <Button
//           type="button"
//           className="bg-gray-200 border text-sm font-semibold rounded-xl text-gray-900 sm:w-auto"
//           onClick={() => setOpen(false)} // Close the modal
//           label="Close" // Set appropriate label
//         />
//       </div>
//     </ModalWrapper>
//   );
// };

// export default ViewTask;

import React from "react";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdKeyboardDoubleArrowUp, MdClose } from "react-icons/md";
import { GrInProgress } from "react-icons/gr";
import { MdOutlineDoneAll } from "react-icons/md";
import { MdTaskAlt } from "react-icons/md";
import clsx from "clsx";
import moment from "moment";
import Title from "../Title";
import { BsDash } from "react-icons/bs";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  normal: <BsDash />,
  low: <MdKeyboardArrowDown />,
};

const bgColor = {
  high: "bg-red-200",
  medium: "bg-yellow-200",
  normal: "bg-gray-200",
  low: "bg-blue-200",
};

const TASKTYPEICON = {
  completed: "bg-green-600",
  "in progress": "bg-violet-600",
  todo: "bg-blue-600",
};

const ViewTask = ({ open, setOpen, task }) => {
  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <div className="relative">
        {" "}
        <button onClick={() => setOpen(false)} className="absolute top-2 right-2 focus:outline-none">
          <MdClose size={24} />
        </button>
      </div>
      <Dialog.Title as="h2" className="text-base font-bold leading-6 text-gray-900 mb-4">
        Task Details
      </Dialog.Title>
      <div className="w-full flex flex-col gap-5 bg-white shadow-md p-8 overflow-y-auto">
        <Title title={task.title} />
        <div className="flex items-center justify-between gap-5">
          <div
            className={clsx(
              "flex gap-1 items-center text-base font-semibold px-3 py-1 rounded-full",
              bgColor[task?.priority]
            )}
          >
            <span className="text-lg">{ICONS[task?.priority]}</span>
            <span className="uppercase">{task?.priority} Priority</span>
          </div>
          <div className={clsx("flex items-center gap-2")}>
            <div className={clsx("w-4 h-4 rounded-full", TASKTYPEICON[task.stage])} />
            <span className="text-black uppercase">{task?.stage}</span>
          </div>
        </div>
        <div>
          <p className="text-gray-500 mb-0">Created At:</p>
          <p className="text-gray-500">{moment(task?.createdAt).format("MMMM Do YYYY, h:mm:ss a")}</p>
        </div>
        <div className="flex items-center gap-10 py-4 justify-between border-y border-gray-200">
          <div className="space-x-2">
            <span className="font-semibold">Sub-Task :</span>
            <span>{task?.subTasks?.length}</span>
          </div>
          <div>
            <span className="font-semibold">Deadline : {moment(task?.date).format("MMMM Do YYYY")}</span>
          </div>
        </div>
        <div className="space-y-4 py-6">
          <p className="text-gray-500 font-semibold text-sm">SUB-TASKS</p>
          <div className="space-y-8">
            {task?.subTasks?.map((el, index) => (
              <div key={index} className="flex gap-3">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-violet-50-200">
                  <MdTaskAlt className="text-violet-600" size={26} />
                </div>
                <div className="space-y-1">
                  <div className="flex gap-2 items-center">
                    <span className="text-sm text-gray-500">{moment(el?.date).format("MMMM Do YYYY")}</span>
                    <span className="px-2 py-0.5 text-center text-sm rounded-full bg-violet-100 text-violet-700 font-semibold">
                      {el?.tag}
                    </span>
                  </div>
                  <p className="text-gray-700">{el?.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ViewTask;
