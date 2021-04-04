const express = require('express');
const expressValidator = require('express-validator')
const session = require('express-session')
const cookieParser = require('cookie-parser');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router()

const { v4: uuidv4 } = require('uuid');

const mongoose = require('mongoose')
const path = require('path')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

app.set('trust proxy', 1) // trust first proxy

const methodOverride = require('method-override')
app.use(methodOverride('_method'))


// 
app.use(cookieParser())

//app.use(express.urlencoded());

app.use(express.static(__dirname + '/script'));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/model'));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect('mongodb://localhost:27017/HackMelbourne', {
    //mongoose.connect('mongodb+srv://acmahaja:GxHmB1N69HeCXsuo@cluster0.tsomk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('connected to db');
}).catch((error) => {
    console.log(error);
})


app.use(bodyParser.urlencoded({ extended: false }))

const UserModel = require('./model/UserModel');
const Users = mongoose.model('Users', UserModel);

const MoodModel = require('./model/MoodModel');
const Moods = mongoose.model('Mood', MoodModel);

const MeditationModel = require('./model/MeditationModel');
const Meditation = mongoose.model('Meditation', MeditationModel);
const { body } = require('express-validator');

// const DiaryModel = require('./model/DiaryModel');
// const Diarys = mongoose.model('Diarys', DiaryModel);

// app.get('/user/:userID/diary/:entryID/edit', (req, res) => {
//     const { userID, moodID } = req.params;
//     res.render('pages/user/diary/edit', req.params)
// })

// app.get('/user/:userID/diary/new', (req, res) => {
//     const { userID, moodID } = req.params;
//     res.render('pages/user/diary/new', req.params)
// })


// app.get('/user/:userID/diary/:entryID', (req, res) => {
//     const { userID, moodID } = req.params;
//     res.render('pages/user/diary/diaryEntry', req.params)
// })

// app.get('/user/:userID/diary', (req, res) => {
//     const { userID } = req.params;
//     res.render('pages/user/diary/diaryPage', req.params)
// })

app.use((req, res, next) => {
    console.log(req.url);
    console.log(req.method);
    next();
})

app.post('/medidate/new', async(req, res) => {
    console.log(req.body);
    const d = new Date();
    console.log(req.cookies);
    console.log(req.body);
    const newMedidate = new Meditation({
        _id: uuidv4(),
        userID: req.cookies.userid,
        date: d.toString(),
        time: req.body.time,
    });
    await newMedidate.save().then(() => {
        res.redirect(`/user/${req.cookies.userid}/meditation`)

    })

})

app.delete('/user/:userID/mood/:moodID', async(req, res) => {

    Moods.findByIdAndDelete(req.params.moodID, () => {
        res.redirect(`/user/${req.params.userID}/mood`)
    })
})

app.put('/user/:userID/mood/:moodID/edit', async(req, res) => {
    console.log(req.body);
    await Moods.findById(req.params.moodID)
        .then((result) => {
            result.description = req.body.description
            Moods.findByIdAndUpdate(req.params.moodID, result, () => {
                res.redirect(`/user/${req.params.userID}/mood/${req.params.moodID}`)
            });
        })
})

app.get('/user/:userID/mood/:moodID/edit', async(req, res) => {
    const { userID, moodID } = req.params;
    //res.render('pages/user/mood/moodEntry', req.params)
    let userData = {};
    await Users.findById(userID)
        .then(result => {
            Object.assign(userData, result._doc)
        }).then(
            await Moods.findById(moodID)
            .then(result => {
                Object.assign(userData, result._doc)
                console.log(userData);
                res.render('pages/user/mood/edit', userData)
            })
        )
})

app.post('/mood/new', (req, res) => {
    const d = new Date();
    const uuid = uuidv4();
    var body = req.body;
    body._id = uuid;
    body.userID = req.cookies.userid;
    body.date = d;
    console.log(body);
    const newMoods = new Moods(body);
    newMoods.save().then((mood) => {

        res.redirect(`/user/${body.userID}/mood/${body._id}`)
    }).catch((error) => {
        console.log(error);
    });
})

app.get('/user/:userID/mood/new', (req, res) => {
    res.render('pages/user/mood/new')
})



app.get('/user/:userID/mood/:moodID', async(req, res) => {
    const { userID, moodID } = req.params;
    //res.render('pages/user/mood/moodEntry', req.params)
    let userData = {};
    console.log(userData);

    const d = new Date();
    await Users.findById(userID)
        .then(result => {

            Object.assign(userData, result._doc)
        }).then(
            await Moods.findById(moodID)
            .then(result => {
                Object.assign(userData, result._doc)
                res.render('pages/user/mood/moodEntry', userData)
                    //res.send(userData)
            })
        )
})

app.post('/user/:userID/mood', (req, res) => {
    const { userID } = req.params;
    res.render('pages/user/mood/moodPage', req.params)
})

// $or: [userID]

app.get('/user/:userID/mood', async(req, res) => {
    const userID = {};
    userID.userID = req.params.userID;

    let userData = {};

    await Users.findById(req.params.userID)
        .then(result => Object.assign(userData, result._doc)).then(
            Moods.find({ $or: [userID] }, function(err, moods) {
                userData.moods = moods
                    //res.send(userData);
                res.render('pages/user/mood/moodPage', userData);
            })
        );
});

app.get('/user/:userID/helpcall', (req, res) => {
    const { userID } = req.params;
    res.render('pages/user/help', req.params)
})

app.get('/user/:userID/meditation', (req, res) => {
    res.render('pages/user/meditation', req.params)
})

app.get('/user/:userID/resources', (req, res) => {
    const { userID } = req.params;
    res.render('pages/user/resources', req.params)
})

app.get('/user/:userID', async(req, res) => {
    console.log(req.cookies)
    await Users.findById(req.params.userID)
        .then(result => res.render('pages/user/userpage', result));
})

app.post('/user/new', async(req, res) => {
    const requestBody = req.body;
    requestBody._id = uuidv4();
    const d = new Date();
    console.log(requestBody);
    const newUser = new Users(requestBody);
    await newUser.save()
        .then(() => {
            res.redirect(`/user/${requestBody._id}`)
            res.cookie('userid', result._id);
        }).catch((error) => {
            const userID = {};
            userID._id = req.params.userID;
            const requestBody = {};
            requestBody.email = req.body.email;

            console.log(error);
        });
})

app.get('/signup', (req, res) => {
    res.render('pages/signup');
})

app.get('/helpcall', (req, res) => {
    res.render('pages/help');
})

app.post('/login', async(req, res) => {
    const userID = {};
    userID._id = req.params.userID;
    const requestBody = {};
    requestBody.email = req.body.email;
    await Users.findOne(requestBody).then(result => {
        console.log(result.password)
        console.log(req.body.password)
        if (result.password === req.body.password) {
            res.cookie('userid', result._id);
            console.log(result);
            res.redirect(`/user/${result._id}`)
        }
        res.redirect('/login')
    }).catch(err => {
        console.log(err);
        res.redirect('/login')
    })

})

app.delete('/logout', (req, res) => {
    console.log(req.cookies);
})

app.get('/login', (req, res) => {
    res.render('pages/login');
})


app.get('/credits', (req, res) => {
    res.render('pages/credits')
})


app.get('/about', (req, res) => {
    res.render('pages/about')
})


app.get('/', (req, res) => {
    res.render('pages/index');
})


app.get('*', (req, res) => {
    res.send(`404 page \n Heck you doing here 🤨`, 404);
})


app.listen(process.env.PORT || 3000, () => {
    console.log("Listening on port 3000");
});