import React from 'react'

const TimeLocation = ({weather:{date,time,name,country}}) => {
  
  return (
    <div className=''>
        <div className='flex items-center justify-center my-6'>
            <p className='text-xl font-extralight'>
                {`${date} | ${time}`}
            </p>
            
        </div>
        <div className='flex items-center justify-center my-3'>
            <p className='text-3xl font-medium'> {`${name}, ${country}`}</p>

        </div>
      
    </div>
  )
}

export default TimeLocation
