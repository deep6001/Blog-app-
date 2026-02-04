import Post from "../models/post.model.js";
import User from "../models/auth.model.js";

export const getAllPosts = async (req, res) => {
  try {
    // Query params
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";

    const skip = (page - 1) * limit;

    let query = {};

    /* ===========================
       Search by Author Username
    =========================== */
    if (search) {
      // Find users with matching username
      const users = await User.find({
        username: { $regex: search, $options: "i" }, // case-insensitive
      }).select("_id");

      const userIds = users.map((u) => u._id);

      // If no users found → no posts
      if (userIds.length === 0) {
        return res.json({
          posts: [],
          pagination: {
            totalPosts: 0,
            totalPages: 0,
            currentPage: page,
            limit,
            hasNext: false,
            hasPrev: false,
          },
        });
      }

      query.authorId = { $in: userIds };
    }

    /* ===========================
       Count Posts
    =========================== */
    const totalPosts = await Post.countDocuments(query);

    /* ===========================
       Fetch Posts
    =========================== */
    const posts = await Post.find(query)
      .populate("authorId", "username email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    /* ===========================
       Pagination Info
    =========================== */
    const totalPages = Math.ceil(totalPosts / limit);

    res.status(200).json({
      posts,
      pagination: {
        totalPosts,
        totalPages,
        currentPage: page,
        limit,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error:" + error.message,
    });
  }
};

// Create a new post
export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    let thumbnail = null;

    if (req.file) {
      thumbnail = `/uploads/thumbnails/${req.file.filename}`;
    }

    const post = await Post.create({
      title,
      content,
      thumbnail,
      authorId: req.user.id,
    });

    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Get a post by ID
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "authorId",
      "username",
    );
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Server error:-" + error.message });
  }
};

// Update a post
export const updatePost = async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      content: req.body.content,
    };

    if (req.file) {
      updateData.thumbnail = `/uploads/thumbnails/${req.file.filename}`;
    }

    const post = await Post.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Server error" + error.message });
  }
};
// Delete a post
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error:" + error.message });
  }
};

export const getAllPostsbyuser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const posts = await Post.find({ author: userId });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Server " + error.message });
  }
};

export const getAllPostsbyme = async (req, res) => {
  console.log("Inside getAllPostsbyme controller");
  try {
    const userId = req.user.id;
    console.log("userId:", userId);
    const posts = await Post.find({ authorId: userId });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Server error:-" + error.message });
  }
};
