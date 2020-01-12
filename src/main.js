import {generateCards} from './mocks/card.js';
import PageControllerComponent from './controllers/page-controller.js';
import MoviesModel from './models/movies';
import FiltersController from './controllers/filters-controller';

const FILM_CARD_COUNT_TO_GENERATE = 15;
const siteMainElement = document.querySelector(`.main`);

const films = generateCards(FILM_CARD_COUNT_TO_GENERATE);

const moviesModel = new MoviesModel();
moviesModel.setCards(films);

const filtersController = new FiltersController(siteMainElement, moviesModel);
filtersController.render();

const pageControllerComponent = new PageControllerComponent(siteMainElement, moviesModel);
pageControllerComponent.render();

