const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        maxlength: [40, 'First Name cannot be more than 40 characters']
    },
    lastName: {
        type: String,
        required: true,
        maxlength: [40, 'Last Name cannot be more than 40 characters']
    },
    email: {
        type: String,
        required: true,
        maxlength: [100, 'Email cannot be more than 100 characters']
    },
})

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);