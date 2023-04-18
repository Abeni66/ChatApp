const express = require('express');

const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const app = express();
const User = require('./models/User')
const connectToDB = require('./conn')
const cors = require('cors');

connectToDB();
dotenv.config();
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
}));
const jwtSecret = process.env.JWT_SECRET;
app.get('/test', (req, res) =>{
    res.json('test ok');
});


app.post('/register', async (req,res) => {
    const {username,password}= req.body;
    const createdUser = await User.create({username,password});
    jwt.sign({userId: createdUser, _Id}, jwtSecret, {}, (err, token) =>{
        if (err) throw err;
        res.cookie('token', token).status(201).json('ok');
    });
});
app.listen(4040);