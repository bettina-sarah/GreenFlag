import React from 'react';



interface HobbiesProps {
    hobbies: string[]
}

const Hobbies: React.FC<HobbiesProps> = ({hobbies}) => {

    return (

    <div className='flex flex-col items-baseline pl-4 pt-1'>
        <h2 className='font-nunito-bold text-h2-yellow'>Interests</h2>
        <div className='flex flex-row flex-wrap'>
            {hobbies.map((hobby) => (
            <div className='font-nunito-semibold p-1 m-1 pr-3 pl-3 border-[2px] border-black bg-hobby-green rounded-3xl text-blue-100 '>{hobby}</div>
            ))}
        </div>
    </div>
    );
};

export default Hobbies;