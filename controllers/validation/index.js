const Joi = require('joi');

// Schema for adding a new blog
exports.addBlogSchema = Joi.object({
    title: Joi.string().required(),
    image: Joi.string().required(),
    content: Joi.string().required().messages({
        'string.empty': 'Content is required',
    }),
    categories: Joi.array().items(Joi.string()).required(),
});

// Schema for updating an existing blog
exports.updateBlogSchema = Joi.object({
    id: Joi.number().required(),
    title: Joi.string(),
    image: Joi.string(),
    content: Joi.string().messages({
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