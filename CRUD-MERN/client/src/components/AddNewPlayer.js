import Axios from 'axios';

const AddNewPlayer = ({firstName, lastName, setFirstName, setLastName}) => {
    
    const addPlayer = () => {
        Axios.post('http://localhost:5000/api/newplayer', {
          firstName: firstName,
          lastName: lastName,
        })
      }

    return(
        <div>
            <h1>sign up</h1>
            <input required className='nameInput' type='text' onChange={(e) => {setFirstName(e.target.value.toLowerCase())}} />
            <input required className='nameInput' type='text' onChange={(e) => {setLastName(e.target.value.toLowerCase())}} />
            <button className='button' onClick={addPlayer}>Add User</button>

        </div>)
}

export default AddNewPlayer