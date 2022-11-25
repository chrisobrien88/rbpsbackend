import React from 'react';

const Input = ({label, value, handleChange}) => {
    return (
        <div className="input-wrapper">
            <label for={label}>{label}</label>
            <input className='input' type='number' placeholder='0' value={value} onChange={handleChange} />
        </div>
    )
}

export default Input;