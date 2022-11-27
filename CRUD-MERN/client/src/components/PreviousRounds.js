import './PreviousRounds.css';

const PreviousRounds = ({player}) => {

    return (
        <section className='cards-list'>
            <h4>Scores:</h4> 
              {player.roundsPlayed
                .map((round, index, array) => 
                  <article className='card' key={round.id}>
                    <p>Round {index + 1} of {array.length}: </p> 
                    <h4 className='score'>{
                    round.eagles*5+
                    round.birdies*4+
                    round.pars*3+
                    round.bogeys*2+
                    round.doubleBogeys*1
                    } </h4>
                    Course: {round.course} 
                    Date: {round.date} 
                  </article>)}
        </section>
    )
}

export default PreviousRounds