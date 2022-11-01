const mongoose = require('mongoose');

const FilterSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    addresses: [
        {
            type: String
        }
    ],
    rent: [
        {
            type: String
        }
    ],
    minRentVal: {
        type: Number
    },
    maxRentVal: {
        type: Number
    },
    selectedRentVal: [
        {
            type: Number
        }
    ]
})

module.exports = mongoose.models.Filter || mongoose.model('Filter', FilterSchema);