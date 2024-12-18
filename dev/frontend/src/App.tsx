import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/LoginPage";
import CreateAccount from "./pages/CreateAccountPage";
import MatchingPage from "./pages/MatchingPage";
import ChatroomsPage from "./pages/ChatroomsPage";
import QuestionnairePage from "./pages/QuestionnairePage";
import SettingsPage from "./pages/SettingsPage";

import PrivateChatroomPage from "./pages/PrivateChatroomPage";
import AuthGuard from "./components/AuthGuard";
import { ToastContainer } from "react-toastify";
import ModifyProfilePage from "./pages/ModifyProfilePage";
import AccountSettingsPage from "./pages/AccountSettingsPage";

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <ToastContainer/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
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
            path="/modify-profile"
            element={
              <AuthGuard>
                <ModifyProfilePage />
              </AuthGuard>
            }
          />

          <Route
            path="/account-settings"
            element={
              <AuthGuard>
                <AccountSettingsPage />
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
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;