import './PreviousRounds.css';
import React, { useState } from 'react';

const PreviousRounds = ({player}) => {

  const [roundIds, setRoundIds] = useState([]);

  const addRoundtoList = (clickedRoundId) => {
    setRoundIds(current => [...current, clickedRoundId]);
    console.log(roundIds);
  };

  const removeRoundFromList = (clickedRoundId) => {
    const newRounds = roundIds.filter(roundId => roundId !== clickedRoundId);
    setRoundIds(newRounds);
    console.log(newRounds);
  };
  
  
 

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
                      
                      </div>
                    }
                    
                  </article>)}
        </section>
    )
}

export default PreviousRounds