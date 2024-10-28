import React from 'react';
import { Emoji } from 'react-emoji-render';



interface RelationshipProps {
    relationship: string,
    wants_kids: boolean,
}

const RelationshipGoals: React.FC<RelationshipProps> = ({relationship, wants_kids}) => {

    return (

    <div className='flex flex-col items-baseline pl-4 pt-1'>
        <h2 className='font-nunito-bold text-h2-yellow'>Relationship Goals</h2>
        <div className='flex flex-col flex-wrap'>
            <div className='font-nunito-semibold p-1 m-1 pr-3 pl-3 border-[2px] border-black bg-hobby-green rounded-3xl text-blue-100 '>
                {relationship} 💕</div>
                
            <div className='font-nunito-semibold p-1 m-1 border-[2px] border-black bg-hobby-green rounded-3xl text-blue-300 '>
                 {wants_kids ? 'Wants kids 🍼' : 'Doesn\'t want kids ❌'}</div>
        </div>
    </div>
    );
};

export default RelationshipGoals;