const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors());

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [false, 'Please add a title'],
        unique: true,
        maxlength: [40, 'Title cannot be more than 40 characters']
    },
    address: {
        type: String,
        required: [true, 'Please include the address'],
        unique: true,
        maxlength: [40, 'Title cannot be more than 40 characters']
    },
    numRooms: {
        type: Number,
        required: [true, 'Please include the number of livable rooms'],
        unique: false
    },
    numBath: {
        type: Number,
        required: [true, 'Please include the number of bathrooms'],
        unique: false
    },
    outdoorArea: {
        type: Boolean,
        required: [true, 'Please state whether or not there is an outdoor area'],
        unique: false
    },
    petsAllowed: {
        type: Boolean,
        required: [true, 'Please state whether or not the owner tolerates pets'],
        unique: false
    },
    description: {
        type: String,
        required: true,
        maxlength: [200, 'Description cannot be more than 200 characters']
    }
})

module.exports = mongoose.models.Note || mongoose.model('Note', NoteSchema);