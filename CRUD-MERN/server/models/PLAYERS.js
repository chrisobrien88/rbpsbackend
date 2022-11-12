const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const PlayerSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    playerName: {
        type: String,
        required: true,
    },
    playerId: {
        type: String,
        required: true
    },
    roundsPlayed: [],
  },
); 

const RoundsSchema = new mongoose.Schema({
    
    id: {
        type: Number,
        required: false
    },
    score: {
        type: Number,
        required: false
    },
    date: {
        type: Date,
        required: false
    },
    slopeRating: {
        type: String,
        required: false
    },
    courseRating: {
        type: String,
        required: false
    },
    course: {type: String,
        required: false}
});

const Rounds = mongoose.model('Rounds', RoundsSchema);
const Player = mongoose.model('Player', PlayerSchema);

exports.Player = Player;
exports.Rounds = Rounds;