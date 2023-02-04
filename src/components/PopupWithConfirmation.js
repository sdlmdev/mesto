import Popup from "./Popup";
export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handlerPopupSubmit) {
    super(popupSelector);
    this._handlerPopupSubmit = handlerPopupSubmit;
    this._form = this._popupElement.querySelector('.popup__form');
  }
  
  open(card) {
    this._card = card;

    super.open();
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._handlerPopupSubmit(this._card);
    });
  }
}