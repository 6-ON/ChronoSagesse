/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 */
const { Blog, Category } = require('../models')
const { readFile, writeFile } = require('fs/promises')
const { extname } = require('path')

/**
 * @param {Request} req
 * @param {Response} res
 */
exports.index = async function (req, res) {
    res.render('blogs/index', {
        title: 'Blogs',
        blogs: await Blog.getAll(req.query),
        categories: await Category.getAll(),
    })
}
/**
 * @param {Request} req
 * @param {Response} res
 */
exports.show = async function (req, res) {
    const blog = await Blog.get(req.params.id)
    res.render('blogs/single', {
        ...blog,
    })
}
/**
 * @param {Request} req
 * @param {Response} res
 */
exports.add = async function (req, res) {
    res.render('blogs/edit', {
        title: 'Add Blog',
        isAdd: true,
        categories: await Category.getAll(),
        errors: req.flash('error'),
    })
}
/**
 *
 */

exports.save = async function (req, res) {
    try {
        const { addBlogSchema } = require('./validation')
        const { originalname, path: tmp, filename: fn } = req.file ?? {}
        const image = originalname ? `${fn}${extname(originalname)}` : undefined

        const blog = { ...req.body, image }
        const validated = await addBlogSchema.validateAsync(blog)
        if (image) {
            const filedata = await readFile(tmp)
            await writeFile(`./public/uploads/${image}`, filedata)
        }
        if (await Blog.add(validated)) {
            res.redirect('/blogs')
        }
        res.end()
    } catch (err) {
        req.flash('error', err.message)
        res.redirect('/blogs/add')
    }
}

/**
 * @param {Request} req
 * @param {Response} res
 */
exports.edit = async function (req, res) {
    const blog = await Blog.get(req.params.id)
    res.render('blogs/edit', {
        isAdd: false,
        ...blog,
        categories: await Category.getAll(),
        errors: req.flash('error'),
    })
}
/**
 * @param {Request} req
 * @param {Response} res
 */
exports.update = async function (req, res) {
    try {
        const { updateBlogSchema } = require('./validation')
        const { originalname, path: tmp, filename: fn } = req.file ?? {}
        const image = originalname ? `${fn}${extname(originalname ?? '')}` : undefined
        const target = `./public/uploads/${image}`
        let blog = image ? { ...req.body, image } : { ...req.body }
        blog.id = req.params.id
        const validated = await updateBlogSchema.validateAsync(blog)

        if (image) {
            const filedata = await readFile(tmp)
            await writeFile(target, filedata)
        }
        if (await Blog.update(validated)) {
            res.redirect(`/blogs/${req.params.id}`)

        }
        res.end()
    } catch (err) {
        req.flash('error', err.message)
        res.redirect(`/blogs/${req.params.id}/edit`)
    }
}
/**
 * @param {Request} req
 * @param {Response} res
 */
exports.delete = async function (req, res) {
    try {
        await Blog.delete(req.params.id)
    } finally {
        req.flash('info', 'Blog deleted')
        res.redirect('/blogs')
    }
}
