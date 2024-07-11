import React from 'react';

const Forecast = ({title,data}) => {
  return (
    <div>
      <div className='flex flex-row items-center justify-start mt-6'>
        <p className='font-medium uppercase'> {title}</p>
      </div>
      <hr className='my-1'></hr>
      <div className='flex items-center justify-between'>
        {data.map((d,index)=>( 
            <div key={index} className='flex flex-col items-center justify-center'>
                <p>{d.title}</p>
                <img src={d.icon} alt='img' className='w-15 my-1'/>
                <p className='font-medium'>{(d.temp).toFixed(2)} &#176;</p>
            </div>
        ))}

      </div>
    </div>
  )
}

export default Forecast;
