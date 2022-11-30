require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;


const PlayerModel = require('./models/PLAYERS').Player;
const RoundModel = require('./models/PLAYERS').Rounds;


// receive data from client in json format
app.use(express.json());
app.use(cors());

mongoose.connect(`mongodb+srv://rbps-admin:${process.env.DB_PASSWORD}@player-info.ydi2mm8.mongodb.net/rbpsPlayers?retryWrites=true&w=majority`, {
    useNewUrlParser: true
});

app.get('/', (req, res) => {
    res.send('try the path: /api/players');
});

// get all players
app.get('/api/players/', async (req, res) => {
    PlayerModel.find({}, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    });
});

// get a specific player
app.get('/api/players/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const filter = { id: id };
    const player = await PlayerModel.findOne(filter);
    // re-do error handling
    if (!player) {
        res.status(404).send('Player not found');
    }
    try {
        res.json(player);
    } catch (err) {
        res.status(400).send(err, 'no player found with that name');
    }
});

// get a specific player's specific round
app.get('/api/players/:id/:score', async (req, res) => {
    const id = req.params.id;
    const filter = { id: id };
    const scoreId = Number(req.params.score);

    const player = await PlayerModel.findOne(filter);

    const score = player.roundsPlayed.find(round => round.id === scoreId);

    if (!score) {
        res.status(404).send('Score not found');
    }
    try {
        res.json(score);
    }
    catch (err) {
        res.status(400).send(err, 'no score found with that id');
    }
});

// delete a specific player's specific round
app.delete('/api/players/:id/:score', async (req, res) => {
    const id = req.params.id;
    const filter = { id: id };
    const scoreId = Number(req.params.score);

    const player = await PlayerModel.findOne(filter);

    const score = player.roundsPlayed.find(round => round.id === scoreId);

    if (!score) {
        res.status(404).send('Score not found');
    }
    try {
        player.roundsPlayed = player.roundsPlayed.filter(round => round.id !== scoreId);
        player.save();
        res.json(score);
    }
    catch (err) {
        res.status(400).send(err, 'no score found with that id');
    }
});



// create new player
app.post('/api/newplayer', (req, res) => {
    const player = new PlayerModel({
        id: Date.now(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    });
    console.log('hello');
    player.save().then((newPlayer) => {
        console.log('new player created');
        res.send(newPlayer);
    });
});

app.post('/api/players/:id', async (req, res) => {
    const id = req.body.id;
    console.log(id, 'id here');
    const filter = { id: id };
    
    const round = new RoundModel({
        id: Date.now(),
        eagles: req.body.eagles,
        birdies: req.body.birdies,
        pars: req.body.pars,
        bogeys: req.body.bogeys,
        doubleBogeys: req.body.doubleBogeys,
        tripleBogeys: req.body.tripleBogeys,
        blobs: req.body.blobs,
        slopeRating: req.body.slopeRating,
        courseRating: req.body.courseRating,
        course: req.body.course,
        courseStarRating: req.body.courseStarRating,
        datePlayed: req.body.datePlayed,
    });
    console.log(round, 'round');
    const player = await PlayerModel.findOne(filter);

    const roundsPlayed = player.roundsPlayed || [];

    const update = { roundsPlayed: [round, ...roundsPlayed] };

    let doc = await PlayerModel.findOneAndUpdate(filter, update, {
        new: true
    });
    res.json(doc);

});


// delete player
app.delete('/api/players/:id', async (req, res) => {
    const id = req.params.id;
    const filter = { id: id };
    const player = await PlayerModel.findOneAndDelete(filter);
    if (!player) {
        res.status(404).send('Player not found');
    }
    try {
        res.json(player);
    } catch (err) {
        res.status(500).send(err);
    }
});


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
})