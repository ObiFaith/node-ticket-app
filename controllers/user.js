import { User } from "../model/User.js";
import { StatusCodes } from "http-status-codes";

const getUser = async (res, userId) => {
  const user = await User.findOne({ _id: userId });
  res.status(StatusCodes.OK).json({
    status: "success",
    message: "User data retrieved!",
    user,
  });
};

export const getCurrentUser = async (req, res) => {
  const { userId } = req.user;
  await getUser(res, userId);
};

export const getUserById = async (req, res) => {
  const userId = req.params.id;
  await getUser(res, userId);
};
