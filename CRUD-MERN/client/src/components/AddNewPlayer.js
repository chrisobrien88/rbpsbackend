import Axios from 'axios';
import React, { useState, useRef } from 'react';

const AddNewPlayer = ({firstName, lastName, setFirstName, setLastName}) => {
    
    const addPlayer = () => {
        Axios.post('http://localhost:5000/api/newplayer', {
          firstName: firstName,
          lastName: lastName,
        })
     
      }

    return(
        <div>
            <h1>Create new user</h1>
            <input className='nameInput' type='text' onChange={(e) => {setFirstName(e.target.value)}} />
            <input className='nameInput' type='text' onChange={(e) => {setLastName(e.target.value)}} />
            <button onClick={addPlayer}>Add</button>
        </div>)
}

export default AddNewPlayer