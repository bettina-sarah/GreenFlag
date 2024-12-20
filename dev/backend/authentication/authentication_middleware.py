'''
------------------------------------------------------------------------------------
====================================================================================
Filename    : authentication_middleware.py
Created By  : Bettina-Sarah Janesch
About       : Cette classe gère la validation et le renouvellement des sessions
              d'utilisateur en vérifiant l'état des tokens JWT. Elle fournit une 
              méthode pour vérifier si un token est valide ou expiré, et génère un 
              nouveau token si nécessaire. Si le token est sur le point d'expirer ou 
              déjà expiré, un nouveau token est créé et renvoyé, garantissant ainsi 
              une gestion sécurisée de l'authentification utilisateur.
====================================================================================
------------------------------------------------------------------------------------
'''


from authentication.crypt_keeper import CryptKeeper

class AuthenticationMiddleware:
    def __init__(self) -> None:
        pass
    
    def check_session_validity(self, token:str) -> bool:
        cryptkeeper = CryptKeeper()
        is_valid, user_id = cryptkeeper.decode(token)
        if isinstance(is_valid, bool):
            return is_valid, user_id
        # we generate a new token if token is expired OR almost expiring
        new_token = self.generate_token(user_id)
        print('new token: ', new_token)
        return new_token, user_id

    def generate_token(self, user_id:str) -> str:
        cryptkeeper = CryptKeeper()
        encoded_token = cryptkeeper.encode(user_id)
        return encoded_token

    

