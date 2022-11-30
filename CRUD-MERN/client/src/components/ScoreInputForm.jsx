import React from 'react';
import Input from './Input';
import InputScore from './InputScore';

const ScoreInputForm = ({
  addNewRound,
  player,
  submit,
  setRound,
  round
}) => {

  const clearRound = () => {
    setRound({
      eagleScore: 0,
      birdieScore: 0,
      parScore: 0,
      bogeyScore: 0,
      doubleBogeyScore: 0,
      tripleBogeyScore: 0,
      blobScore: 0,
      slopeRating: 120,
      courseRating: 71,
      courseStarRating: 3,
      course: '',
      datePlayed: ''
    })
  }

  const handleChange = (e) => {
    if (e.target.type === 'number') {
      setRound((prevState) => ({
        ...prevState,
        [e.target.name]: Number(e.target.value)}));
      } else {
      setRound((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value}))
    
      }
};

  
  const handleSubmit = (e) => {
    e.preventDefault();
    addNewRound(player.id);
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
                </div>
              </div>
            </div>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Submit</button>
            <button className="button button-two" onClick={() => clearRound()}>Clear</button>
          </form>
        </div> : null
      }
    </div >
  )
}

export default ScoreInputForm