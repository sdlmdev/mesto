import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, {handlerPopupSubmit}) {
    super(popupSelector);
    this._handlerPopupSubmit = handlerPopupSubmit;
    this._form = this._popupElement.querySelector('.popup__form');
    this._inputs = this._form.querySelectorAll('.popup__input');
    this._submitButton = this._form.querySelector('.popup__button');
    this._submitButtonText = this._submitButton.textContent;
  }

  _getInputValues() {
    this._inputValues = {};

    this._inputs.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    
    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._handlerPopupSubmit(this._getInputValues());
    });
  }

  setProcessStatus(process) {
    if (process) {
      this._submitButton.textContent = 'Сохранение...';
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  close() {
    super.close();
    this._form.reset();
  }
}