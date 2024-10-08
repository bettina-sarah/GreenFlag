import './App.css'
import TestConnection from './components/TestConnection'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import MatchingPage from './pages/MatchingPage';
import ChatroomsPage from './pages/ChatroomsPage';
import '@mantine/core/styles.css';
import Questionnaire from './pages/Questionnaire';
import { MantineProvider, DEFAULT_THEME } from '@mantine/core';
import createCache from '@emotion/cache';

// https://dev.to/aryaman_/setting-up-mantine-with-tailwind-css-using-emotion-cache-15ch
// https://v5.mantine.dev/theming/emotion-cache/
// https://github.com/orgs/mantinedev/discussions/1672#discussioncomment-7561382
// https://github.com/Songkeys/tailwind-preset-mantine

const App: React.FC = () => {
  const cache = createCache({ key: "mantine", prepend: false });
  return (
    <MantineProvider theme={DEFAULT_THEME} emotionCache={cache}>
      <BrowserRouter>
        {/* <header>
          <Link to="/">Green Flag</Link>
        </header> */}
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/test" element={<TestConnection/>}/>
          <Route path="/create-account" element={<CreateAccount/>}/>
          <Route path="/matching" element={<MatchingPage/>}/>
          <Route path="/chatrooms" element={<ChatroomsPage/>}/>
          <Route path="/questionnaire" element={<Questionnaire/>}/>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
    )
}

export default App;

// ------------ NOTES:  CACHE HANDLING BELOW:


// The QueryClient can be used to interact with a cache ; qc-provider needs an instance of queryclient
// const queryClient = new QueryClient({
//     defaultOptions: {
//       queries: {
//         staleTime: Infinity,
//         cacheTime: Infinity,
//       },
//     },
//   });
    
//  Context lets components pass information deep down without explicitly passing props.  
          {/* <AdoptedPetContext.Provider value = {adoptedPet}> */}
