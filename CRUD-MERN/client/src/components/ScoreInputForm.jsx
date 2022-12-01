import React from 'react';
import Input from './Input';
import InputScore from './InputScore';
import { useState } from 'react';
import { useEffect } from 'react';

const ScoreInputForm = ({
  addNewRound,
  player,
  submit,
  setRound,
  round
}) => {

  const [readyToSubmit, setReadyToSubmit] = useState(false);
  const [holesCount, setHolesCount] = useState(0);
  const [roundScore, setRoundScore] = useState(0);

  // import initial state from parent component to clearround() function


  const handleChange = (e) => {
    
    if(e.target.type === 'checkbox') {
      setReadyToSubmit(e.target.checked);}

    if (e.target.type === 'number') {
      setRound((prevState) => ({
        ...prevState,
        [e.target.name]: Number(e.target.value)}));
      } else {
      setRound((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value}))
      }

      setRound((prevState) => ({
        ...prevState,
        grossStablefordScore: roundScore.grossStablefordScore,
        eighteenHandicapStablefordScore: roundScore.eighteenHandicapStablefordScore,
        thirtySixHandicapStablefordScore: roundScore.thirtySixHandicapStablefordScore,
      }));  
    };

  useEffect(() => {
    setHolesCount(
      Number(round.eagleScore) + 
      Number(round.birdieScore) + 
      Number(round.parScore) + 
      Number(round.bogeyScore) + 
      Number(round.doubleBogeyScore) + 
      Number(round.tripleBogeyScore) +
      Number(round.blobScore)
      );

    setRoundScore({
      grossStablefordScore:   
        Number(round.eagleScore) * 4 +
        Number(round.birdieScore) * 3 +
        Number(round.parScore) * 2 +
        Number(round.bogeyScore) * 1
    });
    
    setRoundScore((prevState) => ({
      ...prevState,
      eighteenHandicapStablefordScore:
        Number(round.eagleScore) * 5 +
        Number(round.birdieScore) * 4 +
        Number(round.parScore) * 3 +
        Number(round.bogeyScore) * 2 +
        Number(round.doubleBogeyScore) * 1
      }));
    
    setRoundScore((prevState) => ({
      ...prevState,
      thirtySixHandicapStablefordScore:
        Number(round.eagleScore) * 6 +
        Number(round.birdieScore) * 5 +
        Number(round.parScore) * 4 +
        Number(round.bogeyScore) * 3 +
        Number(round.doubleBogeyScore) * 2 +
        Number(round.tripleBogeyScore) * 1
      }));
        
  }, [round])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (holesCount !== 18) {
      // chagne this to a modal
      alert('You must enter a score for all 18 holes');
    } else {
      addNewRound(player.id);
      setReadyToSubmit(false);
    }
  }

  return (
    <div>
      {submit ?
        <div class="bg-white rounded-lg p-4 max-w-xl">
          <h4>Round Info</h4>
          <p class="mb-2 text-gray-800">Where did you play?</p> 
          <form onSubmit={handleSubmit}>
            <div class="flex flex-col">
              <div class="flex flex-row">
                <Input 
                  value={round.courseName}
                  label="Course Played" 
                  placeholder="Thurlestone" 
                  type="text" 
                  name="course" 
                  handleChange={handleChange} />
                <Input
                  value={round.datePlayed}
                  label="Date Played" 
                  placeholder="dd/mm/yyyy"
                  type="date" 
                  name="datePlayed" 
                  handleChange={handleChange} />
                <Input
                  value={round.courseRating}
                  label="Course Rating" 
                  placeholder="71"
                  type="number" 
                  name="courseRating" 
                  handleChange={handleChange} />
                <Input
                  value={round.slopeRating}
                  label="Slope Rating" 
                  placeholder="125"
                  type="number" 
                  name="slopeRating" 
                  handleChange={handleChange} />
                Your Course Handicap: take handicap from player e.g. player.handicap * slopeRating / 113 + course rating - par

                  <select
                    value={round.courseStarRating}
                    label="Course Star Rating"
                    placeholder="3"
                    type="number"
                    name="courseStarRating"
                    onChange={handleChange} >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
              </div>
              <div class="mb-4">
                <h4>Score</h4>
                <p class="mb-2 text-gray-800">How did you play? Input your score and make sure all your holes are acccounted for!</p>

                <div class="flex flex-wrap gap-3">
                <InputScore
                  value={round.eagles}
                  label="Eagles" 
                  placeholder="0"
                  type="number" 
                  name="eagleScore" 
                  handleChange={handleChange}/>
                  <InputScore
                  value={round.birdies}
                  label="Birdies" 
                  placeholder="0"
                  type="number" 
                  name="birdieScore" 
                  handleChange={handleChange}/>
                  <InputScore
                  value={round.pars}
                  label="Pars" 
                  placeholder="0"
                  type="number" 
                  name="parScore" 
                  handleChange={handleChange}/>
                  <InputScore
                  value={round.bogeys}
                  label="Bogeys" 
                  placeholder="0"
                  type="number" 
                  name="bogeyScore" 
                  handleChange={handleChange}/>
                  <InputScore
                  value={round.doubleBogeys}
                  label="Double Bogeys" 
                  placeholder="0"
                  type="number" 
                  name="doubleBogeyScore" 
                  handleChange={handleChange}/>
                  <InputScore
                  value={round.tripleBogeys}
                  label="Triple Bogeys" 
                  placeholder="0"
                  type="number" 
                  name="tripleBogeyScore" 
                  handleChange={handleChange}/>
                  <InputScore
                  value={round.blobs}
                  label="Blobs" 
                  placeholder="0"
                  type="number" 
                  name="blobScore" 
                  handleChange={handleChange}/>
                </div>
                <p>number of holes inputted: {holesCount}</p>
                <p> Scratch Score: {roundScore.grossStablefordScore} </p>
                <p> 18 handicap Score: {roundScore.eighteenHandicapStablefordScore} </p>
              </div>
            </div>
            {holesCount === 18 ? <label>
              <input  type="checkbox" name='checkbox' checked={readyToSubmit} onChange={handleChange} /> Ready to submit?
            </label> : null}
            
            {readyToSubmit ? 
              <button 
                class=" button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                type="submit">Submit
              </button>  : 
              <button 
                class=" button grey " 
                type="submit" disabled>Submit
              </button>}
              
          </form>
        </div> : null
      }
    </div >
  )
}

export default ScoreInputForm