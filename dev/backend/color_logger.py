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