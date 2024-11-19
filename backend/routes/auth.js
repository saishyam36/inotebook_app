import express from "express";
import { userModel } from "../models/user.js";
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { fetchUser } from "../middleWare/fetchUser.js";

const JWT_SECRET = "jwtsecrettoken";
const router = express.Router();

//Route1: creating a user using: POST "/api/auth/createUser". Login not requiered
router.post('/createUser', [
    body('name', 'Minimum length is 5').isLength({ min: 5 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Minimum length is 6').isLength({ min: 6 }),
], async (req, res) => {
    //if there are any errors, return bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //saving whole body to db
    // const user = userModel(req.body);
    // user.save();

    try {
        //checking weather email user already exist or not. if exist return error (like this also we can send errors), if no email present create data with req.body
        let user = await userModel.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "User already exists" })
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = await userModel.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        });
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = await jwt.sign(data, JWT_SECRET);

        res.json({ authToken: authToken })
    } catch (error) {
        console.log(error.message)
        res.status(500).send(error.message, "Some unexpected error occured")
    }

    //creating data in db with specified fields and using then and catch
    // user = userModel.create({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password
    // }).then(user => res.json(user)) // .then if create promise resolved then performed to give response for example
    // .catch(err => res.json(err))    //.catch performed when create promise is rejected can send error in response
})

//Route2: Authenticate a user using: POST "/api/auth/login"
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').notEmpty(),
    body('password', 'Password key should present').exists(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Please try to login with correct credentials" })
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Please try to login with correct credentials" })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = await jwt.sign(data, JWT_SECRET);
        res.json({ authToken: authToken })
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error")
    }
})

//Route3: Get loggedin User Details using: POST "/api/auth/getUser". Login Required
router.post('/getUser', fetchUser , async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await userModel.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error")
    }
})


export { router as authRouter }
