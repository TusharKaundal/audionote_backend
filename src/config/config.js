import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || 8081,
  mongoose: {
    url: process.env.MONGODB_URL,
  },
};
