const router = require('express').Router();
const jwt = require('jsonwebtoken');

function verify (req, res, next) {
    const token = req.header("auth-token");
    if (!token) return res.status(401).send("Access Denied");

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.decodedToken = verified;
        next();
    } catch (error) {
        res.status(400).send("Invalid Token")
    }
}

router.get("/verifytoken", verify, (req, res) => {
    res.status(200).send("validation please work bro"); 
});

module.exports = {
    verify:verify,
    router:router
}