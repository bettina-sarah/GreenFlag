import React from "react";
import DeleteAccountForm from "@/components/form_components/DeleteAccountForm";
import Menu from "@/components/Menu";
import { NotificationProvider } from "@/components/NotificationContext";
import { useNavigate } from "react-router-dom";
import QuestionnaireForm from "@/components/form_components/QuestionnaireForm";

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full flex flex-col justify-between items-center">
      <NotificationProvider>
        <Menu />
      </NotificationProvider>
      <h1>Modify your profile</h1>
      <div className="flex-grow-1 flex flex-col justify-evenly items-center">
        <h1 className="text-3xl font-bold text-teal-500">Questionnaire</h1>
        <QuestionnaireForm />
      </div>
      <h1>Logout</h1>
      <button
        onClick={() => {
          sessionStorage.clear();
          navigate("/");

          //function to clear & post to BE 1st then clear
          // post to remove token from database!
        }}
        className="bg-red-600 p-1 rounded-md text-white"
        type="submit"
      >
        Logout
      </button>
      <h1 className="text-3xl font-bold text-teal-500">Delete account !</h1>
      <div className="flex flex-col m-2 py-3">
        <DeleteAccountForm />
      </div>
    </div>
  );
};

export default SettingsPage;
