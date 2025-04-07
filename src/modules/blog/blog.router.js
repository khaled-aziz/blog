import { Router } from "express";
import { addBlog, deleteBlog, getBlog, updateBlog, voteBlog } from "./blog.controller.js";
import { verifyToken } from "../../middleware/verify.js";
export const blogRouter=Router();

blogRouter
.route('/')
.get(verifyToken, getBlog)
.post(verifyToken, addBlog);

blogRouter
.route('/:id')
.put(verifyToken, updateBlog)
.delete(verifyToken, deleteBlog);
blogRouter.put('/:id/vote', verifyToken, voteBlog);
blogRouter.get('/all', verifyToken, getAllBlogsWithVotes);

