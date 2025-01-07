const generateToken = require('../config/generateToken.js');
const User = require('../models/userModel.js');
const bcrypt = require('bcryptjs');


const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please enter all the fields');
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password,
        // pic
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            // pic:user.pic,
            token: generateToken(user._id),
        })
        console.log("Signup Successful")
    } else {
        res.status(400);
        throw new Error("Failed to create the user!")
    }
}



const authUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Please fill the data" });
    }
    const user = await User.findOne({ email });
    // console.log(user);
    // console.log(user.password);
    // console.log(password);
    // console.log(user.password);

    if (user) {
        // const checkPass=await bcrypt.compare(password,user.password);
        // console.log(checkPass);
        // if (!checkPass) {
        //     res.status(400).json({ error: "Invalid Credentials" });
        // }
        // else {

        //     res.send({
        //         _id:user._id,
        //         name:user.name,
        //         email:user.email,
        //         pic:user.pic,
        //         token:generateToken(user._id),
        //     })
        // }
        if (user.password === password) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                // pic:user.pic,
                token: generateToken(user._id),
            })
            // console.log(user.email);
            console.log("login successful")
        }
        else {
            console.log("Invalid credentials");
        }

    }
    else {
        res.status(400).json({ error: "Invalid Credentials" });
    }
}



// /api/users?search=sandeep
const allUsers = async (req, res) => {
    const keyword = req.query.search ? {
        $or: [
            {
                name: { $regex: req.query.search, $options: 'i' }
            },
            { email: { $regex: req.query.search, $options: 'i' } }
        ]
    }:{};
    const users=await User.find(keyword).find({_id:{$ne:req.user._id}});
    // console.log(users);
    res.send(users);
}







module.exports = { registerUser, authUser, allUsers };