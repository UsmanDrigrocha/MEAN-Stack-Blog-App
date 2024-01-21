const BlogPost = require('../models/Blog');

// -------------------------------------------- Create Blog --------------------------------------------
const createBlog = async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).json({ Message: "Enter All Fields !" });
        }

        const newBlogPost = new BlogPost({
            title,
            content,
            author: req.user._id,
        });

        await newBlogPost.save();
        res.status(201).json({ Message: 'Blog post created successfully', BlogPost: newBlogPost });
    } catch (error) {
        res.status(500).json({ Message: 'Internal Server Error', Error: error.message });
    }
};

// -------------------------------------------- Create All Blogs --------------------------------------------
const getAllBlogs = async (req, res) => {
    try {
        const getAllBlogs = await BlogPost.find({}).populate('author');

        return res.status(200).json({ Message: "Blogs Fetched !", Blogs: getAllBlogs });
    } catch (error) {
        res.status(500).json({ Message: 'Internal Server Error', Error: error.message });
    }
}

// -------------------------------------------- Create Single Blog --------------------------------------------
const getBlog = async (req, res) => {
    try {
        const blogPost = await BlogPost.findById(req.params.id).populate('author', 'name')
            .populate({
                path: 'comments',
                populate: {
                    path: 'author',
                    select: 'name',
                }
            });

        if (!blogPost) {
            return res.status(404).json({ Message: 'Blog post not found' });
        }

        res.status(200).json(blogPost);
    } catch (error) {
        res.status(500).json({ Message: 'Internal Server Error', Error: error.message });
    }
}

// -------------------------------------------- Update Blog --------------------------------------------
const updateBlog = async (req, res) => {
    try {
        const { title, content } = req.body;

        const postId = req.params.id;
        const authorId = req.user._id;

        const updatedBlogPost = await BlogPost.findOneAndUpdate(
            { _id: postId, author: authorId },
            { $set: { title, content } },
            { new: true }
        ).populate('author', 'name');


        if (!updatedBlogPost) {
            return res.status(404).json({ Message: 'Blog post not found' });
        }

        res.status(200).json({ Message: 'Blog post updated successfully', BlogPost: updatedBlogPost });
    } catch (error) {
        res.status(500).json({ Message: 'Internal Server Error', Error: error.message });
    }
}

// -------------------------------------------- Delete Blog --------------------------------------------
const deleteBlog = async (req, res) => {
    try {
        const postId = req.params.id;
        const authorId = req.user._id;

        const deletedBlogPost = await BlogPost.findOneAndDelete({
            _id: postId,
            author: authorId
        });

        if (!deletedBlogPost) {
            return res.status(404).json({ Message: 'Blog post not found' });
        }

        res.status(200).json({ Message: 'Blog post deleted successfully', BlogPost: deletedBlogPost });
    } catch (error) {
        res.status(500).json({ Message: 'Internal Server Error', Error: error.message });
    }
}
// -------------------------------------------- Export --------------------------------------------
module.exports = {
    createBlog,
    getAllBlogs,
    getBlog,
    updateBlog,
    deleteBlog
}
