import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginButtonClick = () => {
    navigate('/login');
  };
  const handleRegisterButtonClick = () => {
    navigate('/create-account');
  };

  const handleButtonClickTest = () => {
    navigate('/test');
  };

  const handleButtonClickSettings = () => {
    navigate('/settings');
  };

  
  const handleButtonClickProfile = () => {
    navigate('/profile');
  };

  return (
    <div className='w-full h-full flex flex-col justify-between items-center'>
      <h1 className='text-3xl font-bold text-teal-500'>GreenFlag</h1>
      <div className='flex flex-col justify-between'>
        <h2 className='text-align-left text-2xl'>Emotional availability-based matching</h2>
        <p>Tired of traditional dating apps? We got you!</p>
        <div className='flex flex-col m-2 py-3'>
          <button onClick={handleLoginButtonClick} className='bg-teal-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-2'>
            Go to Login
          </button>
          <button onClick={handleRegisterButtonClick} className='bg-teal-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-2'>
            Create an Account
          </button>
          <button onClick={handleButtonClickTest} className='bg-teal-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-2'>
            Go to backend test!
          </button>
          <button onClick={handleButtonClickSettings} className='bg-pink-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-2'>
            Settings page
          </button>
          <button onClick={handleButtonClickProfile} className='bg-purple-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-2'>
            My profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;