const errorHandler = (err, msg, data) => {
    if (err) {
        return { is_error: err, message: msg }
    } else {
        return { is_error: err, message: msg, data }
    }
}
module.exports = errorHandler