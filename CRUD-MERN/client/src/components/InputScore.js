import React from 'react';

const Input = ({label, value, placeholder, type, addOne, minusOne, children}) => {


    return (
        <div class="flex flex-col mt-1 w-32">
            <button className='button plus-minus' onClick={addOne}>+</button>
            <label class="text-black text-sm" for={label}>{label}</label>
            <input class="bg-gray-100 px-4 py-2 mt-1 w-32 h-8 rounded-md" className='input' 
                type={type} placeholder={placeholder} 
                value={value} 
                ></input>
             <button className='button plus-minus minus' onClick={minusOne}>-</button>
        </div>
    )
}

export default Input;