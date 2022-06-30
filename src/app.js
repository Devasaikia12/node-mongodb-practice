const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const db = require('./db/db')
const userRoutes = require('./routes/userRoutes')

const app = express()
app.use(express.json())
db.connectDB()

app.use('/users', userRoutes)

module.exports = app