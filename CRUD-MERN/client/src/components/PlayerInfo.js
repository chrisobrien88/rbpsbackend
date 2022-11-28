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
            <h3>{player.firstName} {player.lastName}</h3>
            <button className="button" onClick={toggleSubmit}>Submit a new Score</button>
              <ScoreInputForm 
                addNewRound={addNewRound}
                player={player}
                submit={submit}
                setRound={setRound}
                round={round}
                />
            <PreviousRounds player={player}/>
        </div>
    )
}

export default PlayerInfo;