
const Stats = ({ player, playerRounds }) => {

    return (
        <div>
            <h3>Stats</h3>
            <div className="stats">
                <div className="stat">
                    <h4>Rounds Played</h4>
                    <p>{playerRounds.length}</p>
                </div>
                <div className="stat">
                    <h4>Handicap rounds</h4>
                    <p>{playerRounds.length > 0 ?  Math.round(playerRounds.length*0.4) : 0}</p>  
                </div>
                <div className="stat">
                    <h4>Average Round</h4>
                    <p>{playerRounds.length > 0 ? playerRounds.reduce((a, b) => a + b, 0) / playerRounds.length : 0}</p>
                </div>
            </div>
        </div>

    )
}

export default Stats;