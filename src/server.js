const app = require('./app')
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('App is connected to port 5000')
})