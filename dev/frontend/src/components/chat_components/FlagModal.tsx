import {Modal,Select,Button,Toast} from "flowbite-react";
import { useState } from "react";
import axios from "axios";
import { IP_SERVER } from "@/config/constants";
import redFlagIcon from "@/../ressources/icons/FlagButton_right.png"

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
}

const FlagModal: React.FC<FlagProps> = ( subject_id ) => {

  const [openModal,setOpenModal] = useState<boolean>(true);
  const [reason,setReason] = useState<string>("");

  const sendFlag = async (reason:string) => {
    if (reason !== ""){
      const data = {
        id: sessionStorage.getItem("id"),
        subject_id: subject_id,
        reason: reason
      }
      const answer = await axios.post(IP_SERVER + "/flag", data);
      setOpenModal(false)
      if (answer) {
        return (
          <Toast>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-color text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200">
              <img src={redFlagIcon} alt="" />
            </div>
            <div className="ml-3 text-sm font-normal">
              Your Red Flag have been sent
            </div>
            <Toast.Toggle />
          </Toast>
        )
      }
      else {
        return(
          <Toast>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-color text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200">
              <img src={redFlagIcon} alt="" />
            </div>
            <div className="ml-3 text-sm font-normal">
              Sorry, an error occured. Please try a new time.
            </div>
            <Toast.Toggle />
          </Toast>
        )
      }
    }
  }



  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)} className="bg-secondary-color/70">
      <Modal.Header>Flag </Modal.Header>
      <Modal.Body>
        <Select onChange={(event)=> setReason(event.target.value)}>
          {reasons.map((reason, index) => (
            <option value={reason} key={index} className="bg-primary-color text-h2-custom">
              {reason}
            </option>
          ))}
        </Select>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => sendFlag(reason)}>I confirm</Button>
        <Button onClick={() => setOpenModal(false)}>I abort</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FlagModal;