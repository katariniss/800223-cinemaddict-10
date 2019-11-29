import {createFilmCardTemplate} from './components/card.js';
import {createFilmPopupTemplate} from './components/film-popup.js';
import {createFilmsListTemplate} from './components/films-list.js';
import {createSiteMenuTemplate} from './components/menu.js';
import {createSearchTemplate} from './components/search.js';
import {createShowMoreButtonTemplate} from './components/show-more.js';
import {createSortingTemplate} from './components/sorting.js';
import {createUserTitleTemplate} from './components/user-title.js';

const FILM_CARD_COUNT_IN_CARDLIST = 5;
const FILM_CARD_COUNT_IN_EXTRA = 2;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);

render(siteHeaderElement, createSearchTemplate(), `beforeend`);
render(siteHeaderElement, createUserTitleTemplate(), `beforeend`);

const siteMainElement = document.querySelector(`.main`);

render(siteMainElement, createSiteMenuTemplate(), `beforeend`);
render(siteMainElement, createSortingTemplate(), `beforeend`);
render(siteMainElement, createFilmsListTemplate(), `beforeend`);

const filmsElement = siteMainElement.querySelector(`.films`);
const filmsListElement = filmsElement.querySelector(`.films-list`);
const filmsListExtraElements = filmsElement.querySelectorAll(`.films-list--extra`);

filmsListExtraElements.forEach((filmsListExtraElement) => {
  const filmsListExtraElementContainer = filmsListExtraElement.querySelector(`.films-list__container`);

  new Array(FILM_CARD_COUNT_IN_EXTRA)
  .fill(``)
  .forEach(
      () => render(filmsListExtraElementContainer, createFilmCardTemplate(), `beforeend`)
  );
});

const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);

new Array(FILM_CARD_COUNT_IN_CARDLIST)
  .fill(``)
  .forEach(
      () => render(filmsListContainerElement, createFilmCardTemplate(), `beforeend`)
  );

render(filmsListElement, createShowMoreButtonTemplate(), `beforeend`);
render(siteMainElement, createFilmPopupTemplate(), `beforeend`);
