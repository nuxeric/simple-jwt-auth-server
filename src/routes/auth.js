const router = require('express').Router();
const User = require('../model/User');
const {
    registerValidation,
    loginValidation
} = require('../validation');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post('/register', async (req, res, next) => {
    // validation
    const {
        error
    } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // checking if user is already in database
    const emailExists = await User.findOne({
        email: req.body.email
    });
    if (emailExists) return res.status(400).send("Email already exists!!");

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });
    try {
        const savedUser = await user.save();
        res.send({
            user: user._id
        });
    } catch (err) {
        res.status(400).send(err);

    }
});

router.post('/login', async (req, res) => {
    // validation
    const {
        error
    } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // if email already exists
    const user = await User.findOne({
        email: req.body.email
    });
    if (!user) return res.status(400).send("Email doesn't exists!!");

    const validPass = await bcrypt.compare(req.body.password, user.password);

    if (!validPass) return res.status(400).send("Invalid password");

    const token = jwt.sign({
        _id: user._id
    }, process.env.TOKEN_SECRET, {
        expiresIn: '2h'
    });
    res.header("auth-token", token)
    res.send(token)
});





module.exports = router;