const jwt = require('jsonwebtoken');
const authorization = async (req, res, next) => {
    try {
        const token = req.headers.token;
        const userId = jwt.verify(token,"jwt_secret")
        req.body.userId = userId.userId
        if (!token) {
            return res.status(401).json({ error: 'Missing token' });
        }
        next()
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error: error})
    }
}
module.exports = authorization