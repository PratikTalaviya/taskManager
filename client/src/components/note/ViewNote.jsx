// import React from "react";
// import ModalWrapper from "../ModalWrapper";
// import { Dialog } from "@headlessui/react";
// import { MdClose } from "react-icons/md";
// import moment from "moment";
// import Title from "../Title";

// const ViewNote = ({ open, setOpen, note }) => {
//   if (!note) {
//     return null; // Return null if note is null or undefined
//   }

//   return (
//     <ModalWrapper open={open} setOpen={setOpen}>
//       <div className="relative">
//         <button onClick={() => setOpen(false)} className="absolute top-2 right-2 focus:outline-none">
//           <MdClose size={24} />
//         </button>
//       </div>
//       <Dialog.Title as="h2" className="text-base font-bold leading-6 text-gray-900 mb-4">
//         Note Details
//       </Dialog.Title>
//       <div className="w-full flex flex-col gap-5 bg-white shadow-md p-8">
//         <Title title={note.title} />
//         <div>
//           <p className="text-gray-500 mb-0">Created At:</p>
//           <p className="text-gray-500">{moment(note.createdAt).format("MMMM Do YYYY, h:mm:ss a")}</p>
//         </div>
//         <div className="space-y-4 py-6 overflow-y-auto" style={{ maxHeight: "calc(100vh - 250px)" }}>
//           <p className="text-gray-500 font-semibold text-sm">Content:</p>
//           <p className="text-gray-700">{note.content}</p>
//         </div>
//       </div>
//     </ModalWrapper>
//   );
// };

// export default ViewNote;

import React, { useState } from "react";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import { MdClose } from "react-icons/md";
import moment from "moment";
import Title from "../Title";
import Button from "../Button";
import ConfirmDialog from "../Dialogs"; // Import the ConfirmDialog component

const ViewNote = ({ open, setOpen, note, onDelete, onEdit }) => {
  const [confirmationOpen, setConfirmationOpen] = useState(false); // State for delete confirmation

  if (!note) {
    return null; // Return null if note is null or undefined
  }

  // Function to handle delete confirmation
  const handleDeleteConfirmation = () => {
    setConfirmationOpen(true);
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <div className="relative">
        <button onClick={() => setOpen(false)} className="absolute top-2 right-2 focus:outline-none">
          <MdClose size={24} />
        </button>
      </div>
      <Dialog.Title as="h2" className="text-base font-bold leading-6 text-gray-900 mb-4">
        Note Details
      </Dialog.Title>
      <div className="w-full flex flex-col gap-5 bg-white shadow-md p-8">
        <Title title={note.title} />
        <div>
          <p className="text-gray-500 mb-0">Created At:</p>
          <p className="text-gray-500">{moment(note.createdAt).format("MMMM Do YYYY, h:mm:ss a")}</p>
        </div>
        <div className="space-y-4 py-6 overflow-y-auto" style={{ maxHeight: "calc(100vh - 250px)" }}>
          <p className="text-gray-500 font-semibold text-sm">Content:</p>
          <p className="text-gray-700">{note.content}</p>
        </div>
        {/* Edit and Delete buttons */}
        <div className="flex justify-end gap-5">
          {/* <Button label="Edit" onClick={() => onEdit(note)} className="text-blue-600 font-medium" /> */}
          <Button label="Delete" onClick={handleDeleteConfirmation} className="text-red-600 font-medium" />
        </div>
      </div>
      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={confirmationOpen}
        setOpen={setConfirmationOpen}
        msg="Are you sure you want to delete this note?"
        onClick={() => {
          onDelete(note._id);
          setConfirmationOpen(false);
          setOpen(false); // Close the ViewNote modal after deletion
        }}
      />
    </ModalWrapper>
  );
};

export default ViewNote;
