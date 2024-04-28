import React, { useState } from "react";
import ModalWrapper from "../ModalWrapper";
import { useDispatch, useSelector } from "react-redux";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import { useForm } from "react-hook-form";
import SelectList from "../SelectList";
import Button from "../Button";
import toast from "react-hot-toast";
import axios from "axios";
import Textarea from "../Textarea";
import { setReloadNote } from "../../redux/slices/noteSlice";

const TAGS = ["Personal", "Work", "Study", "Other"];

const AddNote = ({ open, setOpen, note }) => {
  const { user } = useSelector((state) => state.auth);
  const { reloadNote } = useSelector((state) => state.note);
  const token = user.token;
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [tag, setTag] = useState(note?.tag || TAGS[0]);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const submitHandler = async (data) => {
    const { title, content } = data;
    try {
      const response = await axios.post(
        "http://localhost:5000/api/note/create",
        {
          userId: user.id,
          title,
          content,
          tag,
        },
        config
      );
      // Handle success
      toast.success(response.data.message);
      setOpen(false);
      dispatch(setReloadNote(!reloadNote));
      reset();
    } catch (error) {
      // Handle error
      toast.error(error.response.data.message);
      console.error("Error fetching data:", error);
    }
  };

  const updateHandler = async (data) => {
    const { title, content } = data;
    try {
      const response = await axios.put(
        `http://localhost:5000/api/note/update/${note._id}`,
        {
          title,
          content,
          tag,
        },
        config
      );
      // Handle success
      toast.success(response.data.message);
      reset();
      setOpen(false);
    } catch (error) {
      // Handle error
      toast.error(error.response.data.message);
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form className="p-5 pr-9" onSubmit={handleSubmit(note ? updateHandler : submitHandler)}>
          <Dialog.Title as="h2" className="text-base font-bold leading-6 text-gray-900 mb-4">
            {note ? "UPDATE NOTE" : "ADD NOTE"}
          </Dialog.Title>

          <div className="mt-2 flex flex-col gap-6">
            <Textbox
              placeholder="Note Title"
              type="text"
              name="title"
              label="Note Title"
              className="w-full rounded"
              register={register("title", { required: "Title is required" })}
              error={errors.title ? errors.title.message : ""}
            />

            <div className="w-full">
              <Textarea
                placeholder="Note Content"
                name="content"
                label="Note Content"
                className="w-full rounded"
                register={register("content", { required: "Content is required" })}
                error={errors.content ? errors.content.message : ""}
              />
            </div>

            <SelectList label="Tag" lists={TAGS} selected={tag} setSelected={setTag} />

            <div className="py-6 pt-9 sm:flex sm:flex-row-reverse gap-4">
              <Button
                label={note ? "Update" : "Submit"}
                type="submit"
                className="bg-blue-600 px-8 text-sm font-semibold rounded-xl text-white hover:bg-blue-700 sm:w-auto"
              />

              <Button
                type="button"
                className="bg-gray-200 px-5 text-sm font-semibold rounded-xl text-gray-900 sm:w-auto"
                onClick={() => setOpen(false)}
                label="Cancel"
              />
            </div>
          </div>
        </form>
      </ModalWrapper>
    </>
  );
};

export default AddNote;
