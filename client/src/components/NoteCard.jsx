import React from "react";
import clsx from "clsx";
import { formatDate } from "../utils";

const NoteCard = ({ note, onUpdate, onDelete }) => {
  const truncatedContent = note.content.length > 200 ? `${note.content.slice(0, 200)}...` : note.content;

  return (
    <div className="w-full bg-white shadow-md p-4 rounded">
      <div className="flex justify-between gap-3">
        <div>
          <h3 className="line-clamp-1 text-black text-xl">{note.title}</h3>
          <span className="text-sm text-gray-600">{formatDate(new Date(note.createdAt))}</span>
        </div>
        <div className="mt-2">
          <span className="bg-blue-600/10 px-3 py-1 rounded-full text-blue-700 font-medium">{note.tag}</span>
        </div>
      </div>

      <div className="w-full border-t border-gray-200 my-2" />

      <p className="text-gray-600">{truncatedContent}</p>

      <div className="w-full border-t border-gray-200 my-2" />

      <div className="flex justify-end gap-5">
        {/* <button
          onClick={(event) => {
            event.stopPropagation();
            onUpdate(note.id);
          }}
          className="text-blue-600 font-medium"
        >
          Edit
        </button> */}
        <button
          onClick={(event) => {
            event.stopPropagation();
            onDelete(note._id);
          }}
          className="text-red-600 font-medium"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
