import AbstractSmartComponent from './abstract-smart-component';

export const SortType = {
  DEFAULT: `default`,
  DATE: `year`,
  RATING: `rating`
};

const createSortingTemplate = (sortType) => {
  return (
    `<ul class="sort">
      <li><a href="#" data-sort-type="${SortType.DEFAULT}" class="sort__button${sortType === SortType.DEFAULT ? ` sort__button--active` : ``}">Sort by default</a></li>
      <li><a href="#" data-sort-type="${SortType.DATE}" class="sort__button${sortType === SortType.DATE ? ` sort__button--active` : ``}">Sort by date</a></li>
      <li><a href="#" data-sort-type="${SortType.RATING}" class="sort__button${sortType === SortType.RATING ? ` sort__button--active` : ``}">Sort by rating</a></li>
    </ul>`
  );
};

export default class Sorting extends AbstractSmartComponent {
  constructor(sortType) {
    super();

    this._currenSortType = sortType;

    this.recoveryListeners();
  }

  getTemplate() {
    return createSortingTemplate(this._currenSortType);
  }

  recoveryListeners() {
    this.getElement()
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();

        if (evt.target.tagName !== `A`) {
          return;
        }
        const sortType = evt.target.dataset.sortType;

        if (this._currenSortType === sortType) {
          return;
        }

        this._currenSortType = sortType;

        this.sortTypeChangeHandler(this._currenSortType);
      });
  }

  setSortTypeChangeHandler(handler) {
    this.sortTypeChangeHandler = handler;
  }
}
