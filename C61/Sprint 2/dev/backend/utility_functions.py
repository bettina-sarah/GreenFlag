from functools import wraps

def requires_token(my_function) -> function: 
    @wraps(my_function)
    def decorated(*args, **kwargs):
        print('i am wrapped')
            # retour des plusieurs param dans fonction
        return my_function(*args,**kwargs)
    return decorated