const router = require('express').Router();
const verifytoken = require('./verifytoken')

router.get("/private", verifytoken.verify, (req, res) => {
    res.send(req.decodedToken);
});


module.exports = router;