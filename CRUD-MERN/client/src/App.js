import './App.css';
import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";


import AddNewPlayer from './components/AddNewPlayer';
import PlayersDisplay from './components/PlayersDisplay';
import PlayerInfo from './components/PlayerInfo';


function App() {

  //state
  const [players, setPlayers] = useState([]);
  const [player, setPlayer] = useState('');
  const [round, setRound] = useState({
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
    display: false
  });
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [display, setDisplay] = useState(false);
  const [submit, setSubmit] = useState(false);

  // const [triggerFetch, setTriggerFetch] = useState(false);


  //useEffect
  useEffect(() => {
    Axios.get('http://localhost:5000/api/players').then((response) => {
        setPlayers(response.data);
      });
  }, [player]);

  //functions
  const addNewRound = (id) => {
    Axios.post(`http://localhost:5000/api/players/${id}`, {
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
      display: false,
    })
    console.log(id);
    console.log(round);
    setRound({
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
    });
    setSubmit(!submit);
    // triggerFetch();
  }

  const toggleDisplay = () => {
    setDisplay(!display);
  };

  const toggleSubmit = () => {
    setSubmit(!submit);
  };

  const selectPlayer = (id) => {
    players.filter((player) => {
      if (player.id === id) {
        setPlayer(player)
      }
    })
  }

  return (
    <div className="App">
      {display ? 
        <div>
          <PlayersDisplay players={players} selectPlayer={selectPlayer} /> 
          {player? <PlayerInfo 
            player={player} 
            addNewRound={addNewRound}
            submit={submit}
            toggleSubmit={toggleSubmit}
            round={round}
            setRound={setRound}
          /> : null}
          <AddNewPlayer 
            firstName = {firstName}
            setFirstName = {setFirstName}
            lastName = {lastName}
            setLastName = {setLastName}
          /> 
        </div> : 
        <article className='enter'>
          <h1>Welcome to the Royal Badger & Pit Society</h1>
        <button className='button enterButton' onClick={toggleDisplay}>{!display? "Enter" : null}
        </button>
        </article>}
    </div>
  );
}

export default App;
