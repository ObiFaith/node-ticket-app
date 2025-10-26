import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();

const TicketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required!"],
      minlength: [3, "Title must be at least 3 characters"],
    },
    description: {
      type: String,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
      required: [true, "Priority is required!"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

TicketSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    ret.userId = ret.user;

    delete ret._id;
    delete ret.__v;
    delete ret.user;
    delete ret.updatedAt;
    delete ret.createdAt;

    return ret;
  },
});

export const Ticket = mongoose.model("Ticket", TicketSchema);
