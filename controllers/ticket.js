import { Ticket } from "../model/Ticket.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/index.js";

export const getTicket = async (req, res) => {
  const { id: _id } = req.params;
  const { userId: user } = req.user;

  const ticket = await Ticket.findOne({
    _id,
    user,
  });

  if (!ticket)
    throw new NotFoundError(
      "Ticket not found or you are not authorized to delete it."
    );

  res.status(StatusCodes.OK).json({
    status: "success",
    message: "Ticket retrieved successfully!",
    ticket,
  });
};

export const getTickets = async (req, res) => {
  const { userId: user } = req.user;
  const tickets = await Ticket.find({ user });

  res.status(StatusCodes.OK).json({
    status: "success",
    message: "Tickets retrieved successfully!",
    tickets,
  });
};

export const createTicket = async (req, res) => {
  const { userId: user } = req.user;
  const { title, description, priority } = req.body;

  const ticket = await Ticket.create({
    title,
    description,
    priority,
    user,
  });

  res.status(StatusCodes.CREATED).json({
    status: "success",
    message: "Ticket created successfully!",
    ticket,
  });
};

export const deleteTicket = async (req, res) => {
  const { id: _id } = req.params;
  const { userId: user } = req.user;

  const ticket = await Ticket.findOneAndDelete({
    _id,
    user,
  });

  if (!ticket)
    throw new NotFoundError(
      "Ticket not found or you are not authorized to delete it."
    );

  res.status(StatusCodes.NO_CONTENT).send();
};
