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

// Set score
  // const [score, setScore] = useState();
  const [eagleScore, setEagleScore] = useState();
  const [birdieScore, setBirdieScore] = useState();
  const [parScore, setParScore] = useState();
  const [bogeyScore, setBogeyScore] = useState();
  const [doubleBogeyScore, setDoubleBogeyScore] = useState();
  const [tripleBogeyScore, setTripleBogeyScore] = useState();
  const [blobScore, setBlobScore] = useState();

  const [slopeRating, setSlopeRating] = useState();
  const [courseRating, setCourseRating] = useState();
  const [course, setCourse] = useState('3');
  const [courseStarRating, setCourseStarRating] = useState();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [display, setDisplay] = useState(false);
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    Axios.get('http://localhost:5000/api/players').then((response) => {
        setPlayers(response.data);
      });

    if (player) {
      setPlayerRoundsCount(player.roundsPlayed.length)
      setPlayerRounds(player.roundsPlayed);
    }
  }, [player]);

  // const addNewScore = async (id) => {
  //   if(score === 0){
  //     throw new Error('Please enter a valid score');
  //   }
  //   const newScore = await Axios.get(`http://localhost:5000/api/players/${id}/${score}`);
  //   setPlayerRounds(newScore.data.roundsPlayed);
  // }

  const addNewScore = (id) => {
    Axios.post(`http://localhost:5000/api/players/${id}`, {
      id: id,
      eagles: eagleScore,
      birdies: birdieScore,
      pars: parScore,
      bogeys: bogeyScore,
      doubleBogeys: doubleBogeyScore,
      tripleBogeys: tripleBogeyScore,
      blobs: blobScore,
      slopeRating: slopeRating,
      courseRating: courseRating,
      courseStarRating: courseStarRating,
      course: course,
    })
 
    // eagles: req.body.eagles,
    // birdies: req.body.birdies,
    // pars: req.body.pars,
    // bogeys: req.body.bogeys,
    // doubleBogeys: req.body.doubleBogeys,
    // tripleBogeys: req.body.tripleBogeys,
    // blobs: req.body.blobs,
    // slopeRating: req.body.slopeRating,
    // courseRating: req.body.courseRating,
    // course: req.body.course,
    // courseStarRating: req.body.courseStarRating,

  }
  useEffect(() => {
    // if (player) {
    // setPlayerRoundsCount(player.roundsPlayed.length)
    // setPlayerRounds(player.roundsPlayed);
    // }
  }, [player]);

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
        <h4>Rounds played: </h4>
        <h4>Scores: 
          {player.roundsPlayed.map(round => round.pars*3+round.bogeys*2)}
          {/* <ul className='list'>{playerRounds
            .map((mapRounds, index) =>
            <li className="list-item card widthSmall gold" key={index}>{mapRounds}</li>)}
          </ul> */}
        </h4>
        
        <button onClick={toggleSubmit}>Submit a new Score</button>

        {submit? 
          <div>
            {/* <input className='scoreInput' type='number' onChange={(e) => {setScore(e.target.value)}} /> */}
            <input className='scoreInput' type='number' placeholder="Eagles" onChange={(e) => {setEagleScore(e.target.value)}} />
            <input className='scoreInput' type='number' placeholder="Birdies" onChange={(e) => {setBirdieScore(e.target.value)}} />
            <input className='scoreInput' type='number' placeholder="Pars" onChange={(e) => {setParScore(e.target.value)}} />
            <input className='scoreInput' type='number' placeholder="Bogeys" onChange={(e) => {setBogeyScore(e.target.value)}} />
            <input className='scoreInput' type='number' placeholder="Double Bogeys" onChange={(e) => {setDoubleBogeyScore(e.target.value)}} />
            <input className='scoreInput' type='number' placeholder="Triple Bogeys" onChange={(e) => {setTripleBogeyScore(e.target.value)}} />
            <input className='scoreInput' type='number' placeholder="Blobs" onChange={(e) => {setBlobScore(e.target.value)}} />
            <input className='scoreInput' type='number' placeholder="Slope Rating" onChange={(e) => {setSlopeRating(e.target.value)}} />
            <input className='scoreInput' type='number' placeholder="Course Rating" onChange={(e) => {setCourseRating(e.target.value)}} />
            <select className='scoreInput' onChange={(e) => {setCourseStarRating(e.target.value)}}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
            <input className='scoreInput' type='text' placeholder="Course Played" onChange={(e) => {setCourse(e.target.value)}} />


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
