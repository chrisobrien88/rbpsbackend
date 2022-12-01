import './App.css';
import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";


import PlayersDisplay from './components/PlayersDisplay';
import PlayerInfo from './components/PlayerInfo';
import Enter from './components/Enter';
import ScoreInputForm from './components/ScoreInputForm';


function App() {

  const initialScore = {
    eagleScore: '',
    birdieScore: '',
    parScore: '',
    bogeyScore: '',
    doubleBogeyScore: '',
    tripleBogeyScore: '',
    blobScore: '',
    slopeRating: 120,
    courseRating: 71,
    courseStarRating: 3,
    course: '',
    datePlayed: '',

    grossStablefordScore: '',
    eighteenHandicapStablefordScore: '',
    thirtySixHandicapStablefordScore: '',
    slopeAdjustedStablefordScore: '',
    slopeAdjustedEighteenHandicapStablefordScore: '',
    slopeAdjustedThirtySixHandicapStablefordScore: '',
    courseHandicap: '',
  }
  //state
  const [players, setPlayers] = useState([]);
  const [player, setPlayer] = useState('');
  const [playerRounds, setPlayerRounds] = useState([]);
  const [round, setRound] = useState(initialScore);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [display, setDisplay] = useState(false);
  const [submit, setSubmit] = useState(false);

  const [triggerFetch, setTriggerFetch] = useState(false);


  //useEffect
  useEffect(() => {
    const getPlayers = async () => {
      try {
        Axios.get('http://localhost:5000/api/players').then((response) => {
        setPlayers(response.data);
      });
      }
      catch (err) {
        console.log(err);
      }
    }
    getPlayers();
  }, []);

  useEffect(() => {
    const getplayerRounds = async () => {
      if(player) {
      try {
        Axios.get(`http://localhost:5000/api/players/${player.id}`).then((response) => {
        setPlayerRounds(response.data.roundsPlayed);
        console.log(playerRounds, 'here playerRounds');
      });
      }
      catch (err) {
        console.log(err);
      }
    }
  }
  getplayerRounds();
  }, [triggerFetch]);


  //functions
  const addNewRound = async (id) => {
    try {
      await Axios.post(`http://localhost:5000/api/players/${id}`, {
      id: id,
      eagles: round.eagleScore,
      birdies: round.birdieScore,
      pars: round.parScore,
      bogeys: round.bogeyScore,
      doubleBogeys: round.doubleBogeyScore,
      tripleBogeys: round.tripleBogeyScore,
      blobs: round.blobScore,
      slopeRating: round.slopeRating,
      courseRating: round.courseRating,
      courseStarRating: round.courseStarRating,
      course: round.course,
      datePlayed: round.datePlayed,

      grossStablefordScore: round.grossStablefordScore,
      eighteenHandicapStablefordScore: round.eighteenHandicapStablefordScore,
      thirtySixHandicapStablefordScore: round.thirtySixHandicapStablefordScore,
      slopeAdjustedStablefordScore: round.slopeAdjustedStablefordScore, 
      slopeAdjustedEighteenHandicapStablefordScore: round.slopeAdjustedEighteenHandicapStablefordScore,
      slopeAdjustedThirtySixHandicapStablefordScore: round.slopeAdjustedThirtySixHandicapStablefordScore,
      courseHandicap: round.courseHandicap,

    }, {headers: { 'Content-Type': 'application/json' }});
    setRound(initialScore);
    setSubmit(!submit);
    setTriggerFetch(!triggerFetch);
}
    catch (e) {
      console.log(e.message);
    }
  }

  // delete a specific player's specific round
  const deleteRound = (id, scoreId) => {
    Axios.delete(`http://localhost:5000/api/players/${id}/${scoreId}`)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    })
    // is this the best way to do this? objective is to update the page after deleting a round
    // without the slight delay, the page doesn't update until you click on a different player
    setTimeout(() => setTriggerFetch(!triggerFetch), 500);
  }

  const toggleDisplay = () => {
    setDisplay(!display);
    console.log('hello there');
  };

  const toggleSubmit = () => {
    setSubmit(!submit);
  };

  return (
    <div className="App">
      {display ? 
        <div>
          <PlayersDisplay players={players} setPlayer={setPlayer} triggerFetch={triggerFetch} setTriggerFetch={setTriggerFetch}/> 
          {player? 
          <div>
            <h3>{player.firstName} {player.lastName}</h3>
            <button className="button" onClick={toggleSubmit}>Submit a new Score</button>
            // started here.
              <ScoreInputForm 
                addNewRound={addNewRound}
                player={player}
                submit={submit}
                setRound={setRound}
                round={round}
                />
              <PlayerInfo 
                player={player} 
                playerRounds={playerRounds}
                setPlayerRounds={setPlayerRounds}
                deleteRound={deleteRound}
                toggleSubmit={toggleSubmit}
                round={round}
                setRound={setRound}
              /> 
            </div> : null}
        </div> : 
        <article className='enter'>
          <Enter toggleDisplay={toggleDisplay}
            firstName = {firstName}
            setFirstName = {setFirstName}
            lastName = {lastName}
            setLastName = {setLastName}
          /> 
        </article>}
    </div>
  );
}

export default App;
