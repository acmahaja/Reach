const express = require('express');
const app = express();

const path = require('path')

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/script'));

app.set('view engine', 'ejs')

app.get('/user/:userID/diary/:entryID/edit', (req, res) => {
    const { userID, moodID } = req.params;
    res.send(`Diary Entry ${moodID} page for ${entryID} `)
})

app.get('/user/:userID/diary/new', (req, res) => {
    const { userID, moodID } = req.params;
    res.send(`Diary Entry  page for ${userID} `)
})


app.get('/user/:userID/diary/:entryID', (req, res) => {
    const { userID, moodID } = req.params;
    res.send(`Diary Entry ${entryID} page for ${userID} `)
})

app.get('/user/:userID/diary', (req, res) => {
    const { userID } = req.params;
    res.send(`Diarypage for ${userID}`)
})


app.get('/user/:userID/mood/edit', (req, res) => {
    const { userID, moodID } = req.params;
    res.send(`Mood Entry ${moodID} page for ${userID} `)
})

app.get('/user/:userID/mood/new', (req, res) => {
    const { userID, moodID } = req.params;
    res.send(`Mood Entry ${moodID} page for ${userID} `)
})


app.get('/user/:userID/mood/:moodID', (req, res) => {
    const { userID, moodID } = req.params;
    res.send(`Mood Entry ${moodID} page for ${userID} `)
})

app.get('/user/:userID/mood', (req, res) => {
    const { userID } = req.params;
    res.send(`Moodpage for ${userID}`)
})

app.get('/user/:userID/helpcall', (req, res) => {
    const { userID } = req.params;
    res.send(`HelpCall page ${userID}`)
})

app.get('/user/:userID/helpcall', (req, res) => {
    const { userID } = req.params;
    res.send(`HelpCall page ${userID}`)
})

app.get('/user/:userID/resources', (req, res) => {
    const { userID } = req.params;
    res.send(`Resources Page for ${userID}`)
})

app.get('/user/:userID', (req, res) => {
    const { userID } = req.params;
    res.send(`Homepage for ${userID}`)
})

app.get('/helpcall', (req, res) => {
    res.send('Get Help page');
})

app.get('/signup', (req, res) => {
    res.send('signup page');
})

app.get('/login', (req, res) => {
    res.send('login page');
})

app.get('/credits', (req, res) => {
    res.send('credits page')
})

app.get('/about', (req, res) => {
    res.send('about page')
})

app.get('/', (req, res) => {
    res.send('index page');
})

app.get('*', (req, res) => {
    res.send('404 page', 404);
})


app.listen(process.env.PORT || 3000, () => {
    console.log("Listening on port 3000");
});