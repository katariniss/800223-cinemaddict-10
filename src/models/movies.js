import {getCardsByFilter} from '../filter-utils.js';
import {FilterType} from '../const.js';

export default class Movies {
  constructor() {
    this._allCards = [];
    this._activeFilterType = FilterType.ALL;

    this._filterChangeHandlers = [];
  }

  getCards() {
    return getCardsByFilter(this._allCards, this._activeFilterType);
  }

  getAllCards() {
    return this._allCards;
  }

  setCards(cards) {
    this._allCards = Array.from(cards);
  }

  updateCard(id, card) {
    const index = this._allCards.findIndex((it) => it.id === id);

    this._allCards = [].concat(this._allCards.slice(0, index), card, this._allCards.slice(index + 1));
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._filterChangeHandlers.forEach((handler) => handler());
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }
}
