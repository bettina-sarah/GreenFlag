import { useNavigate } from 'react-router-dom';
import Logo from '../../ressources/icons/logo.png'

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginButtonClick = () => {
    navigate('/login');
  };
  const handleRegisterButtonClick = () => {
    navigate('/create-account');
  };

  return (
    <div className='w-full h-full flex flex-col justify-between items-center'>
      <h1 className='p-8 text-3xl font-extrabold text-teal-500'>GreenFlag</h1>
      <div>
        <img src={Logo} alt="" />
      </div>
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
        </div>
      </div>
    </div>
  );
};

export default HomePage;