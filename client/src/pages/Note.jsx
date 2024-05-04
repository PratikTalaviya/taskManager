import React, { useEffect, useState } from "react";
import { FaList } from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import { useParams } from "react-router-dom";
import Loading from "../components/Loader";
import Title from "../components/Title";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setNotes, setReloadNote } from "../redux/slices/noteSlice";
import axios from "axios";
import AddNote from "../components/note/AddNote";
import NoteCard from "../components/NoteCard";
import ViewNote from "../components/note/ViewNote";
import { toast } from "react-hot-toast";
import ConfirmatioDialog from "../components/Dialogs";

const Notes = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);
  const { reloadNote } = useSelector((state) => state.note);
  const { userNotes } = useSelector((state) => state.note);
  const token = user.token;
  const dispatch = useDispatch();
  const [selectedNote, setSelectedNote] = useState(null); // State to store the selected note
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [noteOpen, setNoteOpen] = useState(false); // State to manage modal visibility
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  // Function to handle when a note card is clicked
  const handleNoteCardClick = (note) => {
    setSelectedNote(note); // Set the selected note
    setNoteOpen(true); // Open the ViewNote modal
  };
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Set the Authorization header with the token
    },
  };

  useEffect(() => {
    const fetchNote = async () => {
      try {
        // const response = await axios.get("http://localhost:5000/api/note", config);
        const response = await axios.get("https://task-manager-steel-delta.vercel.app/api/note", config);
        dispatch(setNotes(response.data.notes));
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNote();
  }, [reloadNote]);

  const deleteHandler = async (noteId) => {
    console.log(noteId);
    try {
      // const response = await axios.delete(`http://localhost:5000/api/note/delete/${noteId}`, config);
      const response = await axios.delete(
        `https://task-manager-steel-delta.vercel.app/api/note/delete/${noteId}`,
        config
      );
      toast.success(response.data.message);
      setConfirmationOpen(false);
      dispatch(setReloadNote(!reloadNote));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const handleDeleteNoteCard = (noteId) => {
    setConfirmationOpen(true);
    setSelectedNoteId(noteId);
  };

  // Function to handle ViewNote delete button click
  const handleDeleteViewNote = (noteId) => {
    deleteHandler(noteId);
    setNoteOpen(false);
  };

  // Function to handle NoteCard edit button click
  const handleEditNoteCard = (note) => {
    setSelectedNote(note);
    setNoteOpen(true);
  };

  // Function to handle ViewNote edit button click
  const handleEditViewNote = (note) => {
    setSelectedNote(note);
    setNoteOpen(true);
  };
  return loading ? (
    <div className="py-10">
      <Loading />
    </div>
  ) : (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <Title title={"Notes"} />

        <Button
          onClick={() => setOpen(true)}
          label="Create Note"
          icon={<IoMdAdd className="text-lg" />}
          className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5"
        />
      </div>

      <div className="w-full py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 2xl:gap-10">
        {userNotes.map((note, index) => (
          <div key={index} onClick={() => handleNoteCardClick(note)}>
            <NoteCard note={note} onDelete={handleDeleteNoteCard} onUpdate={handleEditNoteCard} />
          </div>
        ))}
      </div>
      {noteOpen && (
        <ViewNote
          open={noteOpen}
          setOpen={setNoteOpen}
          note={selectedNote}
          onDelete={handleDeleteViewNote}
          onUpdate={handleEditViewNote}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmatioDialog
        open={confirmationOpen}
        setOpen={setConfirmationOpen}
        msg="Are you sure you want to delete this note?"
        onClick={() => {
          deleteHandler(selectedNoteId);
          setConfirmationOpen(false);
        }}
      />
      <AddNote open={open} setOpen={setOpen} />
    </div>
  );
};

export default Notes;
