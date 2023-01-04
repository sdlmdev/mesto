import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupFigureImage = this._popupElement.querySelector('.popup-image__picture'); 
    this._popupFigureCaption = this._popupElement.querySelector('.popup-image__caption');
  }

  open(name, link) {
    this._popupFigureImage.src = link;
    this._popupFigureImage.alt = name;
    this._popupFigureCaption.textContent = name;

    super.open();
  }
}