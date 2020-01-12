export default class Movies {
  constructor() {
    this._cards = [];
  }

  getCards() {
    return this._cards;
  }

  setCards(cards) {
    this._cards = Array.from(cards);
  }

  updateCard(id, card) {
    const index = this._cards.findIndex((it) => it.id === id);

    this._cards = [].concat(this._cards.slice(0, index), card, this._cards.slice(index + 1));
  }
}
