import React from 'react';

const Input = ({label, value, placeholder, type, name, handleChange}) => {


    return (
        <div class="flex flex-col mt-1 w-32">
            <label class="text-black text-sm" for={label}>{label}</label>
            <input class="bg-gray-100 px-4 py-2 mt-1 w-32 h-8 rounded-md" className='input' 
                required
                type={type} 
                placeholder={placeholder} 
                value={value} 
                onChange={handleChange} 
                name={name}
                ></input>
        </div>
    )
}

export default Input;