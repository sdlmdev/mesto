const popupElem = document.querySelector('.popup');
const editElem = document.querySelector('.profile__editor');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_content_username');
const descriptionInput = formElement.querySelector('.popup__input_content_description');
const popupClose = popupElem.querySelector('.popup__close');
const cards = document.querySelector('.cards');
const cardTemplate = document.querySelector('.card-template').content;
const popupAddCard = document.querySelector('.popup-card');
const profileAddBtn = document.querySelector('.profile__add');
const popupCloseAddForm = document.querySelector('.popup-card__close');
const popupCardForm = document.querySelector('.popup-card__form');
const popupInputName = document.querySelector('.popup__input_content_name');
const popupInputLink = document.querySelector('.popup__input_content_link');
const popupFigure = document.querySelector('.popup-image');
const popupFigureClose = popupFigure.querySelector('.popup-image__close');
const popupFigureImage = document.querySelector('.popup-image__picture');
const popupFigureCaption = document.querySelector('.popup-image__caption');

function onOpen(popup) {
  popup.classList.add('popup_opened');

  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function onClose(popup) {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  
  onClose(popupElem);
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
    popupFigureImage.src = cardsImage.src;
    popupFigureImage.alt = cardsImage.alt;
    popupFigureCaption.textContent = cardsTitle.textContent;

    onOpen(popupFigure);
  });

  return cardsElement;
}

function renderCard(dataCard) {
  cards.prepend(dataCard);
}

initialCards.forEach((card) => {
  renderCard(generateCard(card.name, card.link));
});

formElement.addEventListener('submit', formSubmitHandler);
editElem.addEventListener('click', () => onOpen(popupElem));
profileAddBtn.addEventListener('click', () => onOpen(popupAddCard));
popupClose.addEventListener('click', () => onClose(popupElem));
popupFigureClose.addEventListener('click', () => onClose(popupFigure));
popupCloseAddForm.addEventListener('click', () => onClose(popupAddCard));
popupCardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  renderCard(generateCard(popupInputName.value, popupInputLink.value));

  onClose(popupAddCard);
});