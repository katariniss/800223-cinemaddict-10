import AbstractComponent from './abstract-component.js';

const createFiltersMarkup = (filter) => {
  const {name, count} = filter;

  return (
    `<a href="#${name}" class="main-navigation__item main-navigation__item-filter main-navigation__item--${name.toLowerCase()}" id="${name.toLowerCase()}">${name}<span class="main-navigation__item-count">${count}</span></a>`
  );
};

const createFiltersTemplate = (filters) => {
  const filtersMarkup = filters.map((it, i) => createFiltersMarkup(it, i === 0)).join(`\n`);

  return (
    `<nav class="main-navigation">
        <a href="#all" class="main-navigation__item main-navigation__item-filter main-navigation__item--all" id="all" >All movies</a>
        ${filtersMarkup}
        <a href="#stats" class="main-navigation__item main-navigation__item--additional main-navigation__item--active">Stats</a>
    </nav>`
  );
};

export default class Filters extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;

    this.showStatisticsHandler = () => { };

    this.recoveryListeners();
  }

  getTemplate() {
    return createFiltersTemplate(this._filters);
  }

  recoveryListeners() {
    this.getElement().querySelector(`.main-navigation__item--additional`)
      .addEventListener(`click`, (e) => this.showStatisticsHandler(e));

    this.getElement().querySelectorAll(`.main-navigation__item`)
      .forEach((navigationItemElement) => navigationItemElement
        .addEventListener(`click`, (e) => {
          this.navigationItemClickHandler(e);
        }));
  }

  setFilterChangeHandler(handler) {
    this.getElement()
      .querySelectorAll(`.main-navigation__item-filter`)
      .forEach((filterButtonElement) => filterButtonElement
        .addEventListener(`click`, (evt) => {
          handler(evt.target.id);
        }));
  }

  setShowStatisticsHandler(handler) {
    this.showStatisticsHandler = handler;
  }

  setNavigationItemClickHandler(handler) {
    this.navigationItemClickHandler = handler;
  }
}
