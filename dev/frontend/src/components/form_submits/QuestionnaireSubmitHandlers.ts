/*
------------------------------------------------------------------------------------
====================================================================================
Filename    : QuestionnaireSubmitHandlers.ts
Created By  : Vincent Fournier (Contribution: Bettina-Sarah Janesch)
About       : Ce fichier contient des fonctions asynchrones pour gérer et soumettre 
              les informations de profil, les préférences, et les photos de 
              l'utilisateur à un serveur.
====================================================================================
------------------------------------------------------------------------------------
*/

import { IP_SERVER } from "@/constants";
import axios from "axios";

export const genders = ["Male", "Female", "Non-Binary", "Other"];
export const hobbiesKeys = [
  "Hiking",
  "Yoga",
  "Photography",
  "Cooking",
  "Traveling",
  "Reading",
  "Video gaming",
  "Biking",
  "Running",
  "Watching movies",
  "Working out",
  "Dancing",
  "Playing instrument",
  "Attending concerts",
  "Painting",
  "Volunteering",
  "Playing sports",
  "Crafting",
  "Pet lover",
  "Learning new language",
] as const;
export const religions = [
  "Atheist",
  "Spiritual",
  "Christian",
  "Muslim",
  "Jewish",
  "Hindu",
  "Buddhist",
  "Sikh",
  "Taoist",
  "Shinto",
  "Confucian",
  "Bahai",
  "Pagan",
  "Agnostic",
  "Other",
];

export type FormDataHobbies = {
  // Activities
  Hiking: boolean;
  Yoga: boolean;
  Photography: boolean;
  Cooking: boolean;
  Traveling: boolean;
  Reading: boolean;
  "Video gaming": boolean;
  Biking: boolean;
  Running: boolean;
  "Watching movies": boolean;
  "Working out": boolean;
  Dancing: boolean;
  "Playing instrument": boolean;
  "Attending concerts": boolean;
  Painting: boolean;
  Volunteering: boolean;
  "Playing sports": boolean;
  Crafting: boolean;
  "Pet lover": boolean;
  "Learning new language": boolean;
};

export type FormDataInfo = {
  // Infos
  date_of_birth: Date | null;
  gender: string;
  height: number;
  religion: string;
  want_kids: boolean;
  city: string;
  bio: string;
  // Preferences
  min_age: number;
  max_age: number;
  relationship_type: string;
  preferred_genders: string[];
};

export type FormDataPhoto = {
  image: File | null;
};

const completeProfile = async () => {
  try {
    const data = {
      id: sessionStorage.getItem("id"),
    };

    const answer = await axios.post(IP_SERVER + "/complete-profile", data);
    return !!answer.data;
  } catch (error) {
    console.error("Error during account completion:", error);
  }
};

export const checkAndCompleteProfile = async () => {
  const hobbiesComplete = localStorage.getItem("hobbiesComplete") === "true";
  const preferencesComplete =
    localStorage.getItem("preferencesComplete") === "true";
  const photoComplete = localStorage.getItem("photoComplete") === "true";

  if (hobbiesComplete && preferencesComplete && photoComplete) {
    const profileCompleted = await completeProfile();
    if (profileCompleted) {
      localStorage.removeItem("preferencesComplete");
      localStorage.removeItem("hobbiesComplete");
      localStorage.removeItem("photoComplete");
      return true;
    }
  }
  return false;
};

export const onSubmitFormHobbies = async (hobbies: FormDataHobbies) => {
  try {
    const data = {
      id: sessionStorage.getItem("id"),
      hobbies: hobbies,
    };
    const answer = await axios.post(IP_SERVER + "/hobbies", data);
    if (answer.data) {
      if (sessionStorage.getItem("profileComplete") === "false") {
        localStorage.setItem("hobbiesComplete", "true");
      }
    }
  } catch (error) {
    console.error("Error during account modification:", error);
  }
};

export const onSubmitFormInfo = async (info: FormDataInfo) => {
  try {
    const data = {
      id: sessionStorage.getItem("id"),
      info: info,
    };
    const answer = await axios.post(IP_SERVER + "/questionnaire", data);
    if (answer.data) {
      if (sessionStorage.getItem("profileComplete") === "false") {
        localStorage.setItem("preferencesComplete", "true");
      }
    }
  } catch (error) {
    console.error("Error during account modification:", error);
  }
};

export const onSubmitPhoto = async (data: FormDataPhoto) => {
  try {
    const formData = new FormData();
    if (data.image) {
      const userId = sessionStorage.getItem("id");
      if (userId === null) formData.append("id", "");
      else formData.append("id", userId);

      formData.append("image", data.image);
      const answer = await axios.post(IP_SERVER + "/upload-photo", formData);
      if (answer.data) {
        if (sessionStorage.getItem("profileComplete") === "false") {
          localStorage.setItem("photoComplete", "true");
        }
      }
    }
  } catch (error) {
    console.error("Error during account modification:", error);
  }
};
