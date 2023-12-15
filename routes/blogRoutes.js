import express from "express";

import {
  getAllBlogsController,
  getBlogByIdController,
  createBlogController,
  updateBlogController,
  deleteBlogController,
  userBlogController,
} from "../controller/blogController.js";

const router = express.Router();

//routes
router.get("/all-blog", getAllBlogsController);

router.get("/get-blog/:id", getBlogByIdController);

router.post("/create-blog", createBlogController);

router.put("/update-blog/:id", updateBlogController);

router.delete("/delete-blog/:id", deleteBlogController);

router.get("/user-blog/:id", userBlogController);

export default router;
