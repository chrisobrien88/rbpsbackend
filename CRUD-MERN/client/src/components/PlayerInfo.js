import PreviousRounds from './PreviousRounds';

const PlayerInfo =({
    deleteRound,
    player,
    playerRounds,
    setPlayerRounds,
}) => {

    return (
            <PreviousRounds 
                player={player}
                playerRounds={playerRounds}
                setPlayerRounds={setPlayerRounds}
                deleteRound={deleteRound}/>
    )
}

export default PlayerInfo;