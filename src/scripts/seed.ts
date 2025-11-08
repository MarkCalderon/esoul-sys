import mongoose from "mongoose";
require("dotenv").config();
const MONGO_URI = process.env.DATABASE_URL;
const User = require('../entities/user/user.model');

const userData = [
  {
    username: "user1",
    email: "user1@mail.com",
    password: "$2b$10$YLdlkI909fcO8ws8hmH0Je0oqEgJAdgeqH7bJcFixwqFD9syxijBS",
    role: "user",
  },
   {
    username: "admin1",
    email: "admin1@mail.com",
    password: "$2b$10$YLdlkI909fcO8ws8hmH0Je0oqEgJAdgeqH7bJcFixwqFD9syxijBS",
    role: "admin",
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI ?? '');

    await User.deleteMany({});
    await User.insertMany(userData);
    console.log("User seeding inserted!");
    process.exit(0);
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
}

seed();