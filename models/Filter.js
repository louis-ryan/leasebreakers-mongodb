const mongoose = require('mongoose');

const FilterSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    addresses: [
        {
            type: String
        }
    ]
})

module.exports = mongoose.models.Filter || mongoose.model('Filter', FilterSchema);