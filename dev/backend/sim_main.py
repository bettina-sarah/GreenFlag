
from Simulation.test_simulator import TestSimulator

if __name__ == '__main__':
    sim = TestSimulator()
    sim.create_random_users(200)
    sim._create_pending_suggestions()
    # sim.swipe()