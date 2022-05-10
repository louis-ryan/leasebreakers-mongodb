const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
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
            }
        }
    ],
    address: {
        type: String,
        required: true,
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
    },
    parkingSpace: {
        type: Boolean,
        required: false
    },
    breakerId: {
        type: String,
        required: false
    },
    breakerName: {
        type: String,
        required: false
    },
    breakerEmail: {
        type: String,
        required: false,
    },
    breakerPicture: {
        type: String,
        required: false
    },
    walkToStation: {
        type: Boolean,
        required: false
    },
    walkToSupermarket: {
        type: Boolean,
        required: false
    },
})

module.exports = mongoose.models.Note || mongoose.model('Note', NoteSchema);