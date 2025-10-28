import { Ticket } from "../model/Ticket.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/index.js";
import mongoose from "mongoose";

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
  try {
    const userId = req.user.userId;
    const tickets = await Ticket.find({ user: userId });
    const aggrCounts = await Ticket.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } }, // cast to ObjectId
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const counts = {
      totalTickets: tickets.length,
      openTickets: 0,
      inProgressTickets: 0,
      resolvedTickets: 0,
    };

    aggrCounts.forEach(c => {
      if (c._id === "open") counts.openTickets = c.count;
      if (c._id === "in_progress") counts.inProgressTickets = c.count;
      if (c._id === "closed") counts.resolvedTickets = c.count;
    });

    res.status(StatusCodes.OK).json({
      status: "success",
      message: "Tickets retrieved successfully!",
      tickets,
      counts,
    });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Failed to retrieve tickets.",
    });
  }
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
