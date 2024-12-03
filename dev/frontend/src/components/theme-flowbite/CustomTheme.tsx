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

export const datePickerTheme: CustomFlowbiteTheme["datepicker"] = {
  root:{
    input:{
      field:{
        input:{
          colors:{
            custom: "bg-custom-bg text-base-text"
          }
        }
      }
    }
  },
  popup:{
    root:{
      
      inner: "inline-block rounded-lg bg-custom-bg p-4 shadow-lg dark:bg-gray-700"
    },
    header:{
      selectors:{
        button:{
          base: "rounded-lg bg-primary-color px-5 py-2.5 text-sm font-semibold text-base-text hover:bg-secondary-color hover:text-custom-bg focus:outline-none focus:ring-2 focus:ring-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
        }
      }
    },
    footer:{
      button:{
        today: "bg-primary-color text-secondary-color hover:bg-cyan-800 hover:text-custom-bg dark:bg-cyan-600 dark:hover:bg-cyan-700",
        clear: "border border-gray-300 bg-white text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
      }
    }
  },
  views:{
    days:{
      items:{
        item:{
          base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-secondary-color hover:text-custom-bg dark:text-white dark:hover:bg-gray-600",
          selected: "bg-secondary-color text-white hover:bg-cyan-600"
        }
      }
    },
    months:{
      items:{
        item:{
          base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-secondary-color hover:text-custom-bg dark:text-white dark:hover:bg-gray-600",
          selected: "bg-secondary-color text-white hover:bg-cyan-600"
        }
      }
    },
    years:{
      items:{
        item:{
          base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-secondary-color hover:text-custom-bg dark:text-white dark:hover:bg-gray-600",
          selected: "bg-secondary-color text-white hover:bg-cyan-600"
        }
      }
    },
    decades:{
      items:{
        item:{
          base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-secondary-color hover:text-custom-bg dark:text-white dark:hover:bg-gray-600",
          selected: "bg-secondary-color text-white hover:bg-cyan-600"
        }
      }
    }
  }
  
}