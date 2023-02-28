const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const JWT_SECRET = 'pranayisagood$boy';
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

// for creating a user /api/auth/createuser
router.post('/createuser', [
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
], async (req, res) => {
    let success = false;
    //console.log(req.body);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    try {
        //console.log(req.body);



        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: " sorry a user with this email already exists" })
        }
        const salt = await bcryptjs.genSalt(10);
        const secPass = await bcryptjs.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("some error ocurred");
    }


});
// for authenticating a user /api/auth/login
router.post('/login', [

    body('email', 'enter a valid email').isEmail(),
    body('password', 'password needed').exists(),
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success = false;
            return res.status(400).json({ error: " invalid credentials" })
        }
        const passwordCompare = await bcryptjs.compare(password, user.password);
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({ success, error: " invalid credentials" })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        const success = true;
        res.json({ success, authToken });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("internal server error");
    }

}
    // for getting user details
)
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        let userId = req.user.id;
        //console.log(req)
        const user = await User.findById(userId).select("-password")
        //console.log(user)
        return res.send(user)

    } catch (error) {
        console.log(error.message);
        res.status(500).send("internal server error");
    }
}
)

module.exports = router;