from loguru import logger


STANDARD_PHONE_LENGTH = 12


class PhoneEntity:
    def __init__(self, phone) -> None:
        self.phone = phone

    def is_valid(self) -> bool:
        'TODO: Later transform to property getter'
        return len(self.phone) == STANDARD_PHONE_LENGTH and self.phone.startswith('+')

    def confirmation_code_sent(self, code) -> bool:
        '''Returns `True` if the code was successfully sent'''
        'TODO: Using public APIs send confirmation `code` to `phone`'
        logger.debug('Sending confirmation code {} to {}', code, self.phone)
        return True
