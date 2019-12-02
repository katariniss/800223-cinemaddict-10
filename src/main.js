import {createFilmCardTemplate} from './components/card.js';
import {createFilmPopupTemplate} from './components/film-popup.js';
import {createFilmsListTemplate} from './components/films-list.js';
import {createSiteMenuTemplate} from './components/menu.js';
import {createSearchTemplate} from './components/search.js';
import {createShowMoreButtonTemplate} from './components/show-more.js';
import {createSortingTemplate} from './components/sorting.js';
import {createUserTitleTemplate} from './components/user-title.js';

import {generateCard, generateCards} from './mocks/card.js';
import {generateFilmPopup} from './mocks/film-popup';

const FILM_CARD_COUNT_IN_CARDLIST = 10;
const FILM_CARD_COUNT_IN_EXTRA = 2;

const generalCards = generateCards(FILM_CARD_COUNT_IN_CARDLIST);
const extraCards = generateCards(FILM_CARD_COUNT_IN_EXTRA);

const siteMainElement = document.querySelector(`.main`);

render(siteMainElement, createSiteMenuTemplate(), `beforeend`);
render(siteMainElement, createSortingTemplate(), `beforeend`);
render(siteMainElement, createFilmsListTemplate(), `beforeend`);

const filmsElement = siteMainElement.querySelector(`.films`);
const filmsGeneralListElement = filmsElement.querySelector(`.films-list`);

renderHeader();

renderGeneralCards();

renderExtraCards();

render(filmsGeneralListElement, createShowMoreButtonTemplate(), `beforeend`);
// render(siteMainElement, createFilmPopupTemplate(generateFilmPopup()), `beforeend`);

function renderHeader() {
  const siteHeaderElement = document.querySelector(`.header`);

  render(siteHeaderElement, createSearchTemplate(), `beforeend`);
  render(siteHeaderElement, createUserTitleTemplate(), `beforeend`);
}

function renderGeneralCards() {
  renderCards(filmsGeneralListElement, generalCards);
}

function renderExtraCards() {
  const filmsListExtraElements = filmsElement.querySelectorAll(`.films-list--extra`);

  filmsListExtraElements.forEach((filmsListExtraElement) => {
    renderCards(filmsListExtraElement, extraCards);
  });
}

function renderCards(filmsListElement, cardsToRender) {
  const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);

  cardsToRender.forEach(
      (card) => render(filmsListContainerElement, createFilmCardTemplate(card), `beforeend`)
  );
}

function render(container, template, place) {
  container.insertAdjacentHTML(place, template);
}
