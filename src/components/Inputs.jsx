import React, { useState } from 'react'
import {BiSearch,BiCurrentLocation} from 'react-icons/bi';
const Inputs = ({setQuery,setUnits}) => {
  const [city,setCity]=useState('');
  
  const handleSearchCity=()=>{
    if(city!=''){
      setQuery({q:city})
    }
  }

  const handleLocation=()=>{
   if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition((position)=>{
      const {latitude,longitude}=position.coords;
      setQuery({lat:latitude,lon:longitude});
    })
   }
  }
  return (
    <div className='flex flex-row justify-center my-4'>
      <div className='flex flex-row w-3/4 items-center justify-center space-x-4'>
        <input
        type='text'
        placeholder='Search by city'
        value={city}
        onChange={(e)=>{e.preventDefault(); setCity(e.target.value)}}
        className='text-gray-500 text-xl font-light p-2 w-full shadow-xl capitalize focus:outline-none'>
        </input>
        <BiSearch
         size={30}
         className='cursor-pointer transition ease-out hover:scale-125'
         onClick={handleSearchCity}
         />
      
        <BiCurrentLocation
         size={30}
         className='cursor-pointer transition ease-out hover:scale-125'
         onClick={handleLocation}
         />
      
      </div>
      <div className='flex flex-row w-1/4 items-center justify-center'>
        <button className='text-2xl font-medium transition ease-out hover:scale-125'
        onClick={()=>setUnits("metric")}
        >
          &#176; C 
        </button>
        <p className='text-2xl font-medium mx-1'> | </p>
        <button className='text-2xl font-medium transition ease-out hover:scale-125'
        onClick={()=>setUnits("imperial")}
        >
          &#176; F 
        </button>

      </div>
    </div>
  )
}

export default Inputs
