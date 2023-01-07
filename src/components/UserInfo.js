export default class UserInfo {
  constructor({ nameSelector, descriptionSelector}) {
    this._userName = document.querySelector(nameSelector);
    this._description = document.querySelector(descriptionSelector);
  }

  getUserInfo() {
    const userData = {
      name: this._userName.textContent,
      description: this._description.textContent
    };

    return userData;
  }

  setUserInfo(name, description) {
    this._userName.textContent = name;
    this._description.textContent = description;
  }
}