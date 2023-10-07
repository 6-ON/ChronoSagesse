/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 */

const {Category} = require('../models')

/**
 * @param {Request} req
 * @param {Response} res
 */
exports.add = function (req, res) {
    res.render('category/edit', {
        title: 'Add Category',
        isAdd: true,
        errors : req.flash('error')
    })
}

/**
 * @param {Request} req
 * @param {Response} res
 */
exports.save = async function (req, res) {
    const { addCategorySchema } = require('./validation')
    const category = { ...req.body }
    const validated = await addCategorySchema.validateAsync(category)
    const result = await Category.add(validated)
    if (result) {
        req.flash('info', 'Category added successfully')
        res.redirect('/blogs')
    } else {
        req.flash('error', 'Category not added')
        res.redirect('/categories/add')
    }
}

/**
 * @param {Request} req
 * @param {Response} res
 */
exports.edit = async function (req, res) {
    const category = await Category.get(req.params.id)
    res.render('category/edit', {
        title: 'Edit Category',
        isAdd: false,
        ...category,
    })
}
/**
 * @param {Request} req
 * @param {Response} res
 */
exports.update = async function (req, res) {
    const { updateCategorySchema } = require('./validation')
    const category = { ...req.body,...req.params }
    const validated = await updateCategorySchema.validateAsync(category)
    const result = await Category.update(validated)
    if (result) {
        req.flash('info', 'Category updated successfully')
        res.redirect('/blogs')
    } else {
        req.flash('error', 'Category not updated')
        res.redirect(`/categories/${validated.id}/edit`)
    }
}