import { useEffect, useState } from 'react';

const Stats = ({ player, playerRounds }) => {

    const [bestRounds, setBestRounds] = useState('');
    const [playerHandicap, setPlayerHandicap] = useState(18);

    useEffect(() => {
        if (playerRounds) {
            const topFortyPercent = Math.floor(playerRounds.length * 0.4);
            setBestRounds(playerRounds
                .sort((a, b) => b.eighteenHandicapStablefordScore - a.eighteenHandicapStablefordScore)
                .slice(0, topFortyPercent)
                .map(round => round.eighteenHandicapStablefordScore));
        }
    }, [playerRounds]);

    // calculate handicap
    useEffect(() => {
        if (bestRounds) {
            // take each round and return how many points over par it was

            const overPar = bestRounds.map(roundScore => {
                return 18 + 36 - roundScore});
            const handicap = overPar.reduce((a, b) => a + b, 0) / overPar.length;
            setPlayerHandicap(handicap);
        } else {
            console.log('not enough rounds');
        } 
    }, [bestRounds]);

    

    return (
        <div>
            <h3>Stats</h3>
            <div className="stats">
                <div className="stat">
                    <h4>Rounds Played</h4>
                    <p>{playerRounds.length}</p>
                    <h4>Best Rounds</h4>
                    {console.log(bestRounds, 'best rounds', playerHandicap)}
                    {/* {bestRounds.map(round => 
                        <p>{round}</p>)} */}
                    <h4>Handicap</h4>
                    <p>{playerHandicap}</p>

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