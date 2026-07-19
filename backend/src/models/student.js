import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      unique: true,
      sparse: true
    },

    className: {
      type: String,
      default: "10"
    },

    age: {
      type: Number
    }
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);