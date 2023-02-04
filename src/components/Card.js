export default class Card {
  constructor(data, userId, cardTemplate, { handleCardClick, handleOpenConfirm, handleLikeCard, handleDeleteLike }) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._id = data._id;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
    this._handleOpenConfirm = handleOpenConfirm;
    this._handleLikeCard = handleLikeCard;
    this._handleDeleteLike = handleDeleteLike;
  }
  
  _getTemplate() {
    const newCard = document
    .querySelector(this._cardTemplate)
    .content.querySelector('.cards__element')
    .cloneNode(true);

    return newCard;
  }

  _setData() {
    this._cardTitle = this._newCard.querySelector('.cards__title');
    this._cardsImage = this._newCard.querySelector('.cards__image');
    this._countLikes = this._newCard.querySelector('.cards__like-counter');
    this._deleteCard = this._newCard.querySelector('.cards__delete');
    this._buttonLike = this._newCard.querySelector('.cards__like');

    this._cardTitle.textContent = this._name;
    this._cardsImage.src = this._link;
    this._cardsImage.alt = this._name;
    this._countLikes.textContent =  this._likes.length;

    this._clearCountLikes();

    if (this._userId !== this._ownerId) {
      this._deleteCard.remove();
    }
  }

  checkLike() {
    this._likes.forEach((users) => {
      if (users._id == this._userId) {
        this._buttonLike.classList.add('cards__like_active');
      }
    });
  }

  getCountLikes(num) {
    this._countLikes.textContent = num.likes.length;
  }

  deleteCard() {
    this._newCard.remove();
    this._newCard = null;
  }

  toggleLike() {
    this._buttonLike.classList.toggle('cards__like_active');
    this._clearCountLikes();
  }

  _clearCountLikes() {
    if (this._countLikes.textContent == 0) {
      this._countLikes.textContent = '';
    }
  }

  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => {
      if (this._buttonLike.classList.contains('cards__like_active')) {
        this._handleDeleteLike();
      } else {
        this._handleLikeCard();
      }
    });

    this._cardsImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    }); 

    this._deleteCard.addEventListener('click', () => {
      this._handleOpenConfirm();
    });
  }

  getView() {
    this._newCard = this._getTemplate();
    this._setData();
    this._setEventListeners();

    return this._newCard;
  }
}