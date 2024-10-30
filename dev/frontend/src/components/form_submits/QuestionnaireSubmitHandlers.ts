import { IP_SERVER } from "@/config/constants";
import axios from "axios";
import { NavigateFunction } from "react-router-dom";

export const genders = ["Male", "Female", "Non-Binary", "Other"];
export const hobbiesKeys = [
  "hiking",
  "yoga",
  "photography",
  "cooking",
  "traveling",
  "reading",
  "videogaming",
  "biking",
  "running",
  "watchingmovies",
  "workingout",
  "dancing",
  "playinginstrument",
  "attendingconcerts",
  "painting",
  "volunteering",
  "playingsports",
  "crafting",
  "petlover",
  "learningnewlanguage",
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
  hiking: boolean;
  yoga: boolean;
  photography: boolean;
  cooking: boolean;
  traveling: boolean;
  reading: boolean;
  videogaming: boolean;
  biking: boolean;
  running: boolean;
  watchingmovies: boolean;
  workingout: boolean;
  dancing: boolean;
  playinginstrument: boolean;
  attendingconcerts: boolean;
  painting: boolean;
  volunteering: boolean;
  playingsports: boolean; //(e.g., Soccer, Tennis, Basketball)
  crafting: boolean;
  petlover: boolean;
  learningnewlanguage: boolean;
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

export const onSubmitFormHobbies = async (
  data: FormDataHobbies,
  navigate: NavigateFunction
) => {
  try {
    const answer = await axios.post(IP_SERVER + "/hobbies", data);
    if (answer.data) {
      console.log(answer);
      navigate("/matching");
    }
  } catch (error) {
    console.error("Error during account modification:", error);
  }
};

export const onSubmitFormInfo = async (
  data: FormDataInfo,
  navigate: NavigateFunction
) => {
  try {
    const answer = await axios.post(IP_SERVER + "/questionnaire", data);
    if (answer.data) {
      console.log(answer);
      navigate("/matching");
    }
  } catch (error) {
    console.error("Error during account modification:", error);
  }
};

export const onSubmitPhoto = async (data: FormDataPhoto) => {
  try {
    const formData = new FormData();
    if (data.image) {
      formData.append("image", data.image);
      const answer = await axios.post(IP_SERVER + "/upload-photo", formData);
      if (answer.data) {
        console.log(answer);
        console.log(data);
      }
    }
  } catch (error) {
    console.error("Error during account modification:", error);
  }
};
