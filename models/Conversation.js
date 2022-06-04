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
    breakerIsTyping: {
        type: Bool,
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
    commenterIsTyping: {
        type: Bool,
    },
    conversationIsLive: {
        type: Bool,
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
            seenByRecipiant: {
                type: Bool,
            },
        }
    ]
})

module.exports = mongoose.models.Conversation || mongoose.model('Conversation', ConversationSchema);