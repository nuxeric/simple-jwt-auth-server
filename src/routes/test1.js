const router = require('express').Router();

router.get("/test1", (req, res) => {
    res.send("hello sir"); 
});


module.exports = router;