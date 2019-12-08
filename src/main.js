import FilmCardComponent from './components/card.js';
import FilmPopupComponent from './components/film-popup.js';
import FilmsListComponent from './components/films-list.js';
import SiteMenuComponent from './components/menu.js';
import SearchComponent from './components/search.js';
import ShowMoreButtonComponent from './components/show-more.js';
import SortingComponent from './components/sorting.js';
import UserTitleComponent from './components/user-title.js';
import {generateCards} from './mocks/card.js';
import {generateFilters} from './mocks/filter.js';
import {generateFilmPopup} from './mocks/film-popup';

import {render, RenderPosition} from './utils.js';

const FILM_CARD_COUNT_TO_GENERATE = 15;
const FILM_CARD_COUNT_IN_EXTRA = 2;
const SHOW_MORE_CARD_COUNT = 5;

const allCards = generateCards(FILM_CARD_COUNT_TO_GENERATE);
let filteredCards = allCards;
let shownCards = [];

const siteMainElement = document.querySelector(`.main`);

const siteMenuComponent = new SiteMenuComponent(generateFilters());
render(siteMainElement, siteMenuComponent.getElement(), RenderPosition.BEFOREEND);

const sortingComponent = new SortingComponent();
render(siteMainElement, sortingComponent.getElement(), RenderPosition.BEFOREEND);

const filmsListComponent = new FilmsListComponent();
render(siteMainElement, filmsListComponent.getElement(), RenderPosition.BEFOREEND);

const filmsElement = siteMainElement.querySelector(`.films`);
const filmsGeneralListElement = filmsElement.querySelector(`.films-list`);

tryToShowMore();

renderHeader();

renderGeneralCards();

renderTopRatedCards();

renderMostCommentedCards();

const showMoreButtonComponent = new ShowMoreButtonComponent();
render(filmsGeneralListElement, showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

render(siteMainElement, new FilmPopupComponent(generateFilmPopup()).getElement(), RenderPosition.BEFOREEND);

function renderHeader() {
  const siteHeaderElement = document.querySelector(`.header`);

  const searchComponent = new SearchComponent();
  render(siteHeaderElement, searchComponent.getElement(), RenderPosition.BEFOREEND);

  const userTitleComponent = new UserTitleComponent();
  render(siteHeaderElement, userTitleComponent.getElement(), RenderPosition.BEFOREEND);
}

function renderGeneralCards() {
  renderCards(filmsGeneralListElement, shownCards);
}

function renderTopRatedCards() {
  const topRatedCards = allCards.sort((a, b) => (a.rating < b.rating) ? 1 : -1);
  const topRatedCardsElement = filmsElement.querySelector(`.films-list--top-rated`);

  if (topRatedCards.some((card) => card.rating > 0)) {
    renderCards(topRatedCardsElement, topRatedCards.slice(0, FILM_CARD_COUNT_IN_EXTRA));
  }
}

function renderMostCommentedCards() {
  const mostCommentedCards = allCards.sort((a, b) => (a.commentsCount < b.commentsCount) ? 1 : -1);
  const mostCommentedCardsElement = filmsElement.querySelector(`.films-list--most-commented`);
  if (mostCommentedCards.some((card) => card.commentsCount > 0)) {
    renderCards(mostCommentedCardsElement, mostCommentedCards.slice(0, FILM_CARD_COUNT_IN_EXTRA));
  }
}

function renderCards(filmsListElement, cardsToRender) {
  const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);
  filmsListContainerElement.innerHTML = ``;
  cardsToRender.forEach(
      (card) => render(filmsListContainerElement, new FilmCardComponent(card).getElement(), RenderPosition.BEFOREEND)
  );
}

const watchlist = document.querySelector(`.main-navigation__item--watchlist`);
const history = document.querySelector(`.main-navigation__item--history`);
const favorites = document.querySelector(`.main-navigation__item--favorites`);

watchlist.addEventListener(`click`, function () {
  filteredCards = allCards.filter((card) => card.toWatch);
  handleNewFilteredCards();
});

history.addEventListener(`click`, function () {
  filteredCards = allCards.filter((card) => card.isWatched);
  handleNewFilteredCards();
});

favorites.addEventListener(`click`, function () {
  filteredCards = allCards.filter((card) => card.isFavourite);
  handleNewFilteredCards();
});

function handleNewFilteredCards() {
  shownCards = [];
  showMoreButton.style.display = `block`;
  tryToShowMore();
  renderGeneralCards();
}

const showMoreButton = document.querySelector(`.films-list__show-more`);
showMoreButton.addEventListener(`click`, () => {
  if (!tryToShowMore()) {
    showMoreButton.style.display = `none`;
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
