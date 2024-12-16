import { useState, useEffect } from "react";
import React from "react";
import { Select } from "flowbite-react";
import { selectTheme } from "./theme-flowbite/CustomTheme";

const algos = {
  'Mia': {
    name:'Meanshift',
    desc: "I adapt quickly to find the most popular spots where everyone wants to be."
  },
  'Alex': {
    name:'Affinity Propagation', 
    desc: 'I bring people together based on how closely they align with each other, forming natural groups for the best fit'
  },
  'Bailey': {
    name:'Birch Tree',
    desc: "I'm fast and efficient, especially when there's a lot to sort through. I make sure no one is left behind"
  },
  'Kai': {
    name:'K-Means',
    desc: "I'm straightforward and precise. I'll group everyone into neat clusters based on specific traits."
  }
}

const AlgoSelector: React.FC = () =>{
  const storedAlgo = sessionStorage.getItem('algo') || algos.Mia.name;
  const [algoName,setAlgoName] = useState<string>(storedAlgo);

  const currentKey = Object.keys(algos).find((key) => algos[key as keyof typeof algos].name === algoName) || 'Mia'

  useEffect(() => {
    sessionStorage.setItem('algo', algoName);
  }, [algoName]);

  return(
    <div className="flex flex-col items-center">
      <Select 
      className="w-3/4"
      value={currentKey} 
      onChange={(e) => setAlgoName(algos[e.target.value as keyof typeof algos].name)}
      color="custom" 
      theme={selectTheme}>
        {Object.entries(algos).map(([key, {name}]) =>(
          <option key={key} value={key} className="bg-primary-color focus:bg-custom-bg">
            {key}({name})
          </option>
        ))}
      </Select>
      <div className="mt-4 p-4 max-w-sm h-36 border rounded-lg shadow">
        <h2 className="text-xl font-bold">{algoName}</h2>
        <p className="text-base-text">{algos[currentKey as keyof typeof algos].desc}</p>
      </div>
    </div>
  )
};

export default AlgoSelector;