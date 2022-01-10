

class PhoneEntity:
    def __init__(self, phone) -> None:
        self.phone = phone

    def is_valid(self) -> bool:
        'TODO: Later transform to property getter'
        return len(self.phone) == '12' and self.phone.startswith('+')

    def confirmation_code_sent(code) -> bool:
        '''Returns `True` if the code was successfully sent'''
        'TODO: Using public APIs send confirmation `code` to `phone`'
        
        return True
