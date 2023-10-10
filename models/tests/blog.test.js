const blog = require('../blog')

describe('Blog model', () => {
    it('should add a new blog post to the database', async () => {
        const newBlog = {
            title: 'Test Blog Post',
            image: 'test.jpg',
            content: 'This is a test blog post.',
            categories: [1, 2, 3],
        }

        const addedBlog = await blog.add(newBlog)

        expect(addedBlog).toHaveProperty('id')
        // tobe number
        expect(addedBlog.title).toBe(newBlog.title)
        expect(addedBlog.image).toBe(newBlog.image)
        expect(addedBlog.content).toBe(newBlog.content)
        expect(addedBlog.category).toEqual(newBlog.category)
    })

    it('should retrieve a blog post from the database by ID', async () => {
        const newBlog = {
            title: 'Test Blog Post',
            image: 'test.jpg',
            content: 'This is a test blog post.',
            categories: [1, 2, 3],
        }

        const addedBlog = await blog.add(newBlog)
        const retrievedBlog = await blog.get(addedBlog.id)

        expect(retrievedBlog).toHaveProperty('id')
        expect(retrievedBlog.title).toBe(newBlog.title)
        expect(retrievedBlog.image).toBe(newBlog.image)
        expect(retrievedBlog.content).toBe(newBlog.content)
        expect(retrievedBlog.category).toEqual(newBlog.category)
    })
})
