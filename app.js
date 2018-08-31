const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const bodyParser = require('body-parser')
const Routes = require('./routes')
const session = require('express-session')

app.set('view engine', 'ejs')
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}))
app.use(bodyParser.urlencoded({extends:true}))

app.use('/',Routes)

app.listen(port, () => {
    console.log(`i'm Listening to port ${port}`)
})