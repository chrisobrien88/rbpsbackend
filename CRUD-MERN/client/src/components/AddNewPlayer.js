import Axios from 'axios';

const AddNewPlayer = ({firstName, lastName, setFirstName, setLastName}) => {
    
    const addPlayer = () => {
        Axios.post('http://localhost:5000/api/newplayer', {
          firstName: firstName,
          lastName: lastName,
        })
      }

    const handleSubmit = (e) => {
        if (firstName && lastName) {
            addPlayer();
            setFirstName('');
            setLastName('');
        }
    }

    const handleChange = (e) => {
        if (e.target.name === 'firstName') {
      setFirstName (e.target.value.trim().toLowerCase());
        } else {
      setLastName (e.target.value.trim().toLowerCase())};
    }

    return(
        <div>
            <h1>sign up</h1>
            <form onSubmit={handleSubmit}>
              <input required className='nameInput' name="firstName" type='text' onChange={handleChange} />
              <input required className='nameInput' name="lastName" type='text' onChange={handleChange} />
              <button className='button' type='submit'>Add User</button>
            </form>
        </div>)
}

export default AddNewPlayer