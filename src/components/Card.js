export default class Card {
  constructor(name, link, templateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }
  
  _getTemplate() {
    const newCard = document
    .querySelector(this._templateSelector)
    .content.querySelector('.cards__element')
    .cloneNode(true);

    return newCard;
  }

  _setData() {
    this._cardTitle = this._newCard.querySelector('.cards__title');
    this._cardsImage = this._newCard.querySelector('.cards__image');

    this._cardTitle.textContent = this._name;
    this._cardsImage.src = this._link;
    this._cardsImage.alt = this._name;
  }

  _handleDeleteCard() {
    this._newCard.remove();
    this._newCard = null;
  }

  _handleLikeCard() {
    this._buttonLike.classList.toggle('cards__like_active');
  }

  _setEventListeners() {
    this._newCard.querySelector('.cards__delete')
    .addEventListener('click', () => this._handleDeleteCard());

    this._buttonLike = this._newCard.querySelector('.cards__like');
    this._buttonLike.addEventListener('click', () => this._handleLikeCard());

    this._cardsImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    }); 
  }

  getView() {
    this._newCard = this._getTemplate();
    this._setData();
    this._setEventListeners();

    return this._newCard;
  }
}