const popupElem = document.querySelector('.popup'),
      editElem = document.querySelector('.profile__editor'),
      profileName = document.querySelector('.profile__name'),
      profileDescription = document.querySelector('.profile__description'),
      formElement = document.querySelector('.popup__form'),
      nameInput = formElement.querySelector('.popup__input-username'),
      descriptionInput = formElement.querySelector('.popup__input-description'),
      cardElements = document.querySelector('.cards');

editElem.addEventListener('click', () => {
  onOpen(popupElem);
});

popupElem.addEventListener('click', (event) => {
  const isOverlay = event.target.classList.contains('popup_opened'),
        isClose = event.target.classList.contains('popup__close'),
        isButton = event.target.classList.contains('popup__button-save');

  if(isOverlay || isClose || isButton) {
    onClose(popupElem);
  }
});

function formSubmitHandler (evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
}

formElement.addEventListener('submit', formSubmitHandler);

cardElements.addEventListener('click', (event) => {
  if (event.target.classList.contains('cards__like')) {
    event.target.classList.toggle('cards__like-active');
  }
});

function onOpen(popup) {
  popup.classList.add('popup_opened');
}

function onClose(popup) {
  popup.classList.remove('popup_opened');
}