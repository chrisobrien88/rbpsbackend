
const PlayersDisplay = ({ players, selectPlayer }) => {
    return (
        <ul className='list'>
            {players.map(player => 
            <li
                className='list-item card' 
                key={player.id} 
                onClick={() => selectPlayer(player.id)}> 
                {player.firstName} {player.lastName}
            </li>)}
        </ul>
    )
};

export default PlayersDisplay