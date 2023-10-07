const db = require('../db')
exports.add = async (category) => {
    const [result] = await db.query('insert into categories set ?', category)
    return result.insertId
}
exports.update = async (category) => {
    const { id, ...insert } = category
    const [result] = await db.query('update categories set ? where id=?', [insert, id])
    return result.affectedRows > 0
} 
exports.get = async (id) => {
    const [rows] = await db.query('select * from categories where id=?', [id])
    return rows[0]
}
exports.getAll = async () => {
    const [rows] = await db.query('select * from categories')
    return rows
}
