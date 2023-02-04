import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import { validationSettings } from '../utils/data.js';
import './index.css';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import { configApi } from '../components/Api.js';
import { 
  editElem,
  profilePopupForm,
  nameInput,
  descriptionInput,
  profileAddBtn,
  popupCardForm,
  avatarPopup,
  avatarEditBtn
} from '../utils/constants.js';

let userId;

function createCard(data) {
  const card = new Card(data, userId, '#card-template', {
    handleCardClick: (name, link) => {
      popupWithImage.open(name, link);
    },
    handleOpenConfirm: () => {
      popupConfirm.open(card);
    },
    handleLikeCard: () => {
      api.putLikeCard(card._id).then(res => {
        card.getCountLikes(res);
        card.toggleLike();
      })
      .catch(err => console.log(err));
    },
    handleDeleteLike: () => {
      api.deleteLikeCard(card._id).then(res => {
        card.getCountLikes(res);
        card.toggleLike();
      })
      .catch(err => console.log(err));
    }
  });
  const cardElement = card.getView();

  card.checkLike();

  return cardElement;
}

const api = new Api(configApi);

const section = new Section({
  renderer: data => {
    section.addItem(createCard(data));
  }
}, '.cards');

const popupWithImage = new PopupWithImage('.popup-image');

popupWithImage.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  descriptionSelector: '.profile__description',
  avatarSelector: '.profile__avatar'
});

const popupEditForm = new PopupWithForm('.profile-popup', {
  handlerPopupSubmit: data => {
    popupEditForm.setProcessStatus(true);
    api.setUserData({name: data.username, about: data.description}).then(data => {
      userInfo.setUserInfo(data.name, data.about);
    })
    .catch(err => console.log(err))
    .finally(() => popupEditForm.setProcessStatus(false));

    popupEditForm.close();
  }
});

popupEditForm.setEventListeners();

const popupEditAvatar = new PopupWithForm('.popup-avatar', {
  handlerPopupSubmit: data => {
    popupEditAvatar.setProcessStatus(true);
    api.changeAvatar({avatar: data.avatar}).then(data => {
      userInfo.setUserAvatar(data.avatar);
    })
    .catch(err => console.log(err))
    .finally(() => popupEditAvatar.setProcessStatus(false));

    popupEditAvatar.close();
  }
});

popupEditAvatar.setEventListeners();

const popupAddForm = new PopupWithForm('.popup-card', {
  handlerPopupSubmit: data => {
    popupAddForm.setProcessStatus(true);
    api.addNewCard(data)
    .then(data => {
      section.addItem(createCard(data));
    })
    .catch(err => console.log(err))
    .finally(() => popupAddForm.setProcessStatus(false));
    
    popupAddForm.close();
  }
});

popupAddForm.setEventListeners();

const popupConfirm = new PopupWithConfirmation('.popup-delete', card => {
  api.deleteCard(card._id)
  .then(() => {
    card.deleteCard();
    popupConfirm.close();
  })
  .catch(err => console.log(err));
});

popupConfirm.setEventListeners();

const popupEditFormValidator = new FormValidator(validationSettings, profilePopupForm);
const popupAddFormValidator = new FormValidator(validationSettings, popupCardForm);
const popupAvatarFormValidator = new FormValidator(validationSettings, avatarPopup);

popupEditFormValidator.enableValidation();
popupAddFormValidator.enableValidation();
popupAvatarFormValidator.enableValidation();

profileAddBtn.addEventListener('click', () => {
  popupAddForm.open();
  popupAddFormValidator.resetValidation();
});

editElem.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  descriptionInput.value = userData.description;
  
  popupEditForm.open();
  popupEditFormValidator.resetValidation();
});

avatarEditBtn.addEventListener('click', () => {
  popupEditAvatar.open();
  popupAvatarFormValidator.resetValidation();
});

Promise.all([ api.getInitialCards(), api.getUserData() ])
  .then(([ cards, userData ]) => {
    userId = userData._id;
    cards.reverse();
    section.renderer(cards);
    userInfo.setUserInfo(userData.name, userData.about);
    userInfo.setUserAvatar(userData.avatar);
  })
  .catch(err => console.log(err));