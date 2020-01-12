import {generateCards} from './mocks/card.js';
import PageControllerComponent from './controllers/page-controller.js';
import MoviesModel from './models/movies';

const FILM_CARD_COUNT_TO_GENERATE = 15;
const siteMainElement = document.querySelector(`.main`);

const films = generateCards(FILM_CARD_COUNT_TO_GENERATE);

const moviesModel = new MoviesModel();
moviesModel.setCards(films);

const pageControllerComponent = new PageControllerComponent(siteMainElement, moviesModel);
pageControllerComponent.render();
