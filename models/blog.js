const db = require('../db')

exports.add = async (blog) => {
    const { categories,...bloginsert } = blog
    const conn = await db.getConnection()
    try {
        await conn.beginTransaction()
        const [record] = await conn.query('insert into blogs set ?', bloginsert)
        if (categories) {
            await conn.query('insert into blog_category values ?', [categories.map((c) => [record.insertId, c])])
        }
        await conn.commit()
        blog.id = record.insertId
        return blog
    } catch (err) {
        await conn.rollback()
        throw err
    }
}
exports.update = async (blog) => {
    const { categories,id,...blogupdate } = blog
    const conn = await db.getConnection()
    try {
        await conn.beginTransaction()
        await conn.query('update blogs set ? where id = ?', [blogupdate, id])
        if(categories) {
            await conn.query('delete from blog_category where blog_id = ?', [id])
            await conn.query('insert into blog_category values ?', [categories.map((c) => [id, c])])
        }
        await conn.commit()
        return blog
    } catch (err) {
        await conn.rollback()
        throw err
    }
}
exports.delete = async (id) => {
    await db.query('delete from blogs where id = ?', [id])
}

exports.get = async (id) => {
    const [rows] = await db.query('select * from blogs where id = ?', [id])
    const blog = rows[0]
    blog.categories = (
        await db.query(
            'select c.* from blog_category bc join categories c on c.id = bc.category_id where blog_id = ?',
            [id]
        )
    )[0]
    return blog
}

exports.getAll = async ({ title, ct, size } = {}) => {
    let catergoriesSql = 'select c.* ,blog_id from blog_category bc join categories c on c.id = bc.category_id'
    const [categories] = await db.query(catergoriesSql)
    let sql = 'SELECT * from blogs'
    if (ct) {
        sql += ' join blog_category bc on blogs.id = bc.blog_id where bc.category_id =' + ct
    }
    if (title) {
        sql += ct ? ' and ' : ' where '
        sql += "blogs.title like '%" + title + "%'"
    }
    sql += ' order by blogs.created_at desc'
    if (size) {
        sql += ' limit ' + size
    }
    console.log(sql)
    const [rows] = await db.query(sql)

    const blogs = rows.map((blog) => {
        blog.categories = categories.filter((c) => c.blog_id == blog.id)
        return blog
    })
    return blogs
}
// (async ()=> console.log(
//   await this.add({
//         title: 'test',
//         image: 'test',
//         content: 'test',
//         category: [1, 2, 3],
//     })
// ))();
