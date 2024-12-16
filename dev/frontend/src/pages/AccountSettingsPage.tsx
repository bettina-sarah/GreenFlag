import React from "react";
import DeleteAccountForm from "@/components/form_components/DeleteAccountForm";
import Menu from "@/components/menu_components/Menu";
import { NotificationProvider } from "@/components/NotificationContext";
import ModifyPasswordForm from "@/components/form_components/ModifyPasswordForm";
import AlgoSelector from "@/components/AlgoSelector";


const AccountSettingsPage: React.FC = () => {

  return (
    <div className="w-full h-full flex flex-col justify-between items-center">
      <NotificationProvider>
        <Menu />
      </NotificationProvider>

      <div className="flex flex-col justify-around items-center m-6 h-80 bg-primary-color rounded-3xl">
        <h1 className="pt-3 text-3xl max-w-sm font-bold text-base-text">Choose an assistant to help you find love</h1>
        <AlgoSelector/>
      </div>


      <div className="flex flex-col justify-around m-6 h-80 bg-primary-color rounded-3xl">
        <h1 className="pt-3 text-3xl font-bold text-base-text">Modify your password</h1>
        <ModifyPasswordForm />
      </div>
      
      <div className="flex flex-col justify-around m-6 h-52 bg-primary-color rounded-3xl">
        <h1 className="pt-3 text-3xl font-bold text-base-text">Delete account !</h1>
        <DeleteAccountForm />
      </div>
    </div>
  );
};

export default AccountSettingsPage;