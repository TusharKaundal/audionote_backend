import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

export const config = {
  port: process.env.PORT || 8081,
  mongoose: {
    url: process.env.MONGODB_URL,
  },
};
