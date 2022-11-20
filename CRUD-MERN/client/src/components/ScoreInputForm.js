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
        <div>
          <h3>Round Info</h3>
          <input
            className='scoreInput'
            type='text'
            placeholder="Course Played"
            onChange={(e) => { setRound({ ...round, course: e.target.value }) }}
          />
          <input className='' type='date' placeholder='dd/mm/yyyy' />
          <input className='scoreInput' type='number' placeholder="Course Rating" onChange={(e) => { setRound({ ...round, courseRating: e.target.value }) }} />
          <select className='scoreInput' onChange={(e) => { setRound({ ...round, courseStarRating: e.target.value }) }}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>

          <input className='scoreInput' type='number' placeholder="Slope Rating" onChange={(e) => { setRound({ ...round, slopeRating: e.target.value }) }} />


          <h3>Score</h3>
          <p>How did you play? Input your score and make sure all your holes are acccounted for!</p>

          <Input label="Eagles" value={round.eagleScore} handleChange={(e) => { setRound({ ...round, eagleScore: e.target.value }) }} />
          <Input label="Birdies" value={round.birdieScore} handleChange={(e) => { setRound({ ...round, birdieScore: e.target.value }) }} />
          <Input label="Pars" value={round.parScore} handleChange={(e) => { setRound({ ...round, parScore: e.target.value }) }} />
          <Input label="Bogeys" value={round.bogeyScore} handleChange={(e) => { setRound({ ...round, bogeyScore: e.target.value }) }} />
          <Input label="Double Bogeys" value={round.doubleBogeyScore} handleChange={(e) => { setRound({ ...round, doubleBogeyScore: e.target.value }) }} />
          <Input label="Triple Bogeys" value={round.tripleBogeyScore} handleChange={(e) => { setRound({ ...round, tripleBogeyScore: e.target.value }) }} />
          <Input label="Blobs" value={round.blobScore} handleChange={(e) => { setRound({ ...round, blobScore: e.target.value }) }} />

          <button className="button" onClick={() => clearRound()}>Clear</button>
          <button className="button" onClick={() => addNewRound(player.id)}>Submit</button>

        </div> : null}
    </div>
  )
}

export default ScoreInputForm