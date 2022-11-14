import './App.css';
import Axios from 'axios';
import React, { useState, useEffect } from 'react';

import AddNewPlayer from './components/AddNewPlayer';
import PlayersDisplay from './components/PlayersDisplay';

function App() {

  const [players, setPlayers] = useState([]);
  const [player, setPlayer] = useState('');
  const [playerRounds, setPlayerRounds] = useState([]);
  const [playerRoundsCount, setPlayerRoundsCount] = useState([]);
  const [score, setScore] = useState();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [display, setDisplay] = useState(false);
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    Axios.get('http://localhost:5000/api/players').then((response) => {
        setPlayers(response.data);
      });
  }, []);

  const addNewScore = async (id) => {
    if(score === 0){
      throw new Error('Please enter a valid score');
    }
    const newScore = await Axios.get(`http://localhost:5000/api/players/${id}/${score}`);
    setPlayerRounds(newScore.data.roundsPlayed);
  }

  useEffect(() => {
    if (player) {
    setPlayerRoundsCount(player.roundsPlayed.length)
    setPlayerRounds(player.roundsPlayed);
    }
  }, [player, playerRoundsCount]);

  const toggleDisplayPlayers = () => {
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
      <button onClick={toggleDisplayPlayers}>{display? "Hide Players" : "Show All Players"}</button>
      {display ? 
        <PlayersDisplay players={players} selectPlayer={selectPlayer} /> : null}
      {player? 
        <div>
        <h3>{player.firstName} {player.lastName}</h3>
        <h4>Rounds played: {playerRoundsCount}</h4>
        <h4>Scores: 
          <ul className='list'>{playerRounds
            .map((score, index) =>
            <li className="list-item card widthSmall gold" key={index}>{score}</li>)}
          </ul>
        </h4>
        
        <button onClick={toggleSubmit}>Submit a new Score</button>

        {submit? 
          <div>
            <input className='scoreInput' type='number' onChange={(e) => {setScore(e.target.value)}} />
            <button onClick={() => addNewScore(player.id)}>Submit
            </button>
          </div> : null}
        
        </div>: 
        "Select a player to view their stats or submit a score"
      }
      
      <AddNewPlayer 
        firstName = {firstName}
        setFirstName = {setFirstName}
        lastName = {lastName}
        setLastName = {setLastName}
      />
    </div>
  );
}

export default App;
