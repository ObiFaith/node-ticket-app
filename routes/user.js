import express from "express";
import { getUserById, getCurrentUser } from "../controllers/user.js";
import { AuthenticatedUser } from "../middlewares/index.js";

export const router = express.Router();

router.route("/me").get(AuthenticatedUser, getCurrentUser);
router.route("/:id").get(getUserById);

export default router;
