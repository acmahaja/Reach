const express = require('express');
const app = express();

const path = require('path')

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/script'));

app.set('view engine', 'ejs')

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


app.get('/user/:userID/mood/:moodID/edit', (req, res) => {
    const { userID, moodID } = req.params;
    res.render('pages/user/mood/edit', req.params)
})

app.get('/user/:userID/mood/new', (req, res) => {
    const { userID, moodID } = req.params;
    res.render('pages/user/mood/new', req.params)
})


app.get('/user/:userID/mood/:moodID', (req, res) => {
    const { userID, moodID } = req.params;
    res.render('pages/user/mood/moodEntry', req.params)
})

app.get('/user/:userID/mood', (req, res) => {
    const { userID } = req.params;
    res.render('pages/user/mood/moodPage', req.params)
})

//✅
app.get('/user/:userID/helpcall', (req, res) => {
    const { userID } = req.params;
    res.render('pages/user/help', req.params)
})


//✅
app.get('/user/:userID/resources', (req, res) => {
    const { userID } = req.params;
    res.render('pages/user/resources', req.params)
})

//✅
app.get('/user/:userID', (req, res) => {
    //const { "userID": userID } = req.params;
    console.log(req.params);
    res.render('pages/user/userpage', req.params)
})

//✅
app.get('/helpcall', (req, res) => {
    res.render('pages/help');
})

//✅
app.get('/signup', (req, res) => {
    res.render('pages/signup');
})

//✅
app.get('/login', (req, res) => {
    res.render('pages/login');
})

//✅
app.get('/credits', (req, res) => {
    res.render('pages/credits')
})

//✅
app.get('/about', (req, res) => {
    res.render('pages/about')
})

//✅
app.get('/', (req, res) => {
    res.render('pages/index');
})

//✅
app.get('*', (req, res) => {
    res.send(`404 page \n Heck you doing here 🤨`, 404);
})


app.listen(process.env.PORT || 3000, () => {
    console.log("Listening on port 3000");
});