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
    <div className='w-full h-full flex flex-col justify-between items-center bg-home-bg bg-cover bg-bottom'>
      <h1 className='p-8 font-leckerli text-6xl font-extrabold' style={{ transform: 'translateX(-1rem) translateY(3rem) rotate(-20deg)' }}>GreenFlag</h1>
      <div>
        <img src={Logo} alt="" />
      </div>
      <div className='flex flex-col justify-between'>
        <h2 className='text-align-left text-2xl text-h1-darkblue'>Emotional availability-based matching</h2>
        <p className='text-button-light'>Tired of traditional dating apps? We got you!</p>
        <div className='flex flex-col m-3 py-3'>
          <button onClick={handleLoginButtonClick} className='bg-button-light hover:bg-button-dark text-button-dark hover:text-button-light border-2 hover:border-button-light font-bold py-2 px-4 rounded my-2 mx-6'>
            Go to Login
          </button>
          <button onClick={handleRegisterButtonClick} className='bg-button-dark hover:bg-button-light text-button-light hover:text-button-dark border-2 border-button-light font-bold py-2 px-4 rounded my-2 mx-6'>
            Create an Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;