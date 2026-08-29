function authorize(role) {
    return (req, res, next) => {
        // Check if user is logged in and has the correct role
        if (req.session.user && req.session.user.role === role) {
            next(); // User is authorized, proceed to next middleware/route
        } else {
            res.status(403).send('Forbidden'); // User is not authorized
        }
    }
}

module.exports = authorize;