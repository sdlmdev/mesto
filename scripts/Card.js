class Card {
  constructor(name, link, templateSelector, handleOpenPopup) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleOpenPopup = handleOpenPopup;
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

  _handleLikeCard(evt) {
    evt.target.classList.toggle('cards__like_active');
  }

  _setEventListeners() {
    this._newCard.querySelector('.cards__delete')
    .addEventListener('click', () => this._handleDeleteCard());

    this._newCard.querySelector('.cards__like')
    .addEventListener('click', this._handleLikeCard);

    this._cardsImage.addEventListener('click', () => {
      this._handleOpenPopup(this._name, this._link);
    }); 
  }

  getView() {
    this._newCard = this._getTemplate();
    this._setData();
    this._setEventListeners();

    return this._newCard;
  }
}

export default Card;