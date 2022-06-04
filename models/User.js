const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
    },
    notes: [
        {
            noteId: {
                type: String,
            },
            noteTitle: {
                type: String,
            }
        }
    ]
})

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);