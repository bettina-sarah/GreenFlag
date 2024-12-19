/*
------------------------------------------------------------------------------------
====================================================================================
Filename    : App.tsx
Created By  : Vincent Fournier et Bettina-Sarah Janesch
About       : Le composant App de cette application utilise BrowserRouter pour gérer 
              le routage de l'application React. Il configure les différentes routes 
              de l'application, chacune nécessitant une authentification via AuthGuard 
              pour accéder aux pages protégées telles que /matching, /chatrooms, 
              /chatroom/:chatroom_name, /questionnaire, /modify-profile, 
              /account-settings, et /settings. Les autres pages comme HomePage, Login, 
              CreateAccount ne nécessitent pas d'authentification. Il utilise également 
              ToastContainer pour gérer les notifications toast dans l'application.
====================================================================================
------------------------------------------------------------------------------------
*/

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
import ReverseAuthGuard from "@/components/ReverseAuthGuard";
import { ToastContainer } from "react-toastify";
import ModifyProfilePage from "./pages/ModifyProfilePage";
import AccountSettingsPage from "./pages/AccountSettingsPage";

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <ToastContainer/>
        <Routes>
        <Route
        path="/"
        element={
          <ReverseAuthGuard>
            <HomePage />
          </ReverseAuthGuard>
        }
      />

      <Route
        path="/login"
        element={
          <ReverseAuthGuard>
            <Login />
          </ReverseAuthGuard>
        }
      />

      <Route
        path="/create-account"
        element={
          <ReverseAuthGuard>
            <CreateAccount />
          </ReverseAuthGuard>
        }
      />


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