const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true,
    },
    breakerId: {
        type: String,
    },
    breakerName: {
        type: String,
    },
    breakerEmail: {
        type: String,
    },
    breakerPicture: {
        type: String,
    },
    commenterId: {
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
    },
    noteId: {
        type: String,
    },
    conversationId: {
        type: String,
    }
})

module.exports = mongoose.models.Comment || mongoose.model('Comment', CommentSchema);