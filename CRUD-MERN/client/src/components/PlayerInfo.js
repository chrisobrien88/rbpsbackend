import ScoreInputForm from './ScoreInputForm';

const PlayerInfo =({
    addNewRound,
    player,
    submit,
    toggleSubmit,
    setRound,
    round,
}) => {

    return (
        <div>
        {player? 
            <div>
            <h3>{player.firstName} {player.lastName}</h3>
            <h4>Rounds played: </h4>
            <h4>Scores: 
             
              {player.roundsPlayed
                .map((round, index, array) => 
                  <li key={round.id}>{index + 1} of {array.length}: {
                    round.eagles*5+
                    round.birdies*4+
                    round.pars*3+
                    round.bogeys*2+
                    round.doubleBogeys*1
                    } </li>)}
              {/* <ul className='list'>{playerRounds
                .map((mapRounds, index) =>
                <li className="list-item card widthSmall gold" key={index}>{mapRounds}</li>)}
              </ul> */}
            </h4>
            
            <button className="button" onClick={toggleSubmit}>Submit a new Score</button>
              <ScoreInputForm 
                addNewRound={addNewRound}
                player={player}
                submit={submit}
                setRound={setRound}
                round={round}
                />
            
            </div>: 
            "Select a player to view their stats or submit a score"
        }
        </div>
    )
}

export default PlayerInfo;