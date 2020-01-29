const mongoose = require('mongoose')

const bureauhead_TicketRequest = new mongoose.Schema({
    airTicketId: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    tour_type: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})
const BureauheadTicketRequest_Module = mongoose.model('bureauhead_TicketRequest', bureauhead_TicketRequest)
module.exports = BureauheadTicketRequest_Module