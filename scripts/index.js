import Card from './Card.js';
import FormValidator from './FormValidator.js';
export {openPopup};

const profilePopup = document.querySelector('.profile-popup');
const editElem = document.querySelector('.profile__editor');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_content_username');
const descriptionInput = formElement.querySelector('.popup__input_content_description');
const cardsContainer = document.querySelector('.cards');
const popupAddCard = document.querySelector('.popup-card');
const profileAddBtn = document.querySelector('.profile__add');
const popupCardForm = document.querySelector('.popup-card__form');
const popupInputName = document.querySelector('.popup__input_content_name');
const popupInputLink = document.querySelector('.popup__input_content_link');
const popupsContainer = document.querySelectorAll('.popup');

const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error'
};

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEscapeKey);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEscapeKey);
}

function renderCard(name, link, template) {
  const card = new Card(name, link, template);
  cardsContainer.prepend(card.getView());
}

function closePopupEscapeKey(event) {
  if (event.key === 'Escape') {
    const currentPopup = document.querySelector('.popup_opened');
    closePopup(currentPopup);
  }
}

initialCards.forEach((dataCard) => {
  renderCard(dataCard.name, dataCard.link);
});

popupCardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  renderCard(popupInputName.value, popupInputLink.value);
  closePopup(popupAddCard);
});

popupsContainer.forEach((element) => {
  element.addEventListener('mousedown', (evt) => { 
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close')) { 
      closePopup(element); 
    }
  }); 
});  

formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;

  closePopup(profilePopup);
});

const editFormValidator = new FormValidator(settings, formElement);
const addFormValidator = new FormValidator(settings, formElement);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

profileAddBtn.addEventListener('click', () => {
  addFormValidator.resetValidation();
  addFormValidator.disableButton();
  openPopup(popupAddCard);
  popupCardForm.reset();
});

editElem.addEventListener('click', () => {
  editFormValidator.resetValidation();
  editFormValidator.disableButton();
  openPopup(profilePopup);

  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
});

