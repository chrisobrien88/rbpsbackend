import PreviousRounds from './PreviousRounds';
import Stats from './Stats';

const PlayerInfo =({
    deleteRound,
    player,
    playerRounds,
    setPlayerRounds,
}) => {

    return (
        <div>
            <Stats player={player} playerRounds={playerRounds}/>
            <PreviousRounds 
                player={player}
                playerRounds={playerRounds}
                setPlayerRounds={setPlayerRounds}
                deleteRound={deleteRound}/>
        </div>
    )
}

export default PlayerInfo;