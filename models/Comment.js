const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true,
        maxlength: [200, 'Comment cannot be more than 200 characters']
    },
    noteId: {
        type: String,
    },
    breakerName: {
        type: String,
    },
    breakerId: {
        type: String,
    },
    commenterName: {
        type: String,
    },
    commenterEmail: {
        type: String,
    },
    commenterPicture: {
        type: String,
    }
})

module.exports = mongoose.models.Comment || mongoose.model('Comment', CommentSchema);