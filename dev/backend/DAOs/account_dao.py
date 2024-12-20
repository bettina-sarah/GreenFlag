'''
------------------------------------------------------------------------------------
====================================================================================
Filename    : account_dao.py
Created By  : Bettina-Sarah Janesch
About       : La classe AccountDAO hérite de DAO et fournit des méthodes statiques 
              pour interagir avec la base de données PostgreSQL, permettant de gérer 
              des comptes utilisateurs (connexion, création, mise à jour des 
              informations, gestion des tokens, modification de mot de passe, 
              suppression de compte, etc.) et d'effectuer des opérations liées à des
              informations de profil, photos, préférences et localisation des membres.
====================================================================================
------------------------------------------------------------------------------------
'''

from DAOs.dao import DAO
from typing import List

import logging

class AccountDAO(DAO):

    @staticmethod
    def login(params: tuple) -> bool:
        query = 'SELECT id, profile_completed FROM member WHERE email = %s and member_password = %s'
        response = AccountDAO._prepare_statement("select", query, params)
        return response

    @staticmethod
    def create_account(params: tuple) -> int:
            query = 'INSERT INTO member (first_name, last_name, email, member_password) VALUES (%s, %s, %s, %s) RETURNING id;'
            response = AccountDAO._prepare_statement("insert", query, params)
            return response
    
    @staticmethod
    def confirm_email(params: tuple) -> bool:
        query = 'UPDATE member SET email_confirmed = true WHERE id = %s;'
        response = AccountDAO._prepare_statement("update", query, params)
        return response

    @staticmethod
    def confirm_fake(params: tuple) -> bool:
        query = 'UPDATE member SET fake_member = true WHERE id = %s;'
        response = AccountDAO._prepare_statement("update", query, params)
        return response
    
    @staticmethod
    def complete_profile(params: tuple) -> bool:
        query = 'UPDATE member SET profile_completed = true WHERE id = %s;'
        response = AccountDAO._prepare_statement("update", query, params)
        return response
    
    @staticmethod
    def save_token(params: tuple) -> bool:
        query = 'UPDATE member SET token = %s WHERE id = %s;'
        response = AccountDAO._prepare_statement("update", query, params)
        return response
    
    @staticmethod
    def does_token_exist(params: tuple) -> bool:
        query = 'SELECT EXISTS(SELECT 1 FROM member WHERE id = %s AND token = %s) AS is_valid;'
        response = AccountDAO._prepare_statement("select", query, params)
        return response
    
    @staticmethod
    def verify_password(params: tuple) -> bool:
        query = 'SELECT id, profile_completed FROM member WHERE email = %s and member_password = %s;'
        response = AccountDAO._prepare_statement("select", query, params)
        return response[0]
    
    @staticmethod
    def modify_password(params: tuple) -> bool:
        query = 'UPDATE member SET member_password = %s WHERE id = %s;'
        response = AccountDAO._prepare_statement('update', query, params)
        return response
    
    @staticmethod
    def delete_account(params: tuple) -> bool:
        query = 'DELETE FROM member where email = %s and member_password = %s;'
        response = AccountDAO._prepare_statement("delete", query, params)
        return response

    @staticmethod
    def get_user_infos(user_id: int) -> List[tuple]:
        query = "SELECT * FROM member_activities_view WHERE member_id = %s;"
        params = (user_id,)
        response = AccountDAO._prepare_statement("select", query, params)
        return response
    
    @staticmethod
    def get_profile(params: tuple) -> List[tuple]:
        query = 'SELECT * FROM member where id = %s;'
        response = AccountDAO._prepare_statement("select", query, params)
        return response
    
    @staticmethod
    def modify_profile(params: tuple) -> bool:
        query = 'UPDATE member SET first_name =%s, last_name = %s WHERE email = %s and member_password = %s;'
        response = AccountDAO._prepare_statement("update", query, params)
        return response
    
    @staticmethod
    def update_preferences(columns,values,user_id) -> bool:
        query = "UPDATE member SET " + ", ".join([f"{col} = %s" for col in columns]) + " WHERE id = %s"
        params = values + [user_id]
        response = AccountDAO._prepare_statement("update", query, params)
        return response

    @staticmethod
    def add_photos(params: tuple) -> bool:
        logging.warning(f'photo added, key: {params}')
        query = 'SELECT add_photos(%s, %s);'
        response = AccountDAO._prepare_statement("select", query, params)
        if response:
            return response
        return False
    
    @staticmethod
    def get_photos(params: tuple, extraquery=';') -> List[tuple]:   
        query = 'SELECT encryption_key from member_photos_view where member_id = %s' + extraquery
        response = AccountDAO._prepare_statement("select", query, params)
        if response:
            return response
        return False

    @staticmethod
    def update_hobbies(params: tuple) -> bool:
        query = 'SELECT update_hobbies(%s, %s);'
        response = AccountDAO._prepare_statement("select", query, params)
        return response
    
    @staticmethod
    def update_localisation(params: tuple) -> bool:
        query = 'UPDATE member SET last_lat = %s, last_long = %s WHERE id = %s'
        response = AccountDAO._prepare_statement('update', query, params)
        return response
    
    @staticmethod
    def get_location(params: tuple) -> bool:
        query = 'SELECT fetch_distance(%s, %s);'
        response = AccountDAO._prepare_statement('select', query, params)
        return response

    @staticmethod
    def get_fake_users(params: tuple) -> list:
        query = 'SELECT id from member where fake_member = %s'
        response = AccountDAO._prepare_statement('select', query, params)
        return response