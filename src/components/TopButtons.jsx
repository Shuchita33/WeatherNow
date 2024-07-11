import React from 'react'

const TopButtons = ({setQuery}) => {
    const cities=[
        {
            id:1,
            name:'New Delhi'},
        { 
            id:2,
            name:'Bhopal'},
        {
            id:3,
            name:'Indore'
        },
        {
            id:4,
            name: 'Lucknow'
        },
        {
            id:5,
            name:'Jaipur'
        }
    ]
  return (
    <div className='flex items-center justify-around py-4'>
        {
            cities.map(city=>(
              <button key={city.id}
              className='text-lg font-lg hover:bg-gray-700/20 px-3 py-2 rounded-md transition ease-in'
              onClick={()=>setQuery({q:city.name})}
              >
                {city.name}
            
              </button>
            ))
        }
      
    </div>
  )
}

export default TopButtons
