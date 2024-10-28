
interface BioProps {
    bio: string
}

const Bio: React.FC<BioProps> = ({bio}) => {
    
    return(
        <div>
            <h2 className='font-nunito-bold text-h2-yellow'>Bio</h2>
            <p className='font-nunito-light text-blue-100 '>{bio}</p>
        </div>
    );
};

export default Bio;

