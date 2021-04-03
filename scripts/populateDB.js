const express = require('express');
const app = express();
const mongoose = require('mongoose')
const path = require('path')
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');


app.use(express.static(__dirname + '../public'));
app.use(express.static(__dirname + '../model'));
app.use(bodyParser.urlencoded({ extended: false }))

const UserModel = require('../model/UserModel');
const Users = mongoose.model('Users', UserModel);

const MoodModel = require('../model/MoodModel');
const Moods = mongoose.model('Mood', MoodModel);

const DiaryModel = require('../model/DiaryModel');
const Diarys = mongoose.model('Diarys', DiaryModel);

mongoose.connect('mongodb://localhost:27017/HackMelbourne', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('connected to db');
}).catch((error) => {
    console.log(error);
});

// app.post('/newUser', async(req, res) => {
const uuidVal = "691237b6-f6f2-4a27-891f-5438807b75a3";
const d = new Date();
// const newUsers = new Users({
//     _id: uuidVal,
//     email: "acmahaja@email.com",
//     password: "password",
//     firstname: "A",
//     lastname: "J",
// });

const newMoods = new Moods({
    _id: uuidv4(),
    userID: uuidVal,
    date: d.toString(),
    moods: { "happy": 1, "sad": 0 },
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non quae unde tenetur harum! Possimus ratione, ipsum sed qui incidunt inventore quae quis veritatis debitis totam quaerat perferendis repudiandae facere maxime."
});

const newDiarys = new Diarys({
    _id: uuidv4(),
    userID: uuidVal,
    date: d.toString(),
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non quae unde tenetur harum! Possimus ratione, ipsum sed qui incidunt inventore quae quis veritatis debitis totam quaerat perferendis repudiandae facere maxime."

});
let dbMessage = ""
    // newUsers.save().then((user) => {
    //     dbMessage += user
    // }).catch((error) => {
    //     console.log(error);
    // });

newMoods.save().then((mood) => {
    dbMessage += mood
}).catch((error) => {
    console.log(error);
});

newDiarys.save().then((diary) => {
    dbMessage += diary
    console.log(dbMessage);
    // res.send(dbMessage);
}).catch((error) => {
    console.log(error);
});


// res.send(dbMessage);
// });


// app.listen(process.env.PORT || 3000, () => {
//     console.log("Listening on port 3000");
// });