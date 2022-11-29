import './PreviousRounds.css';
import React, { useState } from 'react';

const PreviousRounds = ({player, deleteRound}) => {

  const [roundIds, setRoundIds] = useState([]);

  const addRoundtoList = (clickedRoundId) => {
    setRoundIds(current => [...current, clickedRoundId]);
    console.log(roundIds);
  };

  const removeRoundFromList = (clickedRoundId) => {
    const updatedRounds = roundIds.filter(roundId => roundId !== clickedRoundId);
    setRoundIds(updatedRounds);
    console.log(updatedRounds);
  };

  const oneHour = 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

    return (
        <section className='cards-list'>
              {player.roundsPlayed
                .map((round, index, array) => 
                  <article className='card' key={round.id}>
                    <p>Round {index + 1} of {array.length}: </p> 
                    <h4 className='score'>{
                    round.eagles*5+
                    round.birdies*4+
                    round.pars*3+
                    round.bogeys*2+
                    round.doubleBogeys*1
                    } </h4>
                    {roundIds.includes(round.id)?
                    // create new componenet for this?
                      <div>
                        {round.course? <p>Course: {round.course}</p> : null}
                        {round.date? <p>Date: {round.date}</p> : null}
                        {round.slopeRating? <p>Slope Rating: {round.slopeRating}</p> : null}
                        {round.birdies? <p>Birdies: {round.birdies}</p> : null}
                        {round.pars? <p>Pars: {round.pars}</p> : null}
                        {round.bogeys? <p>Bogeys: {round.bogeys}</p> : null}
                        {round.doubleBogeys? <p>Double Bogeys: {round.doubleBogeys}</p> : null}
                        <button className='button' onClick={() => removeRoundFromList(round.id)}>See less</button>
                      </div> : 
                      <div>
                      <button className='button' onClick={() => addRoundtoList(round.id)}>See more</button>
                      {Date.now() - round.id < oneHour? 
                        <button className='button red' onClick={() => deleteRound(player.id, round.id)}>Delete Round</button>:
                        null
                      }
                      </div>
                    }
                    
                  </article>)}
        </section>
    )
}

export default PreviousRounds