const express = require('express');
const route = express.Router();
const { postBlogData, getAllBlogData,postComment,getCommentById } = require('../controllers/blogController');



route.get('/getAllPosts', getAllBlogData);

route.post('/insertPost', postBlogData);

route.post('/insertComment', postComment);

route.get('/getComments/:blogId', getCommentById);

module.exports = route;