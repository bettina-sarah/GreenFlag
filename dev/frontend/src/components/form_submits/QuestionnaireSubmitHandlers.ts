import { IP_SERVER } from "@/config/constants";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

const userId = sessionStorage.getItem("id");

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

const completeProfile = async () => {
  try {
    const data = {
      id: userId,
    };

    const answer = await axios.post(IP_SERVER + "/complete-profile", data);
    return !!answer.data;
  } catch (error) {
    console.error("Error during account completion:", error);
  }
};

const NavigateMatching = () => {
  const navigate = useNavigate();
  localStorage.removeItem("preferencesComplete");
  localStorage.removeItem("hobbiesComplete");
  localStorage.removeItem("photoComplete");
  navigate("/matching");
};

const checkAndNavigate = async () => {
  const hobbiesComplete = localStorage.getItem("hobbiesComplete") === "true";
  const preferencesComplete =
    localStorage.getItem("preferencesComplete") === "true";
  const photoComplete = localStorage.getItem("photoComplete") === "true";

  if (hobbiesComplete && preferencesComplete && photoComplete) {
    const profileCompleted = await completeProfile();
    if (profileCompleted) {
      NavigateMatching();
    }
  }
};

export const onSubmitFormHobbies = async (hobbies: FormDataHobbies) => {
  try {
    const data = {
      id: userId,
      hobbies: hobbies,
    };
    const answer = await axios.post(IP_SERVER + "/hobbies", data);
    if (answer.data) {
      if (!sessionStorage.getItem("profileComplete")) {
        localStorage.setItem("hobbiesComplete", "true");
        await checkAndNavigate();
      }
    }
  } catch (error) {
    console.error("Error during account modification:", error);
  }
};

export const onSubmitFormInfo = async (info: FormDataInfo) => {
  try {
    const data = {
      id: userId,
      info: info,
    };
    console.log("info : " + userId);
    const answer = await axios.post(IP_SERVER + "/questionnaire", data);
    if (answer.data) {
      if (!sessionStorage.getItem("profileComplete")) {
        localStorage.setItem("preferencesComplete", "true");
        await checkAndNavigate();
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
      if (userId === null) formData.append("id", "");
      else formData.append("id", userId);

      formData.append("image", data.image);
      const answer = await axios.post(IP_SERVER + "/upload-photo", formData);
      if (answer.data) {
        if (!sessionStorage.getItem("profileComplete")) {
          localStorage.setItem("photoComplete", "true");
          await checkAndNavigate();
        }
      }
    }
  } catch (error) {
    console.error("Error during account modification:", error);
  }
};
