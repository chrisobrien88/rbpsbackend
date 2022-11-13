require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');



const PlayerModel = require('./models/PLAYERS').Player;
const RoundsModel = require('./models/PLAYERS').Rounds;


// receive data from client in json format
app.use(express.json());
app.use(cors());

mongoose.connect(`mongodb+srv://rbps-admin:${process.env.DB_PASSWORD}@player-info.ydi2mm8.mongodb.net/rbpsPlayers?retryWrites=true&w=majority`, {
    useNewUrlParser: true
});

// // rounds aren't being added to the player's roundsPlayed array
// app.get('/api/newplayer', async (req, res) => {
//     const player = new PlayerModel({
//         id: 6,
//         firstName: 'ed',
//         lastName: 'cracknell',
//         roundsPlayed: [],
//     })

//     try {
//         await player.save();
//         res.json(player);
//     } catch (err) {
//         res.status(500).send(err);
//     }});

// see all players
// app.get('/api/players/', async (req, res) => {
//     try {
//         const players = await PlayerModel.find();
//         res.json(players);
//     } catch (err) {
//         res.status(500).send(err);
//     }
// });

app.get('/api/players/', async (req, res) => {
    PlayerModel.find({}, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    });
});

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
        res.status(500).send(err, 'no player found with that name');
    }
});

app.get('/api/players/:id/:score', async (req, res) => {
    const id = req.params.id;
    const filter = { id: id };
    const score = Number(req.params.score);

    const player = await PlayerModel.findOne(filter);
    const roundsPlayed = player.roundsPlayed;

    const update = { roundsPlayed: [score, ...roundsPlayed] };

    let doc = await PlayerModel.findOneAndUpdate(filter, update, {
        new: true
    });
    res.json(doc);
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

// post new score to player using POST
app.post('/api/players/:name', async (req, res) => {
    const name = req.params.name;
    const filter = { playerName: name };
    const score = Number(req.body.score);
    const roundsPlayed = req.body.roundsPlayed;
    const update = { roundsPlayed: [score, ...roundsPlayed] };

    let doc = await PlayerModel.findOneAndUpdate(filter, update, {
        new: true
    });
    res.json(doc);
});

app.post('/api/players/:playerId/rounds', (req, res) => {
    const round = new RoundsModel({
        player: req.params.playerId,
        id: req.body.id,
        score: req.body.score,
        date: req.body.date,
        slopeRating: req.body.slopeRating,
        courseRating: req.body.courseRating,
        course: req.body.course
    });
    round.save().then((newRound) => {
        res.send(newRound);
    });
});


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
})