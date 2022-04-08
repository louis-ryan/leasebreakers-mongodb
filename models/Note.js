const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        maxlength: [40, 'Title cannot be more than 40 characters']
    },
    description: {
        type: String,
        required: true,
        maxlength: [200, 'Description cannot be more than 200 characters']
    },
    pics: [
        {
            url: {
                type: String,
                required: false,
                maxlength: [200, 'Url cannot be more than 200 characters']
            }
        }
    ],
    address: {
        type: String,
        required: true,
        maxlength: [40, 'Address cannot be more than 40 characters']
    },
    postCode: {
        type: Number,
        required: true,
    },
    numRoom: {
        type: Number,
        required: false
    },
    numBath: {
        type: Number,
        required: false
    },
    outdoorArea: {
        type: Boolean,
        required: false
    },
    petsAllowed: {
        type: Boolean,
        required: false
    }
})

module.exports = mongoose.models.Note || mongoose.model('Note', NoteSchema);