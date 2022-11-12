const express = require('express');
const mongoose = require('mongoose');
const app = express();


const PlayerModel = require('./models/PLAYERS').Player;
const RoundsModel = require('./models/PLAYERS').Rounds;


// receive data from client in json format
app.use(express.json());

mongoose.connect('mongodb+srv://rbps-admin:sawitbounce@player-info.ydi2mm8.mongodb.net/rbpsPlayers?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

// rounds aren't being added to the player's roundsPlayed array
app.get('/api/players', async (req, res) => {
  
    const player = new PlayerModel({
        id: 3,
        playerName: 'oli',
        playerId: '1234',
        roundsPlayed: [],
    })

    try {
        await player.save();
        res.json(player);
    } catch (err) {
        res.status(500).send(err);
    }});

app.get('/api/players/:name', async (req, res) => {
    const name = req.params.name;
    const filter = { playerName: name };
    const player = await PlayerModel.findOne(filter);
    try {
        res.json(player);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/api/players/:name/:score', async (req, res) => {
    const name = req.params.name;
    const filter = { playerName: name };
    const score = Number(req.params.score);
    
    let player = await PlayerModel.findOne(filter);
    const roundsPlayed = player.roundsPlayed;

    const update = { roundsPlayed: [score, ...roundsPlayed] };

    let doc = await PlayerModel.findOneAndUpdate(filter, update, {
        new: true
    });
    res.json(doc);
});

// app.post('/api/players', (req, res) => {
//     const player = new PlayerModel({
//         playerName: req.body.playerName,
//         playerId: req.body.playerId,
//         roundsPlayed: req.body.roundsPlayed
//     });
//     player.save().then((newPlayer) => {
//         res.send(newPlayer);
//     });
// });

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



app.listen(5000, () => {
  console.log('Server is running on port: 5000');
})