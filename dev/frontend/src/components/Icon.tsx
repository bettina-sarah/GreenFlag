/*
------------------------------------------------------------------------------------
====================================================================================
Filename    : Icon.tsx
Created By  : Bettina-Sarah Janesh
About       : Le composant Icon prend en entrée une prop icon qui contient l'URL de 
              l'icône à afficher. Il utilise une balise img pour afficher l'icône 
              avec la classe CSS object-contain pour maintenir les proportions et 
              p-0 pour retirer les marges et paddings par défaut.
====================================================================================
------------------------------------------------------------------------------------
*/

import { IconProps } from "@/interfaces/interfaces";

const Icon: React.FC<IconProps> = ({icon}) => (
    <img src={icon} alt="Icon" className='object-contain w-full h-full p-0'  />
);

export default Icon;