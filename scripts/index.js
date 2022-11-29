const profilePopup = document.querySelector('.profile-popup');
const editElem = document.querySelector('.profile__editor');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_content_username');
const descriptionInput = formElement.querySelector('.popup__input_content_description');
const cardsContainer = document.querySelector('.cards');
const cardTemplate = document.querySelector('.card-template').content;
const popupAddCard = document.querySelector('.popup-card');
const profileAddBtn = document.querySelector('.profile__add');
const popupCardForm = document.querySelector('.popup-card__form');
const popupInputName = document.querySelector('.popup__input_content_name');
const popupInputLink = document.querySelector('.popup__input_content_link');
const popupFigure = document.querySelector('.popup-image');
const popupFigureImage = document.querySelector('.popup-image__picture');
const popupFigureCaption = document.querySelector('.popup-image__caption');
const popupsContainer = document.querySelectorAll('.popup');
const popupButtonSave = document.querySelector('.profile-popup__save');
const popupButtonCreate = document.querySelector('.popup-card__create');

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEscapeKey);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEscapeKey);
}

function handleDeleteCard(event) {
  event.target.closest('.cards__element').remove();
}

function handleLikeCard(event) {
  event.target.classList.toggle('cards__like_active');
}

function generateCard (cardName, cardLink) {
  const cardsElement = cardTemplate.querySelector('.cards__element').cloneNode(true);
  const cardsImage = cardsElement.querySelector('.cards__image');
  const cardsTitle = cardsElement.querySelector('.cards__title');
  const deleteBtn = cardsElement.querySelector('.cards__delete');
  const likeBtn = cardsElement.querySelector('.cards__like');

  cardsImage.alt = cardName;
  cardsImage.src = cardLink;
  cardsTitle.textContent = cardName;

  deleteBtn.addEventListener('click', handleDeleteCard);
  likeBtn.addEventListener('click', handleLikeCard);

  cardsImage.addEventListener('click', () => {
    popupFigureImage.src = cardLink;
    popupFigureImage.alt = cardName;
    popupFigureCaption.textContent = cardName;

    openPopup(popupFigure);
  });

  return cardsElement;
}

function renderCard(dataCard) {
  cardsContainer.prepend(dataCard);
}

function closePopupEscapeKey(event) {
  if (event.key === 'Escape') {
    const currentPopup = document.querySelector('.popup_opened');
    closePopup(currentPopup);
  }
}

function disableButton(evt) {
  if (!evt.classList.contains(settings.inactiveButtonClass)) {
    evt.classList.add(settings.inactiveButtonClass);
    evt.setAttribute('disabled', '');
  }
}

initialCards.forEach((card) => {
  renderCard(generateCard(card.name, card.link));
});

popupsContainer.forEach((element) => {
  element.addEventListener('mousedown', (evt) => { 
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close')) { 
      closePopup(element); 
    }; 
  }); 
});  

profileAddBtn.addEventListener('click', () => {
  openPopup(popupAddCard);

  popupCardForm.reset();
});

editElem.addEventListener('click', () => {
  openPopup(profilePopup);

  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
});

popupCardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  renderCard(generateCard(popupInputName.value, popupInputLink.value));

  closePopup(popupAddCard);
});

formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;

  closePopup(profilePopup);
});

document.addEventListener('click', (evt) => {
  if(evt.target.classList.contains('profile__editor')) {
    hideInputError(profilePopup, nameInput);
    hideInputError(profilePopup, descriptionInput);
    disableButton(popupButtonSave);
  }

  if(evt.target.classList.contains('profile__add')) {
    hideInputError(popupAddCard, popupInputName);
    hideInputError(popupAddCard, popupInputLink);
    disableButton(popupButtonCreate);
  }
});