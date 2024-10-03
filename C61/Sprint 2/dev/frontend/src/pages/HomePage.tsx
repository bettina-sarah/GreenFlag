import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate(); //hook

  const handleButtonClick = () => {
    navigate('/login');
  };
  const handleButtonClickTest = () => {
    navigate('/test');
  };

  return (
    <div>
		<h1>Vite + React</h1>
      <h2>Welcome to the Home Page</h2>
      <button onClick={handleButtonClick}>
        Go to Login
      </button>
	  <button onClick={handleButtonClickTest}>
        Go to backend test!
      </button>
    </div>
  );
};

export default HomePage;