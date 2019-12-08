import {createElement} from '../utils.js';

const createSiteMenuMarkup = (filter) => {
  const {name, count} = filter;

  return (
    `<a href="#${name}" class="main-navigation__item main-navigation__item--${name.toLowerCase()}">${name}<span class="main-navigation__item-count">${count}</span></a>`
  );
};

const createSiteMenuTemplate = (filters) => {
  const filtersMarkup = filters.map((it, i) => createSiteMenuMarkup(it, i === 0)).join(`\n`);

  return (
    `<nav class="main-navigation">
        <a href="#all" class="main-navigation__item main-navigation__item--all">All movies</a>
        ${filtersMarkup}
        <a href="#stats" class="main-navigation__item main-navigation__item--additional main-navigation__item--active">Stats</a>
    </nav>`
  );
};

export default class SiteMenu {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createSiteMenuTemplate(this._filters);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
