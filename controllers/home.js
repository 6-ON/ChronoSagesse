/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 */


const Blog = require('../models/blog')
/**
 * @param {Request} req
 * @param {Response} res
 */
exports.index = async function (req, res) {
    res.render('index', {
        title: 'Home',
        blogs : await Blog.getAll({size:4})
    })
}