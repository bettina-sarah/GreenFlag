interface BioProps {
  bio: string | null;
}

const Bio: React.FC<BioProps> = ({ bio }) => {
  return (
    <div className="pl-3 pt-1 pr-3 pb-4">
      <h2 className="font-nunito-bold text-h2-yellow text-left">About Me</h2>
      <p className="font-nunito-light text-blue-100 text-left">{bio}</p>
    </div>
  );
};

export default Bio;
