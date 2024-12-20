/*
------------------------------------------------------------------------------------
====================================================================================
Filename    : constants.ts
Created By  : Vincent Fournier et Bettina-Sarah Janesch
About       : Ce fichier définit une serie de constantes utilisées partout dans le projet.
====================================================================================
------------------------------------------------------------------------------------
*/

export const IP_SERVER = 'http://127.0.0.1:5000'

export const ALGORITHMS = {
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

export const FLAG_REASONS = [
    'Inappropriate msgs',
    'Fake profile',
    'Harassment or bullying',
    'Spam or promotion',
    'Looking for casual hookups',
    'Ghosting or inconsistent communication',
    'Misleading profile information'
]