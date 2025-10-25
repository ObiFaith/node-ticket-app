import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required!"],
      minlength: [3, "First name must be at least 3 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required!"],
      minlength: [3, "Last name must be at least 3 characters"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required!"],
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address!"],
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
      minlength: [8, "Password must be at least 8 characters"],
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d\W]).+$/,
        "Password must have an uppercase, lowercase and number/symbol",
      ],
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUND));
    this.password = await bcrypt.hash(this.password, salt);
  }
});

UserSchema.methods.generateToken = async function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;

    delete ret._id;
    delete ret.__v;
    delete ret.password;
    delete ret.updatedAt;
    delete ret.createdAt;

    return ret;
  },
});

export const User = mongoose.model("User", UserSchema);
