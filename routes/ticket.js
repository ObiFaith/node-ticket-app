import express from "express";
import {
  getTicket,
  getTickets,
  createTicket,
  deleteTicket,
  updateTicket,
} from "../controllers/ticket.js";

export const router = express.Router();

router.route("/").get(getTickets).post(createTicket);
router.route("/:id").get(getTicket).patch(updateTicket).delete(deleteTicket);

export default router;
