import {createFilmCardTemplate} from './components/card.js';
import {createFilmPopupTemplate} from './components/film-popup.js';
import {createFilmsListTemplate} from './components/films-list.js';
import {createSiteMenuTemplate} from './components/menu.js';
import {createSearchTemplate} from './components/search.js';
import {createShowMoreButtonTemplate} from './components/show-more.js';
import {createSortingTemplate} from './components/sorting.js';
import {createUserTitleTemplate} from './components/user-title.js';

import {generateCard} from './mocks/card.js';

const FILM_CARD_COUNT_IN_CARDLIST = 5;
const FILM_CARD_COUNT_IN_EXTRA = 2;

const siteHeaderElement = document.querySelector(`.header`);

render(siteHeaderElement, createSearchTemplate(), `beforeend`);
render(siteHeaderElement, createUserTitleTemplate(), `beforeend`);

const siteMainElement = document.querySelector(`.main`);

render(siteMainElement, createSiteMenuTemplate(), `beforeend`);
render(siteMainElement, createSortingTemplate(), `beforeend`);
render(siteMainElement, createFilmsListTemplate(), `beforeend`);

const filmsElement = siteMainElement.querySelector(`.films`);

renderExtraCards();

function renderExtraCards() {
  const filmsListExtraElements = filmsElement.querySelectorAll(`.films-list--extra`);

  filmsListExtraElements.forEach((filmsListExtraElement) => {
    renderGeneralCards(filmsListExtraElement, FILM_CARD_COUNT_IN_EXTRA);
  });
}

const filmsGeneralListElement = filmsElement.querySelector(`.films-list`);

renderGeneralCards(filmsGeneralListElement, FILM_CARD_COUNT_IN_CARDLIST);

function renderGeneralCards(filmsListElement, numberOfCards) {
  const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);

  [...new Array(numberOfCards)]
  .forEach(
      () => render(filmsListContainerElement, createFilmCardTemplate(generateCard()), `beforeend`)
  );
}

render(filmsGeneralListElement, createShowMoreButtonTemplate(), `beforeend`);
render(siteMainElement, createFilmPopupTemplate(), `beforeend`);

function render(container, template, place) {
  container.insertAdjacentHTML(place, template);
}
