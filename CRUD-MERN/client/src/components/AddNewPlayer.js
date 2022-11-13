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
            {firstName? firstName === 'nick'?
                <h1>F*ck off {firstName}</h1>:
                <h1>Welcome, {firstName}, to the Royal Badger and Pit Society</h1>:
                null
            }
        </div>)
}

export default AddNewPlayer