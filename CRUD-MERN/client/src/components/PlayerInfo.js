import ScoreInputForm from './ScoreInputForm';
import PreviousRounds from './PreviousRounds';

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
            <button className="button" onClick={toggleSubmit}>Submit a new Score</button>
              <ScoreInputForm 
                addNewRound={addNewRound}
                player={player}
                submit={submit}
                setRound={setRound}
                round={round}
                />
            <h4>Rounds played: </h4>
            <PreviousRounds player={player}/>
            
            
            </div>: 
            "Select a player to view their stats or submit a score"
        }
        </div>
    )
}

export default PlayerInfo;