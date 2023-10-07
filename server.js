const express = require('express'),
    app = express()
const expressLayouts = require('express-ejs-layouts')
const flash = require('connect-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')
app.use(express.static('public'))
app.use(cookieParser('keyboard cat'))
app.use(session({ cookie: { maxAge: 60000 } }))
app.use(flash())

app.use(expressLayouts)
app.set('layout', './layouts/default')
app.set('view engine', 'ejs')
app.use('/', require('./routes'))
app.listen(8080, function () {
    console.log('Server is running on port 8080 ')
})
