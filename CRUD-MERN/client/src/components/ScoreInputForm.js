import React from 'react';
import Input from './Input';

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
    })
  }

  return (
    <div>
      {submit ?
        <div class="bg-white rounded-lg p-4 max-w-xl">

          <div class="mb-4">
            <h4>Round Info</h4>
            <p class="mb-2 text-gray-800">Where did you play?</p>
            <div class="flex flex-wrap gap-3">
              <Input label="Course Played" placeholder="Course Played" type="text" handleChange={(e) => { setRound({ ...round, course: e.target.value }) }} />
              <Input label="Date Played" placeholder="dd/mm/yyyy" type="date" handleChange={(e) => { setRound({ ...round, course: e.target.value }) }} />
              <Input label="Course Rating" placeholder="Course Rating" type="number" handleChange={(e) => { setRound({ ...round, courseRating: e.target.value }) }} />
              
              <div class="flex flex-col mt-1 w-32">
              <label class="text-black text-sm" for="">Star Rating</label>
              <select class="bg-gray-100 px-4 py-2 mt-1 w-32 rounded-md" type="number" onChange={(e) => { setRound({ ...round, courseStarRating: e.target.value }) }} >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
              </div>

              <Input label="Slope Rating" placeholder="Slope Rating" type="number" handleChange={(e) => { setRound({ ...round, slopeRating: e.target.value }) }} />
            </div>
          </div>

          <div class="mb-4">
            <h4>Score</h4>
            <p class="mb-2 text-gray-800">How did you play? Input your score and make sure all your holes are acccounted for!</p>

            <div class="flex flex-wrap gap-3">
              <Input label="Eagles" placeholder="0" type="number" value={round.eagleScore} handleChange={(e) => { setRound({ ...round, eagleScore: e.target.value }) }} />
              <Input label="Birdies" placeholder="0" type="number" value={round.birdieScore} handleChange={(e) => { setRound({ ...round, birdieScore: e.target.value }) }} />
              <Input label="Pars" placeholder="0" type="number" value={round.parScore} handleChange={(e) => { setRound({ ...round, parScore: e.target.value }) }} />
              <Input label="Bogeys" placeholder="0" type="number" value={round.bogeyScore} handleChange={(e) => { setRound({ ...round, bogeyScore: e.target.value }) }} />
              <Input label="Db. Bogeys" placeholder="0" type="number" value={round.doubleBogeyScore} handleChange={(e) => { setRound({ ...round, doubleBogeyScore: e.target.value }) }} />
              <Input label="Tr. Bogeys" placeholder="0" type="number" value={round.tripleBogeyScore} handleChange={(e) => { setRound({ ...round, tripleBogeyScore: e.target.value }) }} />
              <Input label="Blobs" placeholder="0" type="number" value={round.blobScore} handleChange={(e) => { setRound({ ...round, blobScore: e.target.value }) }} />
            </div>
          </div>

          <button className="button" onClick={() => clearRound()}>Clear</button>
          <button className="button" onClick={() => addNewRound(player.id)}>Submit</button>


        </div> : null
      }
    </div >
  )
}

export default ScoreInputForm