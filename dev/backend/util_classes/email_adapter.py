# email 3rd party service here

class EmailAdapter:
    def __init__(self) -> None:
        self.password_reset = ""
        self.authentication_text = ""

    def send_email(self, email, subject, message):
        pass

    def send_authentication_email(self, to, subject, body, link) -> bool:
        pass

    def send_password_reset_email(self, to, subject, body, link) -> bool:
        pass
