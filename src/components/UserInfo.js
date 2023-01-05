export default class UserInfo {
  constructor({ nameSelector, descriptionSelector}) {
    this._nameSelector = document.querySelector(nameSelector);
    this._descriptionSelector = document.querySelector(descriptionSelector);
  }

  getUserInfo() {
    const userData = {
      name: this._nameSelector.textContent,
      description: this._descriptionSelector.textContent
    };

    return userData;
  }

  setUserInfo(name, description) {
    this._nameSelector.textContent = name;
    this._descriptionSelector.textContent = description;
  }
}