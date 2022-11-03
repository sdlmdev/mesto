const popupElem = document.querySelector('.popup');
const editElem = document.querySelector('.profile__editor');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input-username');
const descriptionInput = formElement.querySelector('.popup__input-description');
const popupClose = popupElem.querySelector('.popup__close');

function onOpen(popup) {
  popup.classList.add('popup_opened');
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

editElem.addEventListener('click', () => {
  onOpen(popupElem);
});

formElement.addEventListener('submit', formSubmitHandler);

popupClose.addEventListener('click', formSubmitHandler);