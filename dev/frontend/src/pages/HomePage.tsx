import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginButtonClick = () => {
    navigate('/login');
  };
  const handleRegisterButtonClick = () => {
    navigate('/login');
  };

  const handleButtonClickTest = () => {
    navigate('/test');
  };

  return (
    <div className='w-full h-screen flex flex-col justify-evenly items-center'>
      <h1 className='text-3xl font-bold'>GreenFlag</h1>
      <div className='flex flex-col m-0'>
        <h2>Welcome to the Home Page</h2>
        <button onClick={handleLoginButtonClick} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-2'>
          Go to Login
        </button>
        <button onClick={handleRegisterButtonClick} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-2'>
          Create an Account
        </button>
        <button onClick={handleButtonClickTest} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-2'>
          Go to backend test!
        </button>
      </div>
    </div>
  );
};

export default HomePage;