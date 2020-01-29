// Bring Exrpess
const express = require('express');
const router = express.Router();
// Ensure Authentication
const { ensureAuthenticated } = require('../config/auth');


/**
 * @ Modules Imported
 */
// 1. Taxi Module
const Taxi_Module = require('../models/Taxi');
// 2. Air Ticket Module
const AirticketOneWay_Module = require('../models/AirTickets');
// 3. Air Tickets Module Round Way
const AirTicketsRoundWay_Module = require('../models/AirTickets_RoundWay');
// 4. Bureau Ticket Request
const BureauTicketRequest_Module = require('../models/BureauHeads_TicketRequest');



// Home Main Page
router.get('/', (req, res) => {
    res.render('main');
});

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => {
    req.session.name = req.user.name;
    req.session.aadharnumber = req.user.aadharnumber;
    req.session.email = req.user.email;
    req.session.userid = req.user.id;
    req.session.userRole = req.user.role;
    req.session.userDepartment = req.user.department;

    // Calling the Render Dashboard Page
    res.render('dashboard', {
        name: req.session.name,
        admissionId: req.session.admission
    });
});

// Taxi Booking System
router.get('/taxibooking', ensureAuthenticated, (req, res) => {
    res.render('taxi-booking');
});

// Air Ticket Booking System
router.get('/airticket-booking', ensureAuthenticated, (req, res) => {
    res.render('airticket-booking');
});

// Taxi Booked POST Request Handler
router.post('/taxibooked', ensureAuthenticated, (req, res) => {
    const { booked_for, cab_from, cab_to, cab_timing, cab_date, cab_message } = req.body;
    var userEmail = req.session.email,
        userId = req.session.userid;

    const taxiBooked = new Taxi_Module({
        booked_by_user_id: userId,
        booked_by_user_email: userEmail,
        booked_for: booked_for,
        from: cab_from,
        to: cab_to,
        time: cab_timing,
        cab_date: cab_date,
        cab_message: cab_message
    });
    taxiBooked.save()
        .then(() => {
            req.flash('success_msg', 'Your Cab Successfully Booked')
            res.redirect('/taxibooking');
        })
        .catch(err => console.log(err));
});

// Air Ticket Booked POST Request Handler
router.post('/airticketbooked', ensureAuthenticated, (req, res) => {
    const { purpose_meeting, booked_for, booked_for_email, booked_for_phone, from_state_name, from_city_name, to_state_name, to_city_name, departure_time, departure_date, arrival_date, frequent_flying_number, prefered_airlines, flight_message, file_upload_url_path } = req.body;
    var userEmail = req.session.email,
        userRole = req.session.userRole,
        userDepartment = req.session.userDepartment,
        userId = req.session.userid;
    if (userRole == "Employee") {
        const airticketBooked = new AirticketOneWay_Module({
            booked_by_user_id: userId,
            booked_by_user_email: userEmail,
            booked_for: booked_for,
            purpose_meeting,
            booked_for,
            booked_for_email,
            booked_for_phone,
            from_state_name,
            from_city_name,
            to_state_name,
            to_city_name,
            departure_time,
            departure_date,
            arrival_date,
            departure_time,
            frequent_flying_number,
            file_upload_url_path,
            prefered_airlines,
            flight_message
        });
        airticketBooked.save()
            .then(() => {
                const bureauHeadTicketRequest = new BureauTicketRequest_Module({
                    airTicketId: airticketBooked.id,
                    department: userDepartment,
                    tour_type: "One Way"
                });
                bureauHeadTicketRequest.save()
                    .then(() => {
                        req.flash('success_msg', 'Your Tickets Successfully Booked')
                        res.redirect('/airticket-booking');
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err));
    }
});

// Air Tickets Round Way Booking
router.post('/airticketbookedroundway', ensureAuthenticated, (req, res) => {
    const { purpose_meeting, booked_for, booked_for_email, booked_for_phone, from_state_name, from_city_name, to_state_name, to_city_name, departure_time, departure_date, arrival_date, frequent_flying_number, prefered_airlines_departure, prefered_airlines_arrival, flight_message, file_upload_url_path } = req.body;
    var userEmail = req.session.email,
        userRole = req.session.userRole,
        userDepartment = req.session.userDepartment,
        userId = req.session.userid;

        if (userRole == "Employee") {
            const airticketBooked = new AirTicketsRoundWay_Module({
                booked_by_user_id: userId,
                booked_by_user_email: userEmail,
                purpose_meeting,
                booked_for,
                booked_for_email,
                booked_for_phone,
                from_state_name,
                from_city_name,
                to_state_name,
                to_city_name,
                departure_time,
                departure_date,
                arrival_date,
                departure_time,
                frequent_flying_number,
                file_upload_url_path,
                prefered_airlines_departure,
                prefered_airlines_arrival,
                flight_message
            });
            airticketBooked.save()
                .then(() => {
                    const bureauHeadTicketRequest = new BureauTicketRequest_Module({
                        airTicketId: airticketBooked.id,
                        department: userDepartment,
                        tour_type: "Round Way"
                    });
                    bureauHeadTicketRequest.save()
                        .then(() => {
                            req.flash('success_msg', 'Your Tickets Successfully Booked')
                            res.redirect('/airticketbookingroundway');
                        })
                        .catch(err => console.log(err))
                })
                .catch(err => console.log(err));
        }
});



// Recents Air Tickets Booked
router.get('/recentsairticketsbooked', ensureAuthenticated, (req, res) => {
    var userEmail = req.session.email,
        userId = req.session.userid;
    
    AirticketOneWay_Module.find({booked_by_user_email: userEmail})
    .then(allTicketsOneWay => {
        AirTicketsRoundWay_Module.find({booked_by_user_email: userEmail})
            .then(allTicketsRoundWay => {
                res.render('recents_air_tickets_booked', {
                    allTicketsOneWay: allTicketsOneWay,
                    allTicketsRoundWay: allTicketsRoundWay
                });
            })
            .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});



// Delete Air Tickets One Way
router.post('/deleteAirTicket/:id', ensureAuthenticated, (req, res) => {
    const ticketId = req.params.id;
    var userRole = req.session.userRole;
    
    if (userRole == "Employee") {
        AirticketOneWay_Module.deleteOne( {'_id': ticketId} )
        .then(() => {
            BureauTicketRequest_Module.deleteOne( {'airTicketId': ticketId} )
            .then(() => {
                res.redirect('/recentsairticketsbooked');
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    }
});

// Delete Air Tickets Round Way
router.post('/deleteAirTicketRoundWay/:id', ensureAuthenticated, (req, res) => {
    const ticketId = req.params.id;
    AirTicketsRoundWay_Module.deleteOne( {'_id': ticketId} )
        .then(() => {
            res.redirect('/recentsairticketsbooked');
        })
        .catch(err => console.log(err))
});

// Air Ticket Request
router.get('/airticketsrequests', ensureAuthenticated, (req, res) => {
    Airticket_Module.find({})
        .then(allTickets => {
            res.render('airticket-request', {
                allTickets: allTickets
            });
        })
        .catch(err => console.log(err));
});

// Round Trip Air Ticket
router.get('/airticketbookingroundway', (req, res) => {
    res.render('airticket-booking-roundway');
});


// Round Trip Request
router.get('/airticketrequestroundway', (req, res) => {
    res.render('airticket-request-roundway');
});


// Reports Gneration
router.get('/reports', (req, res) => {
    res.render('reports');
});

// Search Profile Air Tickets
router.get('/search-profile-airtickets', (req, res) => {
    res.render('search-profile-airtickets');
});


// Generating UID One Way
const create_UUID = () => {
    var dt = new Date().getTime();
    var uuid = 'xxxxx-xxxx-4xxx-yxxx-xxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

// Generating UID Round Way
const create_UUID_RoundWay = () => {
    var dt = new Date().getTime();
    var uuid = 'xxxxx-xxxx-4xxx-yxxx-xxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}


// Exporting Module
module.exports = router