import {Modal,Select,Button,Toast} from "flowbite-react";
import { useState } from "react";
import axios from "axios";
import { IP_SERVER } from "@/config/constants";
import redFlagIcon from "@/../ressources/icons/FlagButton_right.png"
import { modalTheme, selectTheme } from "../theme-flowbite/CustomTheme";
import {toast} from "react-toastify";

const reasons = [
  'Inappropriate msgs',
  'Fake profile',
  'Harassment or bullying',
  'Spam or promotion',
  'Looking for casual hookups',
  'Ghosting or inconsistent communication',
  'Misleading profile information'
]

interface FlagProps {
  subject_id: number | undefined;
  isOpen: boolean;
  onClose: () => void;
}

const FlagModal: React.FC<FlagProps> = ({ subject_id, isOpen, onClose }) => {
  const [reason,setReason] = useState<string>("");

  const sendFlag = async (reason:string) => {
    if (reason !== ""){
      const id = sessionStorage.getItem("id");
      
      if(!id){
        toast.error("Unable to find a session id")
        return;
      }

      if(reason === ""){
        toast.warning("Reason cannot be empty.");
        return;
      }
      
      const data = {
        id: id,
        subject_id: subject_id,
        reason: reason
      }
      

      try{
        const response = await axios.post(IP_SERVER + "/flag", data);
        console.log("answer from flag", response)
        if (response.data === true)
          toast.success("You red flag has been sent!");
        else if (response.data === "FLAGGED TOO MANY TIME")
          toast.error("You have been flagged too many times to flag another user.");
        else
          toast.error("An error occured. Please try again.");
      } catch(error){
        console.error("Error sending flag: ", error);
        toast.error("An unexpected error occured.");
      }
      // onClose();

      // const answer = await axios.post(IP_SERVER + "/flag", data);
      
      // if (answer.data == true) {
        
      //   return (
      //     <Toast>
      //       <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-color text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200">
      //         <img src={redFlagIcon} alt="" />
      //       </div>
      //       <div className="ml-3 text-sm font-normal">
      //         Your Red Flag have been sent
      //       </div>
      //       <Toast.Toggle />
      //     </Toast>
      //   )
      // }
      // else if (answer.data == 'FLAGGED TOO MANY TIME'){
      //   return(
      //     <Toast>
      //       <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-color text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200">
      //         <img src={redFlagIcon} alt="" />
      //       </div>
      //       <div className="ml-3 text-sm font-normal">
      //         Sorry, you've been flagged too many time to report another user.
      //       </div>
      //       <Toast.Toggle />
      //     </Toast>
      //   )
      // }
      // else {
      //   return(
      //     <Toast>
      //       <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-color text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200">
      //         <img src={redFlagIcon} alt="" />
      //       </div>
      //       <div className="ml-3 text-sm font-normal">
      //         Sorry, an error occured. Please try again.
      //       </div>
      //       <Toast.Toggle />
      //     </Toast>
      //   )
      // }
      // onClose();
    }
  }



  return (
    <Modal show={isOpen} onClose={onClose} className="bg-secondary-color/70" theme={modalTheme} position="bottom-center" size="sm">
      <Modal.Header>Flag </Modal.Header>
      <Modal.Body>
        <Select 
          onChange={(event)=> setReason(event.target.value)}
          theme={selectTheme}
          color="custom"
        >
          {reasons.map((reason, index) => (
            <option value={reason} key={index} className="bg-primary-color text-h2-custom">
              {reason}
            </option>
          ))}
        </Select>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => sendFlag(reason)} color="green">I confirm</Button>
        <Button onClick={onClose} color="red">I abort</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FlagModal;