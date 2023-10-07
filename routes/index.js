// imports
const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({ dest: 'tmp/'});
const multipart = upload.single('image');
const { blogsControler, homeController,categoriesController } = require('../controllers')
const urlencodedParser = express.urlencoded({ extended: false })
// -------------
router.use(urlencodedParser)


// routes
router.get('/', homeController.index)
router.get('/blogs/add', blogsControler.add)
router.get('/blogs', blogsControler.index)
router.post('/blogs',multipart, blogsControler.save)
router.get('/blogs/:id', blogsControler.show)
router.get('/blogs/:id/edit', blogsControler.edit)
router.post('/blogs/:id',multipart, blogsControler.update)
router.post('/blogs/:id/del', blogsControler.delete)

router.get('/categories/add', categoriesController.add)
router.post('/categories' ,categoriesController.save)
router.get('/categories/:id/edit', categoriesController.edit)
router.post('/categories/:id',multipart, categoriesController.update)

router.get('/', homeController.index)

// -------------


module.exports = router
