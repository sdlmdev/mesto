import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {initialCards, validationSettings} from '../utils/data.js';
import './index.css';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { 
  editElem,
  profilePopupForm,
  nameInput,
  descriptionInput,
  profileAddBtn,
  popupCardForm,
} from '../utils/constants.js';

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
}, '.cards');

const popupWithImage = new PopupWithImage('.popup-image');

popupWithImage.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  descriptionSelector: '.profile__description'
});

const popupEditForm = new PopupWithForm('.profile-popup', {
  handlerPopupSubmit: (data) => { 
    userInfo.setUserInfo(data.username, data.description);
    popupEditForm.close();
  }
});

popupEditForm.setEventListeners();

const popupAddForm = new PopupWithForm('.popup-card', {
  handlerPopupSubmit: (data) => {
    section.addItem(createCard(data));
    popupAddForm.close();
  }
});

popupAddForm.setEventListeners();

profileAddBtn.addEventListener('click', function () {
  popupAddForm.open();
  popupAddFormValidator.resetValidation();
});

editElem.addEventListener('click', function () {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  descriptionInput.value = userData.description;
  
  popupEditForm.open();
  popupEditFormValidator.resetValidation();
});

const popupEditFormValidator = new FormValidator(validationSettings, profilePopupForm);
const popupAddFormValidator = new FormValidator(validationSettings, popupCardForm);

popupEditFormValidator.enableValidation();
popupAddFormValidator.enableValidation();

section.renderer();