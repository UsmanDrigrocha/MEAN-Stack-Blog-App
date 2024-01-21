const BlogPost = require('../models/Blog');

// -------------------------------------------- Create Comment --------------------------------------------
const createComment = async (req, res) => {
    try {
        const blogPost = await BlogPost.findById(req.params.id);

        if (!blogPost) {
            return res.status(404).json({ Message: 'Blog post not found' });
        }

        const { content } = req.body;
        if (!content) {
            return res.status(400).json({ Message: "Enter Content !" });
        }
        const newComment = ({
            content,
            author: req.user._id,
        });

        blogPost.comments.push(newComment);
        await blogPost.save();

        res.status(201).json({ Message: 'Comment added successfully', Comment: newComment });
    } catch (error) {
        res.status(500).json({ Message: 'Internal Server Error', Error: error.message });
    }
};

// -------------------------------------------- Get All Comment --------------------------------------------
const getAllComments = async (req, res) => {
    try {
        const blogPost = await BlogPost.findById(req.params.id);

        if (!blogPost) {
            return res.status(404).json({ Message: 'Blog post not found' });
        }

        res.status(200).json({ Comments: blogPost.comments })

    } catch (error) {
        res.status(500).json({ Message: "Internal Server Error !", Error: error.message });
    }
}

// -------------------------------------------- Update Comment --------------------------------------------
const updateComment = async (req, res) => {
    try {
        const { id, commentId } = req.params;
        const { content } = req.body;

        if(!content){
            return res.status(400).json({Message:"Enter Content !"});
        }

        const blogPost = await BlogPost.findById(id);

        if (!blogPost) {
            return res.status(404).json({ Message: 'Blog post not found' });
        }

        const comment = blogPost.comments.id(commentId);

        if (!comment) {
            return res.status(404).json({ Message: 'Comment not found' });
        }

        comment.content = content;
        await blogPost.save();

        res.status(200).json({ Message: 'Comment updated successfully', Comment: comment });
    } catch (error) {
        res.status(500).json({ Message: 'Internal Server Error', Error: error.message });
    }
};


// -------------------------------------------- Delete Comment --------------------------------------------
const deleteComment = async (req, res) => {
    try {
        const blogPost = await BlogPost.findById(req.params.id);
        if (!blogPost) {
            return res.status(404).json({ Message: 'Blog post not found' });
        }

        const comment = blogPost.comments.id(req.params.commentId);
        if (!comment) {
            return res.status(404).json({ Message: 'Comment not found' });
        }

        blogPost.comments.pull({ _id: comment._id });
        await blogPost.save();

        res.status(200).json({ Message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ Message: 'Internal Server Error', Error: error.message });
    }
};

// -------------------------------------------- Exports --------------------------------------------
module.exports = {
    createComment,
    getAllComments,
    updateComment,
    deleteComment
}