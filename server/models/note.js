import mongoose, { Schema } from "mongoose";

const noteSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      default: "Personal",
      enum: ["Personal", "Work", "Study", "Other"],
    },
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);

export default Note;
