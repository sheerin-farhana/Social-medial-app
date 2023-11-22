
const { Post, Comment } = require('../models/blog');

const postBlogData = async (req, res, next) => {
    const { link,description } = req.body;

    try {
        const newBlogData = await Post.create({
            link,
            description
        });
        res.status(200).json({data:newBlogData.dataValues});
        console.log("Blog Post Created");
        // console.log("The blog data" , newBlogData.dataValues);
    }
    catch (err) {
        console.error(err);
        next(err);
    }
};

const getAllBlogData = async (req, res, next) => {
    
    try {
        const posts = await Post.findAll();
        res.status(200).json({ response: posts });
        
    }
    catch (err) {
        console.error(err);
        next(err);
    }
};

const postComment = async (req, res, next) => {
    const { text, PostId } = req.body;
    

    try {
        console.log(JSON.stringify(req.body) + " this is request body");
        const newBlogData = await Comment.create({
            text,
            PostId
        });
        res.status(200).json({ comment: newBlogData.dataValues });
        
        console.log("comment added");
        // console.log("The blog data" , newBlogData.dataValues);
    }
    catch (err) {
        console.error(err);
        next(err);
    }
}

const getCommentById = async (req, res, next) => {
    const { blogId } = req.params;
    try {
        const comments = await Comment.findAll({
            where: {
                postId: blogId,
            },
        });

        res.json({ comments });
        console.log("Comments sent from the backend");
    }
    catch (err) {
        console.log(err);
    }
}




module.exports = { postBlogData, getAllBlogData,postComment ,getCommentById};
