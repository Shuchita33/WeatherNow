import React from 'react';
import { FaThermometerEmpty } from 'react-icons/fa';
import { BiSolidDropletHalf } from 'react-icons/bi';
import { FiWind } from 'react-icons/fi';
import { GiSunrise, GiSunset } from 'react-icons/gi';
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';

const TempDetails = ({ units, weather: { details, icon, temp, temp_min, temp_max, sunrise, sunset, speed, humidity, feels_like } }) => {
    const verticalDetails = [
        {
            id: 1,
            Icon: FaThermometerEmpty,
            title: "Real Feel",
            value: feels_like
        },
        {
            id: 2,
            Icon: BiSolidDropletHalf,
            title: "Humidity",
            value: humidity
        },
        {
            id: 3,
            Icon: FiWind,
            title: "Wind Speed",
            value: speed + `${units === 'metric' ? ' kmph' : ' mps'}`
        },
    ];

    const HorizontalDetails = [
        {
            id: 1,
            Icon: GiSunrise,
            title: "Sunrise",
            value: sunrise
        },
        {
            id: 2,
            Icon: GiSunset,
            title: "Sunset",
            value: sunset
        },
        {
            id: 3,
            Icon: MdKeyboardArrowUp,
            title: "High",
            value: (temp_max).toFixed(2)
        },
        {
            id: 4,
            Icon: MdKeyboardArrowDown,
            title: "Down",
            value: (temp_min).toFixed(2)
        },
    ];

    return (
        <div>
            <div className='flex items-center justify-center py-6 text-2xl text-cyan-100'>
                <p>{details}</p>
            </div>
            <div className='flex flex-row items-center justify-around py-3'>
                <img src={icon} alt="icon" className='w-32' />
                <p className='text-6xl'>
                    {temp} &#176; {`${units === 'metric' ? ' C' : ' F'}`}
                </p>
                <div className='flex flex-col space-y-3 items-start'>
                    {
                        verticalDetails.map(({ id, Icon, title, value }) => (
                            <div key={id} className='flex font-light text-lg items-center justify-center'>
                                <Icon size={24} className='mr-1' />
                                {title}<span className='font-medium ml-1'>{value} &#176;</span>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='flex flex-row items-center justify-center space-x-10 text-lg py-3'>
                {
                    HorizontalDetails.map(({ id, Icon, title, value }) => (
                        <div key={id} className='flex flex-row items-center justify-center'>
                            <Icon size={50} />
                            <p className='font-light ml-1'>
                                {`${title} : `}
                                <span className='font-medium ml-1'>{value} &#176;</span>
                            </p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default TempDetails;
