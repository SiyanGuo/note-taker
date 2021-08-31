const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 3000;
const app = express();

let notes = require('./db/db.json');

// can't notes be updaed?? it is an array????
// const notes = require('./db/db.json')????

//parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
//parse incoming JSON data into JS Obj
app.use(express.json());

//instructs the server to make certain files readily available 
app.use(express.static('public'));


//why home page is auto connected????
//this home route not working????
app.get('/', (req, res) => {
    res.send('Connected!');
});

//handle render notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

//handle get notes from db.json
app.get('/api/notes', (req, res) => {
    res.json(notes);
});

//handle post route
app.post('/api/notes', (req, res) => {
    req.body.id = notes.length.toString();
    const note = req.body;
    notes.push(note);
    fs.writeFileSync(path.join(__dirname, './db/db.json'),
        JSON.stringify(notes, null, 2)
    );
    // what should i send back????
    res.json(note);
});

//handle delete route
app.delete('/api/notes/:id', (req, res)=>{
    //if using const, can't assign it???? 
    notes = notes.filter(note => note.id !== id);
    fs.writeFileSync(path.join(__dirname, './db/db.json'),
        JSON.stringify(notes, null, 2)
    );
    res.json(notes);
});

//set up server on port 3000
app.listen(PORT, () => {
    console.log(`App server now on ${PORT}!`);
});