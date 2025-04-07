import { Op } from "sequelize";
import { blogSchema } from "../../../database/models/blog.model.js";
import { reactionSchema } from "../../../database/models/reaction.model.js";
import { catchError } from "../../middleware/catchError.js";
import { appError } from "../../utils/appError.js";

export const getAllBlogsWithVotes = catchError(async (req, res, next) => {
    try {
        const blogs = await blogSchema.findAll({
            attributes: {
                include: [
                    [
                        sequelize.literal(`(
                SELECT COUNT(*)
                FROM reactions AS reaction
                WHERE
                reaction.blogId = blog.id
                AND reaction.type = 'up'
            )`),
                        'upvotesCount'
                    ],
                    [
                        sequelize.literal(`(
                SELECT COUNT(*)
                FROM reactions AS reaction
                WHERE
                reaction.blogId = blog.id
                AND reaction.type = 'down'
            )`),
                        'downvotesCount'
                    ]
                ]
            },
            include: [
                {
                    model: userSchema,
                    attributes: ['id', 'username'] 
                }
            ],
            order: [['createdAt', 'DESC']] 
        });

        res.json(blogs);
    } catch (error) {
        next(error);
    }
});
export const getBlog = catchError(async (req, res, next) => {
    const { title, description } = req.body;
    let blog = await blogSchema.findAll({
        attributes: ["blogTitle", "blogDescription"],
        where: { [Op.or]: [{ title }, { description }] }
    })
    if (!blog) return next(new appError('not found blog', 404));
    const upCount = await reactionSchema.count({
        where: {
            blogId: blog.id,
            type: 'up'
        }
    });

    const downCount = await reactionSchema.count({
        where: {
            blogId: blog.id,
            type: 'down'
        }
    });
    blog.upCount = upCount;
    blog.downCount = downCount;

    res.json({ massege: 'success', blog });
})

export const addBlog = catchError(async (req, res, next) => {
    const { title, description } = req.body;
    let blog = await blogSchema.create({ title, description, auth: req.user.userId });
    if (!blog) return next(new appError('not found blog', 404));
    res.json({ massage: 'success', blog })
})

export const updateBlog = catchError(async (req, res, next) => {
    const { title, description } = req.body;
    let blog = await blogSchema.update({ title, description }, { where: { id: req.user.userId } })
    if (!blog[0]) return next(new appError('not found blog', 404));
    res.json({ massage: "success" })
})
export const voteBlog = catchError(async (req, res, next) => {
    const userReaction = await reactionSchema.findOne({
        where: {
            userId: req.user.userId,
            blogId: req.body.blogId
        }
    });
    if (userReaction && (userReaction.type == "up" || userReaction.type == "down")) {
        await userReaction.destroy();
        return res.json({ massage: "vote removed successfully" })
    }
    let vote = await userReaction.update({ type: req.body.vote });
    res.json({ massage: "success", vote })
})


export const deleteBlog = catchError(async (req, res, next) => {
    let blog = await blogSchema.destroy({ where: { id: req.user.userId } });
    if (!blog[0]) return next(new appError('not found blog', 404));
    res.json({ massage: "success" })
})
