import Card from './scripts/components/Card.js';
import FormValidator from './scripts/components/FormValidator.js';
import {initialCards, validationSettings} from './utils/data.js';
import './pages/index.css';
import Section from './scripts/components/Section.js';
import PopupWithImage from './scripts/components/PopupWithImage.js';
import PopupWithForm from './scripts/components/PopupWithForm.js';
import UserInfo from './scripts/components/UserInfo.js';
import { 
  profilePopup,
  popupAddCard,
  editElem,
  profileName,
  profileDescription,
  profilePopupForm,
  nameInput,
  descriptionInput,
  cardsContainer,
  profileAddBtn,
  popupCardForm,
  popupFigure
} from './utils/constants.js';

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

function createCard(data) {
  const card = new Card(data.name, data.link, '#card-template', handleCardClick);
  const cardElement = card.getView();

  return cardElement;
}

const section = new Section({
  items: initialCards,
  renderer: (data) => {
    section.addItem(createCard(data));
  }
}, cardsContainer);

const popupWithImage = new PopupWithImage(popupFigure);

popupWithImage.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: profileName,
  descriptionSelector: profileDescription
});

const popupEditForm = new PopupWithForm(profilePopup, {
  handlerPopupSubmit: (data) => { 
    userInfo.setUserInfo(data.username, data.description);
    popupEditForm.close();
  }
});

popupEditForm.setEventListeners();

const popupAddForm = new PopupWithForm(popupAddCard, {
  handlerPopupSubmit: (data) => {
    section.addItem(createCard(data));
    popupAddForm.close();
  }
});

popupAddForm.setEventListeners();

profileAddBtn.addEventListener('click', () => {
  addFormValidator.resetValidation();
  addFormValidator.disableButton();
  popupAddForm.open();
});

editElem.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  descriptionInput.value = userData.description;
  
  editFormValidator.resetValidation();
  editFormValidator.disableButton();
  popupEditForm.open();
});

const editFormValidator = new FormValidator(validationSettings, profilePopupForm);
const addFormValidator = new FormValidator(validationSettings, popupCardForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

section.renderer();