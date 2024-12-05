import "./App.css";
import TestConnection from "./components/TestConnection";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import MatchingPage from "./pages/MatchingPage";
import ChatroomsPage from "./pages/ChatroomsPage";
import QuestionnairePage from "./pages/Questionnaire";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";

import PrivateChatroomPage from "./pages/PrivateChatroomPage";
import AuthGuard from "./components/AuthGuard";

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        {/* <header>
          <Link to="/">Green Flag</Link>
        </header> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/test" element={<TestConnection />} />
          <Route path="/create-account" element={<CreateAccount />} />

          <Route
            path="/matching"
            element={
              <AuthGuard>
                <MatchingPage />
              </AuthGuard>
            }
          />
          <Route
            path="/chatrooms"
            element={
              <AuthGuard>
                <ChatroomsPage />
              </AuthGuard>
            }
          />
          <Route
            path="/chatroom/:chatroom_name"
            element={
              <AuthGuard>
                <PrivateChatroomPage />
              </AuthGuard>
            }
          />
          <Route
            path="/questionnaire"
            element={
              <AuthGuard>
                <QuestionnairePage />
              </AuthGuard>
            }
          />

          <Route
            path="/settings"
            element={
              <AuthGuard>
                <SettingsPage />
              </AuthGuard>
            }
          />
          <Route
            path="/profile"
            element={
              <AuthGuard>
                <ProfilePage />
              </AuthGuard>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

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
{
  /* <AdoptedPetContext.Provider value = {adoptedPet}> */
}
