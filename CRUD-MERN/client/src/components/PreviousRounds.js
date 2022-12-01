import './PreviousRounds.css';
import React, { useState } from 'react';

const PreviousRounds = ({player, deleteRound, playerRounds, setPlayerRounds}) => {

  const [roundIds, setRoundIds] = useState([]);

  const addRoundtoList = (clickedRoundId) => {
    setRoundIds(current => [...current, clickedRoundId]);
  };

  const removeRoundFromList = (clickedRoundId) => {
    const updatedRounds = roundIds.filter(roundId => roundId !== clickedRoundId);
    setRoundIds(updatedRounds);
  };

  const oneHour = 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

    return (
        <section className='cards-list'>
            {playerRounds.map((round, index, array) => 
              <article onClick={() => console.log(round, round.id, player.id, 'hellosies')} className='card' key={round.id}>
                <p>Round {index + 1} of {array.length}: </p> 
                <h4 className='score'>{
                  round.eighteenHandicapStablefordScore
                  // round.eagles*5+
                  // round.birdies*4+
                  // round.pars*3+
                  // round.bogeys*2+
                  // round.doubleBogeys*1
                } 
                </h4>
                {roundIds.includes(round.id)?
                // create new componenet for this?
                  <div>
                    {round.course? <p>Course: {round.course}</p> : null}
                    {round.datePlayed? <p>Date: {round.datePlayed}</p> : null}
                    {round.slopeRating? <p>Slope Rating: {round.slopeRating}</p> : null}
                    {round.courseRating? <p>Course Rating: {round.courseRating}</p> : null}
                    {round.courseStarRating? <p>Course Star Rating: {round.courseStarRating}</p> : null}
                    {round.eagles? <p>Eagles: {round.eagles}</p> : null}
                    {round.birdies? <p>Birdies: {round.birdies}</p> : null}
                    {round.pars? <p>Pars: {round.pars}</p> : null}
                    {round.bogeys? <p>Bogeys: {round.bogeys}</p> : null}
                    {round.doubleBogeys? <p>Double Bogeys: {round.doubleBogeys}</p> : null}
                    {round.tripleBogeys? <p>Triple Bogeys: {round.tripleBogeys}</p> : null}
                    {round.blobs? <p>Blobbed: {round.blobs}</p> : null}

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
                
              </article>
            )}
                    

        </section>
    )
}

export default PreviousRounds