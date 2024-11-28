import type { CustomFlowbiteTheme } from "flowbite-react";

export const textInputTheme: CustomFlowbiteTheme["textInput"] = {
  field:{
    input:{
      colors: {
        "custom": "border-secondary-color bg-custom-bg text-base-text ",
      },
    },
  },
};

export const selectTheme: CustomFlowbiteTheme["select"] = {
  field:{
    select:{
      colors: {
        "custom": "border-secondary-color bg-custom-bg text-base-text focus:border-secondary-color",
      },
    },
  },
};

export const textAreaTheme: CustomFlowbiteTheme["textarea"] = {
  colors: {
    "custom": "border-secondary-color bg-custom-bg text-base-text focus:border-secondary-color",
  },
};