import { User } from "../model/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, ConflictError } from "../errors/index.js";

export const register = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  // Check if user exist
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new ConflictError("Invalid Credentials!");
  // Confirm password
  if (password !== confirmPassword)
    throw new BadRequestError("Password does not match!");
  // Create new user
  const user = await User.create({ firstName, lastName, email, password });
  // Create user token
  const token = await user.generateToken();
  res.status(StatusCodes.CREATED).json({
    status: "success",
    message: "User created successfully!",
    user,
    token,
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  // Check if user exist
  const user = await User.findOne({ email });
  if (!user) throw new BadRequestError("Incorrect email or password!");
  // check if password match
  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch)
    throw new BadRequestError("Incorrect email or password!");
  // Create user token
  const token = await user.generateToken();
  res.status(StatusCodes.OK).json({
    status: "success",
    message: "Login successful!",
    user,
    token,
  });
};
