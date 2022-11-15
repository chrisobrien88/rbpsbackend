

const ScoreInputForm = ({
    addNewRound,
    player,
    submit,
    setRound,
    round
}) => {

    return(
        <div>
    {submit? 
        <div>
          <input className='scoreInput' type='number' placeholder="Eagles" onChange={(e) => {setRound({...round, eagleScore: e.target.value})}} />
          <input className='scoreInput' type='number' placeholder="Birdies" onChange={(e) => {setRound({...round, birdieScore: e.target.value})}} />
          <input className='scoreInput' type='number' placeholder="Pars" onChange={(e) => {setRound({...round, parScore: e.target.value})}} />
          <input className='scoreInput' type='number' placeholder="Bogeys" onChange={(e) => {setRound({...round, bogeyScore: e.target.value})}} />
          <input className='scoreInput' type='number' placeholder="Double Bogeys" onChange={(e) => {setRound({...round, doubleBogeyScore: e.target.value})}} />
          <input className='scoreInput' type='number' placeholder="Triple Bogeys" onChange={(e) => {setRound({...round, tripleBogeyScore: e.target.value})}} />
          <input className='scoreInput' type='number' placeholder="Blobs" onChange={(e) => {setRound({...round, blobScore: e.target.value})}} />
          <input className='scoreInput' type='number' placeholder="Slope Rating" onChange={(e) => {setRound({...round, slopeRating: e.target.value})}} />
          <input className='scoreInput' type='number' placeholder="Course Rating" onChange={(e) => {setRound({...round, courseRating: e.target.value})}} />
          <select className='scoreInput' onChange={(e) => {setRound({...round, courseStarRating: e.target.value})}}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
          <input 
            className='scoreInput' 
            type='text' 
            placeholder="Course Played" 
            onChange={(e) => {setRound({...round, course: e.target.value})}}
            />
          <button className="button"onClick={() => addNewRound(player.id)}>Submit
          </button>
        </div> : null}
        </div>
    )
}

export default ScoreInputForm