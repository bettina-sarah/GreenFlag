/*
------------------------------------------------------------------------------------
====================================================================================
Filename    : ImageInput.tsx
Created By  : Bettina-Sarah Janesh
About       : Le composant ImageInputCustom utilise react-hook-form pour gérer un 
              champ de saisie de fichier. Il permet de gérer le changement de fichier, 
              de prévisualiser l'image sélectionnée et d'afficher des messages 
              d'erreur en cas de problème. Il utilise le hook useController pour 
              contrôler et synchroniser le champ avec le state de react-hook-form.
====================================================================================
------------------------------------------------------------------------------------
*/

import React from "react";
import { useController } from "react-hook-form";
import { ImageInputProps } from "@/interfaces/interfaces";

const ImageInputCustom: React.FC<ImageInputProps> = ({ name, control }) => {
  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController({ name, control });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      onChange(files[0]); // Store the image URL
    } else {
      onChange(null); // Reset if no file selected
    }
  };

  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-left text-secondary-color text-lg mb-2"
      >
        Upload Profile Photo
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        onBlur={onBlur}
        className="mt-1 block w-full border border-secondary-color rounded-md text-h2-custom shadow-sm focus:border-custom-bg focus:ring focus:ring-custom-bg"
      />
      {value && (
        <img
          src={URL.createObjectURL(value)}
          alt="Selected"
          className="mt-2 w-full h-auto border rounded-md"
        />
      )}
      {error && <span className="text-red-600 text-sm">{error.message}</span>}
    </div>
  );
};

export default ImageInputCustom;
