import "express-async-error";

import fs from "fs";
import express from "express";
import {
  NotFound,
  rateLimiter,
  ErrorHandler,
  AuthenticatedUser,
  securityMiddleware,
} from "./middlewares/index.js";
import { configDotenv } from "dotenv";
import connectDb from "./db/connect.js";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import SwaggerUI from "swagger-ui-express";
import ticketRouter from "./routes/ticket.js";

configDotenv();

const app = express();
const swaggerDocument = JSON.parse(fs.readFileSync("./swagger.json", "utf-8"));

// security middleware
securityMiddleware(app);
// swagger docs
app.use("/api-docs", SwaggerUI.serve, SwaggerUI.setup(swaggerDocument));
// api rate limit
app.use("/api/v1", rateLimiter);
// routes
app.get("/", (_, res) =>
  /* #swagger.tags = ['Home'] */
  res.send(
    '<h1>Ticket Management API</h1><a href="/api-docs">Swagger Documentation</a>'
  )
);
app.use("/api/v1/auth", /* #swagger.tags = ['Auth'] */ authRouter);
app.use(
  "/api/v1/users",
  /* #swagger.tags = ['Users'] */
  /* #swagger.security = [{"bearerAuth": []}] */
  userRouter
);
app.use(
  "/api/v1/tickets",
  AuthenticatedUser,
  /* #swagger.tags = ['Tickets'] */
  /* #swagger.security = [{"bearerAuth": []}] */
  ticketRouter
);

// error handler
app.use(NotFound);
app.use(ErrorHandler);

// self-invoked function
(async () => {
  const port = process.env.PORT || 3000;
  try {
    await connectDb();
    app.listen(port, () => {
      console.log("Server running at port:", port);
    });
  } catch (error) {
    console.log("Error while running app:", error.message);
  }
})();
