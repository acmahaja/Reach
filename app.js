const express = require('express');
const app = express();

const path = require('path')

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/script'));

app.set('view engine', 'ejs')


app.get('/:userID/mood', (req, res) => {
    const { userID } = req.params;
    res.send(userID)
})

app.get('/:userID', (req, res) => {
    const { userID } = req.params;
    res.send(userID)
})

app.get('/', (req, res) => {
    res.render('pages/meditate');
})


app.listen(process.env.PORT || 3000, () => {
    console.log("Listening on port 3000");
});