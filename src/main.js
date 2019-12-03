import {createFilmCardTemplate} from './components/card.js';
import {createFilmPopupTemplate} from './components/film-popup.js';
import {createFilmsListTemplate} from './components/films-list.js';
import {createSiteMenuTemplate} from './components/menu.js';
import {createSearchTemplate} from './components/search.js';
import {createShowMoreButtonTemplate} from './components/show-more.js';
import {createSortingTemplate} from './components/sorting.js';
import {createUserTitleTemplate} from './components/user-title.js';

import {generateCard, generateCards} from './mocks/card.js';
import {generateFilters} from './mocks/filter.js';

import {generateFilmPopup} from './mocks/film-popup';

const FILM_CARD_COUNT_TO_GENERATE = 15;
const FILM_CARD_COUNT_IN_EXTRA = 2;
const SHOW_MORE_CARD_COUNT = 5;

const allCards = generateCards(FILM_CARD_COUNT_TO_GENERATE);
let filteredCards = allCards;
let shownCards = [];

const siteMainElement = document.querySelector(`.main`);

render(siteMainElement, createSiteMenuTemplate(generateFilters()), `beforeend`);
render(siteMainElement, createSortingTemplate(), `beforeend`);
render(siteMainElement, createFilmsListTemplate(), `beforeend`);

const filmsElement = siteMainElement.querySelector(`.films`);
const filmsGeneralListElement = filmsElement.querySelector(`.films-list`);


renderHeader();

tryToShowMore();

renderGeneralCards();

renderTopRatedCards();

renderMostCommentedCards();

render(filmsGeneralListElement, createShowMoreButtonTemplate(), `beforeend`);
// render(siteMainElement, createFilmPopupTemplate(generateFilmPopup()), `beforeend`);

function renderHeader() {
  const siteHeaderElement = document.querySelector(`.header`);

  render(siteHeaderElement, createSearchTemplate(), `beforeend`);
  render(siteHeaderElement, createUserTitleTemplate(), `beforeend`);
}

function renderGeneralCards() {
  renderCards(filmsGeneralListElement, shownCards);
}

function renderTopRatedCards() {
  const topRatedCards = allCards.sort((a, b) => (a.rating < b.rating) ? 1 : -1);
  const topRatedCardsElement = filmsElement.querySelector(`.films-list--top-rated`);

  renderCards(topRatedCardsElement, topRatedCards.slice(0, FILM_CARD_COUNT_IN_EXTRA));
}

function renderMostCommentedCards() {
  const mostCommentedCards = allCards.sort((a, b) => (a.commentsCount < b.commentsCount) ? 1 : -1);
  const mostCommentedCardsElement = filmsElement.querySelector(`.films-list--most-commented`);

  renderCards(mostCommentedCardsElement, mostCommentedCards.slice(0, FILM_CARD_COUNT_IN_EXTRA));
}

function renderCards(filmsListElement, cardsToRender) {
  const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);
  filmsListContainerElement.innerHTML = '';
  cardsToRender.forEach(
      (card) => render(filmsListContainerElement, createFilmCardTemplate(card), `beforeend`)
  );
}

function render(container, template, place) {
  container.insertAdjacentHTML(place, template);
}

const allFilms = document.querySelector(`.main-navigation__item--all`);
const watchlist = document.querySelector(`.main-navigation__item--Watchlist`);
const history = document.querySelector(`.main-navigation__item--History`);
const favorites = document.querySelector(`.main-navigation__item--Favorites`);

watchlist.addEventListener(`click`, function () {
  filteredCards = allCards.filter(card => card.toWatch === true);
  renderGeneralCards();
});
history.addEventListener(`click`, function () {
  filteredCards = allCards.filter(card => card.isWatched === true);
  renderGeneralCards();

});
favorites.addEventListener(`click`, function () {
  filteredCards = allCards.filter(card => card.isFavourite === true);
  renderGeneralCards();
});

const showMoreButton = document.querySelector(`.films-list__show-more`);
showMoreButton.addEventListener(`click`, () => {
  if (!tryToShowMore()) {
    showMoreButton.style.display = 'none';
  }

  renderGeneralCards();
});

function tryToShowMore() {
  const endIndex = shownCards.length + SHOW_MORE_CARD_COUNT;

  let newCardsToShow = [];
  if (endIndex >= filteredCards.length) {
    newCardsToShow = filteredCards.slice(shownCards.length);
  } else {
    newCardsToShow = filteredCards.slice(shownCards.length, endIndex);
  }

  shownCards = [...shownCards, ...newCardsToShow];

  return filteredCards.length !== shownCards.length;
}
