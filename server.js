import mongoose from "mongoose";
import express from "express";
import { config } from "./src/config/config.js";
import app from "./src/app.js";

const server = express();

server.use(app);

// Connect to MongoDB and start the server
mongoose
  .connect(config.mongoose.url)
  .then(() => {
    console.log("Connected to MongoDB");

    server.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });
