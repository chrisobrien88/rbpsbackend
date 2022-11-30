
const PlayersDisplay = ({ players, triggerFetch, setTriggerFetch, setPlayer }) => {
    return (
        <ul className='list'>
            {players.map(player => 
            // replace li with card component
            <li
                className='list-item card' 
                key={player.id} 
                onClick={() => {setPlayer(player); setTriggerFetch(!triggerFetch)}}> 
                {player.firstName} {player.lastName}
            </li>)}
        </ul>
    )
};

export default PlayersDisplay