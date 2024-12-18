import { useState, useEffect } from "react";
import React from "react";
import { Select } from "flowbite-react";
import { selectTheme } from "./theme-flowbite/CustomTheme";
import { ALGORITHMS } from "@/constants";

const AlgoSelector: React.FC = () =>{
  const storedAlgo = sessionStorage.getItem('algo') || ALGORITHMS.Mia.name;
  const [algoName,setAlgoName] = useState<string>(storedAlgo);

  const currentKey = Object.keys(ALGORITHMS).find((key) => ALGORITHMS[key as keyof typeof ALGORITHMS].name === algoName) || 'Mia'

  useEffect(() => {
    sessionStorage.setItem('algo', algoName);
  }, [algoName]);

  return(
    <div className="flex flex-col items-center">
      <Select 
      className="w-3/4"
      value={currentKey} 
      onChange={(e) => setAlgoName(ALGORITHMS[e.target.value as keyof typeof ALGORITHMS].name)}
      color="custom" 
      theme={selectTheme}>
        {Object.entries(ALGORITHMS).map(([key, {name}]) =>(
          <option key={key} value={key} className="bg-primary-color focus:bg-custom-bg">
            {key}({name})
          </option>
        ))}
      </Select>
      <div className="mt-4 p-4 max-w-sm h-36 rounded-lg shadow">
        <h2 className="text-xl font-bold">{algoName}</h2>
        <p className="text-base-text">{ALGORITHMS[currentKey as keyof typeof ALGORITHMS].desc}</p>
      </div>
    </div>
  )
};

export default AlgoSelector;