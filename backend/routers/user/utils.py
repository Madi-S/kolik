from loguru import logger


STANDARD_PHONE_LENGTH = 12


class PhoneEntity:
    def __init__(self, phone) -> None:
        self.phone = phone

    def confirmation_code_sent(self, code) -> bool:
        """Returns `True` if the code was successfully sent"""
        "TODO: Using public APIs send confirmation `code` to `phone`"
        logger.debug("Sending confirmation code {} to {}", code, self.phone)
        return True

    @staticmethod
    def is_valid(phone: str) -> bool:
        """Returns `True` if the phone is written in the correct format, otherwise `False`"""
        return phone.startswith("+") and len(phone) == STANDARD_PHONE_LENGTH
