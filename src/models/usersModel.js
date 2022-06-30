const mongoose = require('mongoose')
const bcypt = require('bcryptjs')
const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        require: true,
        min: 6,
        trim: true,
    },
}, {
    timestamps: true,
})

userSchema.methods.matchPassword = async function(inputPassword) {
    return bcypt.compare(inputPassword, this.password)
}
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next()
    }
    const salt = await bcypt.genSalt(10)
    this.password = await bcypt.hash(this.password, salt)
})

module.exports = mongoose.model('User', userSchema)