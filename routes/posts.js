const router = require('express').Router();
const verifytoken = require('./verifytoken')

router.get("/posts", verifytoken.verify, (req, res) => {
    res.send(req.user); 
});


module.exports = router;