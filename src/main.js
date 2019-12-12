import FilmCardComponent from './components/card.js';
import FilmPopupComponent from './components/film-popup.js';
import FilmsListComponent from './components/films-list.js';
import FiltersComponent from './components/filters.js';
import SearchComponent from './components/search.js';
import ShowMoreButtonComponent from './components/show-more.js';
import SortingComponent from './components/sorting.js';
import UserTitleComponent from './components/user-title.js';
import NoCardsComponent from './components/no-cards.js';
import { generateCards } from './mocks/card.js';
import { generateFilters } from './mocks/filter.js';

import { render, RenderPosition } from './utils.js';

const FILM_CARD_COUNT_TO_GENERATE = 15;
const FILM_CARD_COUNT_IN_EXTRA = 2;
const SHOW_MORE_CARD_COUNT = 5;

const allCards = generateCards(FILM_CARD_COUNT_TO_GENERATE);
let filteredCards = allCards;
let shownCards = [];

const siteMainElement = document.querySelector(`.main`);

const siteMenuComponent = new FiltersComponent(generateFilters());
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
      (card) => {
        const filmCardComponent = new FilmCardComponent(card);
        const filmCardElement = filmCardComponent.getElement();

        const filmPopupComponent = new FilmPopupComponent(card);

        const filmPoster = filmCardElement.querySelector(`.film-card__poster`);
        const filmName = filmCardElement.querySelector(`.film-card__title`);
        const filmComments = filmCardElement.querySelector(`.film-card__comments`);

        filmPoster.addEventListener(`click`, handleCardClick);
        filmName.addEventListener(`click`, handleCardClick);
        filmComments.addEventListener(`click`, handleCardClick);

        function handleCardClick() {
          render(filmsListContainerElement, filmPopupComponent.getElement(), RenderPosition.BEFOREEND);
          document.addEventListener(`keydown`, onEscKeyDown);
          const closePopupButton = document.querySelector(`.film-details__close-btn`);
          closePopupButton.addEventListener(`click`, onPopupCloseClick);
        }
        render(filmsListContainerElement, filmCardElement, RenderPosition.BEFOREEND);
      }
  );
}

if (allCards.length > 0) {
  renderCards(filmsGeneralListElement, shownCards);
} else {
  render(filmsGeneralListElement, new NoCardsComponent().getElement(), RenderPosition.AFTERBEGIN);
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

if (allCards.length === 0 || allCards.length < SHOW_MORE_CARD_COUNT) {
  showMoreButton.style.display = `none`;
}

const footerStatisticElement = document.querySelector(`.footer__statistics p`);
footerStatisticElement.textContent = `${allCards.length} movies inside`;

const onEscKeyDown = (evt) => {
  const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
  if (isEscKey) {
    removePopup();
    document.removeEventListener(`keydown`, onEscKeyDown);
  }
};

const onPopupCloseClick = () => {
  const closePopupButton = document.querySelector(`.film-details__close-btn`);
  closePopupButton.removeEventListener(`click`, onPopupCloseClick);
  removePopup();
};

const removePopup = () => {
  const popup = document.querySelector(`.film-details`);
  if (popup) {
    popup.remove();
  }
};
