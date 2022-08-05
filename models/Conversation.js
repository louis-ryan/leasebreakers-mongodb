const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema({
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
    comments: [
        {
            comment: {
                type: String,
            },
            timeOfComment: {
                type: String,
            },
            posterId: {
                type: String,
            },
            posterName: {
                type: String,
            },
        }
    ]
})

module.exports = mongoose.models.Conversation || mongoose.model('Conversation', ConversationSchema);