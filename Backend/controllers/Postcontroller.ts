import { postModal } from "../models/PostSchema";
import { httpStatus } from "../types/HttpStatusTypes";
import { Next, Req, Res } from "../types/RouteTypes";


export async function CreatePost(req: Req, res: Res, next: Next) {
    try {
        const { title, description } = req.body;

        // Check if file was uploaded
        if (!req.file) {
            return res.status(400).json({ error: "Image upload is required." });
        }

        if (!title || !description) {
            return res.status(400).json({ error: "Title and description are required." });
        }

        const newPost = {
            title,
            description,
            image: `${req.file.filename}`, // Use req.file.filename
            createdAt: new Date(),
        };

        // save the post 
        const post = new postModal(newPost);
        const savedPost = await post.save();

        if (savedPost) {
            return res.status(201).json({
                message: "Blog post created successfully!",
                post: savedPost, // Return the saved post from the database
            });
        } else {
            throw new Error("Failed to save the post");
        }

    } catch (error) {
        next(error);
    }
}






export async function GetallPost(req: Req, res: Res, next: Next) {
    try {
        const allPosts = await postModal.find()
        if (allPosts) {
            res.status(httpStatus.OK).json(allPosts)
        } else {
            res.status(httpStatus.NOT_FOUND).json("No posts found")
        }

    } catch (error) {
        next(error)
    }
}


export async function DeletePost(req: Req, res: Res, next: Next) {
    try {
        const id = req.params.id
        console.log(id);
        const deleted = await postModal.findByIdAndDelete(id)
        if (deleted) {
            res.status(httpStatus.OK).json('deleted')
        } else {
            res.status(httpStatus.NOT_FOUND).json("Failed to Delete")
        }

    } catch (error) {
        next(error)
    }
}

export async function UpdatePost(req: Req, res: Res, next: Next) {
    try {
        const { title, description, _id } = req.body;
        if (!req.file) {
            return res.status(400).json({ error: "Image upload is required." });
        }

        if (!title || !description) {
            return res.status(400).json({ error: "Title and description are required." });
        }
        const EdidedPost = {
            title,
            description,
            image: `${req.file.filename}`, // Use req.file.filename
        };


        const post = await postModal.findByIdAndUpdate(_id, EdidedPost)
        if (post) {
            res.status(httpStatus.OK).json('Updated')
        } else {
            res.status(httpStatus.NOT_FOUND).json("Failed to Update")
        }

    } catch (error) {
        next(error)
    }
}