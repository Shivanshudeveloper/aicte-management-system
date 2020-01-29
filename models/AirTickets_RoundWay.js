const mongoose = require('mongoose')

const airticketSchemaRoundWay = new mongoose.Schema({
    booked_by_user_id: {
        type: String,
        required: true
    },
    booked_by_user_email: {
        type: String,
        required: true
    },
    purpose_meeting: {
        type: String,
        required: true
    },
    booked_for: {
        type: String,
        required: true
    },
    booked_for_email: {
        type: String,
        required: true
    },
    booked_for_phone: {
        type: String,
        required: true
    },
    from_state_name: {
        type: String,
        required: true
    },
    from_city_name: {
        type: String,
        required: true
    },
    to_state_name: {
        type: String,
        required: true
    },
    to_city_name: {
        type: String,
        required: true
    },
    departure_time: {
        type: String,
        required: true
    },
    departure_date: {
        type: Date,
        required: true
    },
    arrival_date: {
        type: Date,
        required: true
    },
    frequent_flying_number: {
        type: String,
        required: false
    },
    file_upload_url_path: {
        type: String,
        required: true
    },
    prefered_airlines_departure: {
        type: String,
        required: true
    },
    prefered_airlines_arrival: {
        type: String,
        required: true
    },
    flight_message: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
})
const AirticketRoundWay_Module = mongoose.model('AirTicket_RoundWay', airticketSchemaRoundWay)
module.exports = AirticketRoundWay_Module