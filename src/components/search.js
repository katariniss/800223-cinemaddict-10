import {createElement} from '../utils.js';

const createSearchTemplate = () => {
  return (
    `<section class="films-list__search">
      <form class="films-list__search-form">
        <p>
          <input type="search" name="q" placeholder="I'm looking for...">
          <input type="submit" value="Search">
        </p>
      </form>
    </section>`
  );
};

export default class Search {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createSearchTemplate();
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
