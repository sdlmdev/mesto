import {openPopup} from './index.js'; 

class Card {
  constructor(name, link, template) {
    this._name = name;
    this._link = link;
    this._template = template;
  }

  _getTemplate() {
    this._template = document
    .querySelector('.card-template')
    .content.querySelector('.cards__element')
    .cloneNode(true);

    return this._template;
  }

  _setData() {
    const cardTitle = this._newCard.querySelector('.cards__title');
    const cardsImage = this._newCard.querySelector('.cards__image');
    const popupFigureImage = document.querySelector('.popup-image__picture');
    const popupFigureCaption = document.querySelector('.popup-image__caption');
    const popupFigure = document.querySelector('.popup-image');

    cardTitle.textContent = this._name;
    cardsImage.src = this._link;
    cardsImage.alt = this._name;

    cardsImage.addEventListener('click', () => {
          popupFigureImage.src = this._link;
          popupFigureImage.alt = this._name;
          popupFigureCaption.textContent = this._name;
      
          openPopup(popupFigure);
    });
  }

  _handleDeleteCard() {
    this._newCard.remove();
    this._newCard = null;
  }

  _handleLikeCard() {
    this._newCard.querySelector('.cards__like').classList.toggle('cards__like_active');
  }

  _setEventListeners() {
    const deleteBtn = this._newCard.querySelector('.cards__delete');
    deleteBtn.addEventListener('click', () => this._handleDeleteCard());

    const likeBtn = this._newCard.querySelector('.cards__like');
    likeBtn.addEventListener('click', () => this._handleLikeCard());
  }

  getView() {
    this._newCard = this._getTemplate();
    this._setData();
    this._setEventListeners();

    return this._newCard;
  }
}

export default Card;