import mongoose from "mongoose";
import { faker } from "@faker-js/faker";

import User from "../models/auth.model.js";
import Post from "../models/post.model.js";
import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();



const PASSWORD_FILE = path.join(process.cwd(), "seeded_users.txt");

const MONGO_URI = process.env.MONGO_URI;
console.log('Mongo url:-',MONGO_URI);



const TOTAL_USERS = 10;
const POSTS_PER_USER = 5;

/* ===========================
   Connect DB
=========================== */

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

/* ===========================
   Seed Logic
=========================== */

const seedData = async () => {
  try {
    console.log("Cleaning DB...");

    await User.deleteMany();
    await Post.deleteMany();

    console.log("Creating users...");
    fs.writeFileSync(PASSWORD_FILE, "Seeded Users Login Info\n\n");

    const users = [];

    for (let i = 0; i < TOTAL_USERS; i++) {
      const plainPassword = Math.floor(
        100000 + Math.random() * 900000,
      ).toString(); // 6-digit

      // Hash it
      const hashedPassword = await bcrypt.hash(plainPassword, 10);

      const user = await User.create({
        username: faker.internet.username(),
        email: faker.internet.email(),
        password: hashedPassword,
      });

      // Save to text file
      const data = `
        Username: ${user.username}
        Email: ${user.email}
        Password: ${plainPassword}
        ------------------------
        `;

      fs.appendFileSync(PASSWORD_FILE, data);
      users.push(user);
    }

    console.log("Creating posts...");

    const posts = [];

    for (const user of users) {
      for (let i = 0; i < POSTS_PER_USER; i++) {
        posts.push({
          title: faker.lorem.sentence(),
          content: faker.lorem.paragraphs(2),
          thumbnail: faker.image.urlPicsumPhotos(),
          authorId: user._id,
        });
      }
    }

    await Post.insertMany(posts);

    console.log("Seeding Completed");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

/* ===========================
   Run Seeder
=========================== */

(async () => {
  await connectDB();
  await seedData();
})();
