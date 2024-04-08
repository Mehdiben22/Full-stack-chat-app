import React from 'react'

//we have functions so we need to call them like that ({})
const GenderCheckbox = ({onCheckboxChange,selectedGender}) => {
  return (
    <div className='flex'>
        <div className='form-control'>
            <label className={`label gap-2 cursor-pointer ${selectedGender === "male" ? "selected" : ""}`}>
               <span className='label-text'>Male</span>
               <input type='checkbox' className='checkbox border-slate-900'
               checked ={selectedGender === "male"}
               //this function expect a props called gender so when we onchange the function we need to past the gender
               onChange={() => onCheckboxChange("male")}
               />
            </label> 
        </div>
        <div className='form-control'>
        <label className= {`label gap-2 cursor-pointer ${selectedGender === "female" ?  "selected" : ""}`}>
               <span className='label-text'>Female</span>
               <input type='checkbox' className='checkbox border-slate-900'
               checked={selectedGender === "female"}
               onChange={() => onCheckboxChange("female")}
               />
            </label> 
        </div>
      
    </div>
  )
}

export default GenderCheckbox
