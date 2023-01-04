export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }

  addItem(item) {
    this._containerSelector.prepend(item);
  }

  renderer() {
    this._items.forEach((dataCard) => {
      this._renderer(dataCard);
    });
  }
}