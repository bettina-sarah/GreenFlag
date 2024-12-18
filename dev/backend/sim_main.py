'''
------------------------------------------------------------------------------------
====================================================================================
Filename    : sim_main.py
Created By  : Bettina-Sarah Janesch
About       : Contient un main separé pour pouvoir rouler le simulateur afin de
              populer la base de données avec des usagers, créer des suggestions
              et faire des swipes.
====================================================================================
------------------------------------------------------------------------------------
'''

from Simulation.test_simulator import TestSimulator

import logging
import coloredlogs

level_styles = {
    'debug': {'color': 'blue'},
    'info': {'color': 'green'},
    'warning': {'color': 'yellow'},
    'error': {'color': 'red'},
    'critical': {'color': 'magenta'}
}

coloredlogs.install(level='DEBUG', level_styles=level_styles)
logger = logging.getLogger(__name__)

if __name__ == '__main__':
    sim = TestSimulator()
    sim.create_random_users(500)
    sim._create_pending_suggestions()
    sim.swipe()
    sim.fill_conversations()

