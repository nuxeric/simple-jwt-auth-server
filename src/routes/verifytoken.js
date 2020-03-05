const router = require('express').Router();
const jwt = require('jsonwebtoken');

function verify(req, res, next) {
    let token = req.header("authorization");
    if (!token) return res.status(401).send("Access Denied");

    if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length).trimLeft();
    }

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.decodedToken = verified;
        next();
    } catch (error) {
        res.status(400).send("Invalid Token / Token is Malformed")
    }
}

router.get("/verifytoken", verify, (req, res) => {
    res.status(200).send("Token is valid!");
});

module.exports = {
    verify: verify,
    router: router
}