import AddNewPlayer from "./AddNewPlayer";

const Enter = ({ toggleDisplay, firstName, lastName, setFirstName, setLastName }) => {
    return (
        <div>
        <section>
            <h1>Welcome! </h1>
            <button className='button enterButton' onClick={toggleDisplay}>
              Enter
            </button>
        </section>
        <p>OR</p>
        <AddNewPlayer 
              firstName = {firstName}
              setFirstName = {setFirstName}
              lastName = {lastName}
              setLastName = {setLastName}
          /> 
        </div>
    )};

export default Enter;