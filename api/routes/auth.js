const router = require("express").Router();
const User = require('../model/User');
const joi = require('@hapi/joi');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const {
    body,
    validationResult
} = require('express-validator');

const schema = {
    username: joi.string().min(6).required(),
    email: joi.string().min(6).required().email(),
    password: joi.string().min(6).required()
}

router.post('/register',
    body('email').isEmail(),
    body('username').isString(),
    body('password').isStrongPassword(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const check = await User.findOne({
            email: req.body.email
        });
        if (check) {
            return res.status(400).send('email exists');
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);

        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash
        });
        try {
            const savedUser = await user.save();
            res.send(savedUser);
        } catch (err) {
            res.status(400).send(err);
        }
    });

router.post('/login',
    body('email').isEmail(),
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const user = await User.findOne({
            email: req.body.email
        });
        if (!user) {
            return res.status(400).send('!email exists');
        }
        
        const pass = await bcrypt.compare(req.body.password, user.password)
        if (!pass) {
            return res.status(400).send('!password exists');
        }

        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);

        res.header('auth-token', token).send(token);
    }
)
module.exports = router;