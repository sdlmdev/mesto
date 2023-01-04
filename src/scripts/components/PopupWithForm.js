import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, {handlerPopupSubmit}) {
    super(popupSelector);
    this._handlerPopupSubmit = handlerPopupSubmit;
    this._form = this._popupElement.querySelector('.popup__form');
    this._inputs = this._form.querySelectorAll('.popup__input');
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

  close() {
    super.close();
    this._form.reset();
  }
}