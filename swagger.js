import { configDotenv } from "dotenv";
import swaggerAutogen from "swagger-autogen";

configDotenv();

const docs = {
  info: {
    version: "1.0.0",
    title: "Ticket Management API",
    description:
      "A RESTful API service that allow user to create and manage their tickets",
  },
  basePath: "/",
  schemes: ["http", "https"],
  host: process.env.HOST,
  tags: [
    { name: "Home" },
    { name: "Auth", description: "Authentication Endpoints" },
    { name: "Users", description: "User Management Endpoints" },
    { name: "Tickets", description: "Ticket Management Endpoints" },
  ],
};

const generateDocs = swaggerAutogen();
generateDocs("./swagger.json", ["./app.js"], docs);
