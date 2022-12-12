import React from 'react';

const InputScore = ({label, value, placeholder, type, name, handleChange}) => {

    return (
        <div class="flex flex-col mt-1 w-32">
            <label class="text-black text-sm" for={label}>{label}</label>
            <input class="bg-gray-100 px-4 py-2 mt-1 w-32 h-8 rounded-md" className='input' 
                type={type} 
                placeholder={placeholder} 
                value={value}
                name={name} 
                onChange={handleChange}
                ></input>
        </div>
    )
}

export default InputScore;