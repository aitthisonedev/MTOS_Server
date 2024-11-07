const User = require('../models/usersModel');

// Middleware to check if there are any users in the database
const checkUserExists = async (req, res, next) => {
    // try {
    //     const userCount = await User.count();
    //     if (userCount === 0 && req.path !== '/register') {
    //         return res.redirect('/register'); // Redirect to register if no users found
    //     }
    //     next();
    // } catch (err) {
    //     res.status(500).json({ error: 'Internal Server Error' });
    // }
    next()
};

module.exports = checkUserExists;
