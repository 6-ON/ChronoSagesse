const Joi = require('joi');

// Schema for adding a new blog
exports.addBlogSchema = Joi.object({
    title: Joi.string().trim().min(3).max(30).required(),
    image: Joi.string().uri().required(),
    content: Joi.string().trim().required().messages({
        'string.empty': 'Content is required',
    }),
    categories: Joi.array().items(Joi.string()).required(),
});

// Schema for updating an existing blog
exports.updateBlogSchema = Joi.object({
    id: Joi.number().required(),
    title: Joi.string().trim().min(3).max(30),
    image: Joi.string().uri(),
    content: Joi.string().trim().messages({
        'string.empty': 'Content is required',
    }),
    categories: Joi.array().items(Joi.string()),
});

exports.addCategorySchema = Joi.object({
    name: Joi.string().required(),
});
exports.updateCategorySchema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
});