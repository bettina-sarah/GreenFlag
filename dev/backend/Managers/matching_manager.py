'''
------------------------------------------------------------------------------------
====================================================================================
Filename    : matching_manager.py
Created By  : Vincent Fournier
About       : Contient le gestionnaire des suggestions de correspondances, utilisant
              une variété d'algorithmes de clustering pour déterminer les suggestions
              potentielles pour un utilisateur en fonction de ses activités. Le 
              gestionnaire utilise également le DAO pour accéder aux informations 
              utilisateur et gérer les suggestions et les correspondances.
====================================================================================
------------------------------------------------------------------------------------
'''

from DAOs.matching_dao import MatchingDAO
from Algorithms.algo_strategy import AlgoContext
from Algorithms.algo_meanshift import MeanShift
from Algorithms.algo_affinity_propagation import AffinityPropagation
from Algorithms.algo_birch_tree import Birch
from Algorithms.algo_kmeans import KMeans
import numpy as np

NUMBER_ACTIVITIES = 20

ALGOS = {
    'Meanshift': MeanShift(0.3, 100, 0.001),
    'Affinity Propagation': AffinityPropagation(),
    'Birch Tree': Birch(),
    'K-Means': KMeans(n_clusters=20)
}

class MatchingManager():
    suggestions = []
    matches = []
    
    @staticmethod
    def create_suggestions(user_id: int, algo: str) -> bool:
        try:
            response = MatchingDAO.get_eligible_members(user_id)
            response_2 = None
            prospects_ids = None
            if response:
                prospects_ids = MatchingManager.find_suggestions(user_id, response, algo)
                
            if prospects_ids:
                response_2 = MatchingDAO.create_suggestions(user_id, prospects_ids)
                
            if response and response_2:
                return response_2
            
        except Exception as error:
            print(error)
    
    @staticmethod
    def get_suggestions(data: dict) -> bool:
        try:
            user_id = data.get("id")
            response = MatchingDAO.get_suggestions(user_id)
            
            if not response:
                algo = data.get('algo')
                create = MatchingManager.create_suggestions(user_id, algo)
                response = MatchingDAO.get_suggestions(user_id)
                return response
            elif response:
                return response
            
        except Exception as error:
            print(error)
            
    @staticmethod
    def update_suggestion(data: dict) -> bool:
        try:
            suggestion_id = data.get("suggestion_id")
            situation = data.get("choice")
            params = (situation, suggestion_id)
            response = MatchingDAO.update_suggestion(params)
            if response:
                return response
        except Exception as error:
            print(error)

    @staticmethod
    def unmatch(data: dict) -> bool:
        try:
            user_id = data.get("id")
            unmatched_id = data.get("unmatched_id")
            response = MatchingDAO.unmatch(user_id, unmatched_id)
            if response:
                return response
        except Exception as error:
            print(error)
    
    @staticmethod
    def find_suggestions(user_id:int, members:int, algo:str) -> list[int]:
        MINIMUM_SUGGESTION = 20
        user_activities = np.zeros((1, NUMBER_ACTIVITIES + 1))
        data = np.zeros((len(members), NUMBER_ACTIVITIES + 1))
        user_id = int(user_id)

        if len(members) <= MINIMUM_SUGGESTION:
            prospects_ids = []
            for member in members: 
                if member[0] != user_id:
                    prospects_ids.append(member[0])
            return prospects_ids
        
        
        user_data = MatchingDAO.get_user_activities(user_id)
        user_data[:] = [x - 1 for x in user_data[:]]
        user_activities[0,user_data[0]] += 1
        user_flag_count = MatchingDAO.get_flag_count(user_id)
        user_activities[0,-1] = user_flag_count
        
        index_counter = 0
        members_index = []
        max_flag_count = user_flag_count
        for member in members:
            if member[0] != user_id:
                member_id, member_activities = member
                members_index.append(member_id)
                
                member_activities[:] = [x-1 for x in member_activities]
                data[index_counter,member_activities] += 1
                
                flag_count = MatchingDAO.get_flag_count(member_id)
                max_flag_count = max(max_flag_count, flag_count)
                data[index_counter, -1] = flag_count
                
                index_counter += 1
        
        if max_flag_count > 0:
            data[:,-1] = data[:,-1] / max_flag_count
            user_activities[0,-1] /= max_flag_count
        
        if np.sum(data) > 0:
            Algo = AlgoContext(ALGOS[algo])
        
            Algo.fit(data)
            user_label = Algo.predict(user_activities)
            labels = Algo.get_labels()
            prospects = []
        
            index = 0
            for label in labels:
                if label == user_label:
                    prospects.append(index)
                    
                index += 1
            
            if len(prospects) <= MINIMUM_SUGGESTION:
                cluster_centers = Algo.get_cluster_centers()
                cluster_distances = np.linalg.norm(cluster_centers - user_activities, axis=1)
                sorted_cluster_distances = np.argsort(cluster_distances)
                
                cluster_index = 0
                while len(prospects) < MINIMUM_SUGGESTION:
                    if sorted_cluster_distances[cluster_index] != user_label:
                        index = 0
                        for label in labels:
                            if label == sorted_cluster_distances[cluster_index]:
                                prospects.append(index)
                            index += 1
                            
                    cluster_index += 1
                    
            prospects_ids = [members_index[i] for i in prospects]
            
            return prospects_ids