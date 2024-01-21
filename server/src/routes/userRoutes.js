const express = require('express');

const { register, login } = require('../controllers/userAuthController');

const authenticateUser = require('../middlewares/authMiddleware');

const validateRole = require('../middlewares/validateRole');

const { createBlog, getAllBlogs, getBlog, updateBlog, deleteBlog } = require('../controllers/blogController');

const { createComment, getAllComments, updateComment, deleteComment } = require('../controllers/commentsController');

const route = express.Router();

// -------------------------------------------- User Auth Routes --------------------------------------------
route.post('/register', register);

route.post('/login', login);

// -------------------------------------------- Blog Routes --------------------------------------------
route.post('/createBlog', authenticateUser, validateRole, createBlog);

route.get('/getAllBlogs', authenticateUser, getAllBlogs);

route.get('/getBlog/:id', getBlog);

route.patch('/updateBlog/:id', authenticateUser, validateRole, updateBlog);

route.delete('/deleteBlog/:id', authenticateUser, validateRole, deleteBlog);

// -------------------------------------------- Comments Routes --------------------------------------------
route.post('/createComment/:id',authenticateUser,createComment);

route.get('/getAllComments/:id',authenticateUser,getAllComments);

route.patch('/blog/:id/comment/:commentId', authenticateUser, updateComment);

route.delete('/blog/:id/comment/:commentId', authenticateUser, deleteComment);

module.exports = route;