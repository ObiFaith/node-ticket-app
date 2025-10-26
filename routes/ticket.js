import express from "express";
import {
  getTicket,
  getTickets,
  createTicket,
  deleteTicket,
} from "../controllers/ticket.js";

export const router = express.Router();

router.route("/").get(getTickets).post(createTicket);
router.route("/:id").get(getTicket).delete(deleteTicket);

export default router;
