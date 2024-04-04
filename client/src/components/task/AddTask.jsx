import React, { useState } from "react";
import ModalWrapper from "../ModalWrapper";
import { useDispatch, useSelector } from "react-redux";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import { useForm } from "react-hook-form";
import UserList from "./UserList";
import SelectList from "../SelectList";
import { BiImages } from "react-icons/bi";
import Button from "../Button";
import toast from "react-hot-toast";
import axios from "axios";
import { setTask } from "../../redux/slices/taskSlice";

const LISTS = ["TODO", "IN PROGRESS", "COMPLETED"];
const PRIORIRY = ["HIGH", "MEDIUM", "NORMAL", "LOW"];

const AddTask = ({ open, setOpen }) => {
  const task = "";
  const { user } = useSelector((state) => state.auth);
  const token = user.token;
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [stage, setStage] = useState(task?.stage?.toUpperCase() || LISTS[0]);
  const [priority, setPriority] = useState(task?.priority?.toUpperCase() || PRIORIRY[2]);

  const submitHandler = async (data) => {
    const { title, date } = data;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Set the Authorization header with the token
        },
      };
      const response = await axios.post(
        "http://localhost:5000/api/task/create",
        {
          userId: user.id,
          title,
          date,
          stage,
          priority,
        },
        config
      );
      dispatch(setTask(response.data.task));
      toast.success(response.data.message);
      reset();
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form className="p-5 pr-9" onSubmit={handleSubmit(submitHandler)}>
          <Dialog.Title as="h2" className="text-base font-bold leading-6 text-gray-900 mb-4">
            {task ? "UPDATE TASK" : "ADD TASK"}
          </Dialog.Title>

          <div className="mt-2 flex flex-col gap-6">
            <Textbox
              placeholder="Task Title"
              type="text"
              name="title"
              label="Task Title"
              className="w-full rounded"
              register={register("title", { required: "Title is required" })}
              error={errors.title ? errors.title.message : ""}
            />

            <div className="flex gap-4">
              <SelectList label="Task Stage" lists={LISTS} selected={stage} setSelected={setStage} />

              <SelectList label="Priority Level" lists={PRIORIRY} selected={priority} setSelected={setPriority} />
            </div>

            <div className="flex gap-4">
              <div className="w-full">
                <Textbox
                  placeholder="Date"
                  type="date"
                  name="date"
                  label="Dead Line"
                  className="w-full rounded"
                  register={register("date", {
                    required: "Date is required!",
                  })}
                  error={errors.date ? errors.date.message : ""}
                />
              </div>

              <div className="py-6 pt-9 sm:flex sm:flex-row-reverse gap-4">
                <Button
                  label="Submit"
                  type="submit"
                  className="bg-blue-600 px-8 text-sm font-semibold rounded-xl text-white hover:bg-blue-700 sm:w-auto"
                  onClick={() => setOpen(false)}
                />

                <Button
                  type="button"
                  className="bg-gray-200 px-5 text-sm font-semibold rounded-xl text-gray-900 sm:w-auto"
                  onClick={() => setOpen(false)}
                  label="Cancel"
                />
              </div>
            </div>
          </div>
        </form>
      </ModalWrapper>
    </>
  );
};

export default AddTask;
