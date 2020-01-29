const mongoose = require('mongoose')

const taxiSchema = new mongoose.Schema({
    booked_by_user_id: {
        type: String,
        required: true
    },
    booked_by_user_email: {
        type: String,
        required: true
    },
    booked_for: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    cab_date: {
        type: String,
        required: true
    },
    cab_message: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
})
const Taxi_Module = mongoose.model('Taxi', taxiSchema)
module.exports = Taxi_Module