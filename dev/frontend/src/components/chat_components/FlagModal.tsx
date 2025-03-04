/*
------------------------------------------------------------------------------------
====================================================================================
Filename    : FlagModal.tsx
Created By  : Vincent Fournier
About       : Ce composant React, FlagModal, affiche une fenêtre modale permettant à
              un utilisateur de signaler une autre personne en sélectionnant une 
              raison dans un menu déroulant. Il utilise axios pour envoyer une 
              requête POST au serveur, affiche des notifications de succès ou 
              d'erreur avec react-toastify et redirige l'utilisateur vers les 
              "chatrooms" en cas de succès.
====================================================================================
------------------------------------------------------------------------------------
*/

import { Modal, Select, Button } from "flowbite-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IP_SERVER } from "@/constants";
import { modalTheme, selectTheme } from "../theme-flowbite/CustomTheme";
import { toast } from "react-toastify";
import { FlagProps } from "@/interfaces/interfaces";
import { FLAG_REASONS } from "@/constants";

const FlagModal: React.FC<FlagProps> = ({ subject_id, isOpen, onClose }) => {
  const [reason, setReason] = useState<string>("");
  const navigate = useNavigate();

  const sendFlag = async (reason: string) => {
    if (reason !== "") {
      const id = sessionStorage.getItem("id");

      if (!id) {
        toast.error("Unable to find a session id");
        return;
      }

      if (reason === "") {
        toast.warning("Reason cannot be empty.");
        return;
      }

      const data = {
        id: id,
        subject_id: subject_id,
        reason: reason,
      };

      try {
        const response = await axios.post(IP_SERVER + "/flag", data);
        if (response.data === true) {
          toast.success("You red flag has been sent!");
          navigate("/chatrooms");
        } else if (response.data === "FLAGGED TOO MANY TIME")
          toast.error(
            "You have been flagged too many times to flag another user."
          );
        else toast.error("An error occured. Please try again.");
      } catch (error) {
        console.error("Error sending flag: ", error);
        toast.error("An unexpected error occured.");
      }
      onClose();
    }
  };

  return (
    <Modal
      show={isOpen}
      onClose={onClose}
      className="bg-secondary-color/70"
      theme={modalTheme}
      position="bottom-center"
      size="sm"
    >
      <Modal.Header>Flag</Modal.Header>
      <Modal.Body>
        <Select
          onChange={(event) => setReason(event.target.value)}
          theme={selectTheme}
          color="custom"
        >
          {FLAG_REASONS.map((reason, index) => (
            <option
              value={reason}
              key={index}
              className="bg-primary-color text-black"
            >
              {reason}
            </option>
          ))}
        </Select>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => sendFlag(reason)} color="green">
          Confirm
        </Button>
        <Button onClick={onClose} color="red">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FlagModal;
