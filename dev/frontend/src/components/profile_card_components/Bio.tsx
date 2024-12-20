/*
------------------------------------------------------------------------------------
====================================================================================
Filename    : Bio.tsx
Created By  : Bettina-Sarah Janesch
About       : Ce fichier définit le composant Bio, qui prend en charge les données 
              de biographie (bio) et les affiche dans une section avec une mise en page 
              stylisée, y compris un titre "About Me" et le texte de la biographie 
              dans une police définie.
====================================================================================
------------------------------------------------------------------------------------
*/

import { BioProps } from "@/interfaces/interfaces";

const Bio: React.FC<BioProps> = ({ bio }) => {
  return (
    <div className=" pl-3 pt-1 pr-3 pb-1 max-h-[30vh] overflow-hidden text-ellipsis">
      <h2 className="font-nunito-bold text-h2-custom text-left">About Me</h2>
      <p className="font-nunito-light text-muted-text text-left">{bio}</p>
    </div>
  );
};

export default Bio;
