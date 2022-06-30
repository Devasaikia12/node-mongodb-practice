const mongoose = require('mongoose')

const connectDB = async() => {
    let MONGO_URI = process.env.MONGO_URI
    try {
        const conn = await mongoose.connect(MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
        })
        console.log('MongoDb is connected')
    } catch (error) {
        console.log('Error connecting mongodb :', error)
        process.exit(1)
    }
}

const disconnectDB = async() => {
    await mongoose.connection.close()
}
module.exports = { connectDB, disconnectDB }