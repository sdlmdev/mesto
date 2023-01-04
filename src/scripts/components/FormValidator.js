class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector);
  }

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  _hideInputError(inputElement) {
    const inputErrorId = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._settings.inputErrorClass);
    inputErrorId.textContent = '';
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _toggleButtonStatus() {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.setAttribute('disabled', true);
      this._buttonElement.classList.add(this._settings.inactiveButtonClass);
    } else {
      this._buttonElement.removeAttribute('disabled', '');
      this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
    }
  }

  _setEventListeners() {
    this._toggleButtonStatus();
  
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonStatus();
      });
    });
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  disableButton() {
    if (!this._buttonElement.classList.contains(this._settings.inactiveButtonClass)) {
      this._buttonElement.classList.add(this._settings.inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', '');
    }
  }

  resetValidation() {
    this._toggleButtonStatus();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}

export default FormValidator;