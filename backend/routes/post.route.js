import express from "express";
import { authenticateToken } from "../middleware/auth.middleware.js";

import {
  createPost,
  deletePost,
  getAllPosts,
  getAllPostsbyme,
  getAllPostsbyuser,
  getPostById,
  updatePost,
} from "../controller/post.controller.js";

import upload from "../middleware/upload.js";

const router = express.Router();

/* ======================
   Public
====================== */

router.get("/", getAllPosts);

/* ======================
   Auth Required
====================== */

router.post(
  "/",
  authenticateToken,
  upload.single("thumbnail"),
  createPost
);

router.get(
  "/myPosts",
  authenticateToken,
  getAllPostsbyme
);

router.get(
  "/getAllPostsbyuser/:userId",
  authenticateToken,
  getAllPostsbyuser
);

/* ======================
   ID Routes (LAST)
====================== */

router.get("/:id", getPostById);

router.put("/:id", authenticateToken,upload.single("thumbnail"), updatePost);

router.delete("/:id", authenticateToken, deletePost);

export default router;
