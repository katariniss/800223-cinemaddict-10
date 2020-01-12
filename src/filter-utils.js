import {FilterType} from '../const.js';

export const getFavoriteCards = (cards) => {
  return cards.filter((card) => card.isFavorite);
};

export const getWarchlistCards = (cards) => {
  return cards.filter((card) => card.toWatch);
};

export const getWatchedCards = (cards) => {
  return cards.filter((card) => card.isWatched);
};

export const getCardsByFilter = (cards, filterType) => {
  switch (filterType) {
    case FilterType.ALL:
      return cards;
    case FilterType.FAVORITES:
      return getFavoriteCards(cards);
    case FilterType.WATCHLIST:
      return getWarchlistCards(cards);
    case FilterType.HISTORY:
      return getWatchedCards(cards);
    default:
      throw new Error(`Unsupported filter type: ${filterType}`);
  }
};
