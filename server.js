const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 3000;
const app = express();

const notes = require('./db/db.json');


//parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
//parse incoming JSON data into JS Obj
app.use(express.json());

//instructs the server to make certain files readily available 
app.use(express.static('public'));
//why home page is auto connected?


app.get('/', (req, res) => {
    res.send('Connected!');
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    req.body.id = notes.length.toString();
    const note = req.body;
    notes.push(note);
    fs.writeFileSync(path.join(__dirname, './db/db.json'),
        JSON.stringify(notes, null, 2)
    );
    //what do i send back?
    res.json(note);
});

app.delete('/')
app.listen(PORT, () => {
    console.log(`App server now on ${PORT}!`);
})