// Bring Exrpess
const express = require('express');
const router = express.Router();
// User Module
const User = require('../models/Users');
// Bcrypt for password encryption 
const bcrypt = require('bcryptjs');
// Passport for authentication
const passport = require('passport');

// Login Page
router.get('/login', (req, res) => {
    res.render('login');
});

// Register Page
router.get('/register', (req, res) => {
    res.render('register');
});

// Register Handler
router.post('/register', (req, res) => {
    const { name, department, role, email, password, password2 } = req.body
    var reg = /^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@aicte-india.org$/
    let errors = [];
    if (!name || !email || !role || !password || !password2 || !department) {
        errors.push({ msg: 'Please enter all fields' });
    }
    // Password Check
    if (password !== password2) {
        errors.push({ msg: 'Password dose not match' })
    }
    // Password Length
    if (password.length < 6) {
        errors.push({ msg: 'Password should be atleast 6 character' })
    }

    if (errors.length > 0) {
        res.render('register', {
          errors,
          name,
          department,
          role,
          email,
          password,
          password2
        });
    } else {
        User.findOne( {"$or" : [{email : email}]} )
            .then(user => {
                if (user) {
                    errors.push({ msg: `Email already exist` })
                    res.render('register', {
                        errors,
                        name,
                        department,
                        role,
                        email,
                        password,
                        password2
                    })
                }
                else {
                    if (reg.test(email)) {
                        const newUser = new User({
                            name,
                            department,
                            role,
                            email,
                            password,
                        })
                        // Hash Password
                        bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            // Set Password to hash
                            newUser.password = hash
                            // Save User
                            newUser.save()
                                .then(user => {
                                    req.flash('success_msg', 'You Are Successfully Registered')
                                    res.redirect('/users/login')
                                })
                                .catch(err => console.log(err))
                        }))
                    } else {
                        errors.push({ msg: `Please Enter Valid AICTE Email Address` })
                        res.render('register', {
                            errors,
                            name,
                            department,
                            role,
                            email,
                            password,
                            password2
                        })
                    }
                    

                }
        })
    }
});


// Login Handler
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next)
});
// LogOut Handle
router.get('/logout', (req, res) => {
    req.logOut()
    res.redirect('/users/login')
});

// Exporting Module
module.exports = router