const express = require('express');
const expressValidator = require('express-validator')
const session = require('express-session')
const app = express();
const bodyParser = require('body-parser');
const router = express.Router()

const { v4: uuidv4 } = require('uuid');

const mongoose = require('mongoose')
const path = require('path')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

app.set('trust proxy', 1) // trust first proxy

app.use(session({ secret: 'algorithms are fun', resave: false, saveUninitialized: false, cookie: { maxAge: Infinity } }));


app.use(express.urlencoded());


app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/model'));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));
mongoose.connect('mongodb+srv://acmahaja:GxHmB1N69HeCXsuo@cluster0.tsomk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('connected to db');
}).catch((error) => {
    console.log(error);
})


app.use(express.static(__dirname + '../public'));
app.use(express.static(__dirname + '../model'));
app.use(bodyParser.urlencoded({ extended: false }))

const UserModel = require('./model/UserModel');
const Users = mongoose.model('Users', UserModel);

const MoodModel = require('./model/MoodModel');
const Moods = mongoose.model('Mood', MoodModel);

const DiaryModel = require('./model/DiaryModel');
const Diarys = mongoose.model('Diarys', DiaryModel);

app.get('/user/:userID/diary/:entryID/edit', (req, res) => {
    const { userID, moodID } = req.params;
    res.render('pages/user/diary/edit', req.params)
})

app.get('/user/:userID/diary/new', (req, res) => {
    const { userID, moodID } = req.params;
    res.render('pages/user/diary/new', req.params)
})


app.get('/user/:userID/diary/:entryID', (req, res) => {
    const { userID, moodID } = req.params;
    res.render('pages/user/diary/diaryEntry', req.params)
})

app.get('/user/:userID/diary', (req, res) => {
    const { userID } = req.params;
    res.render('pages/user/diary/diaryPage', req.params)
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



app.get('/user/:userID/mood/new', (req, res) => {
    const { userID, moodID } = req.params;
    res.render('pages/user/mood/new', req.params)
})


app.get('/user/:userID/mood/:moodID', async(req, res) => {
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
                res.render('pages/user/mood/moodEntry', userData)
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
    const { userID } = req.params;
    res.render('pages/user/meditation', req.params)
})

app.get('/user/:userID/resources', (req, res) => {
    const { userID } = req.params;
    res.render('pages/user/resources', req.params)
})

app.get('/user/:userID', async(req, res) => {
    await Users.findById(req.params.userID)
        .then(result => res.render('pages/user/userpage', result));
    // res.render('pages/user/userpage', result)
})

app.post('/user/new', async(req, res) => {

    const requestBody = req.body;
    requestBody._id = uuidv4();
    const d = new Date();
    console.log(requestBody);
    const newUser = new Users(requestBody);
    await newUser.save().then((res.redirect(`/user/${requestBody._id}`))).catch((error) => {
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
            console.log(result);
            res.redirect(`/user/${result._id}`)
        }
        res.redirect('/login')
    }).catch(err => {
        console.log(err);
        res.redirect('/login')
    })

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
    const sess = req.session
    console.log(sess);
    if (sess.userid) {
        res.status = 200;
        res.redirect(`/user/${sess.userid}/resources`);
    }
    console.log(sess.userid);
    res.render('pages/index');
})


app.get('*', (req, res) => {
    res.send(`404 page \n Heck you doing here 🤨`, 404);
})


app.listen(process.env.PORT || 3000, () => {
    console.log("Listening on port 3000");
});