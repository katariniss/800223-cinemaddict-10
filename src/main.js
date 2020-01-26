import {generateCards} from './mocks/card.js';
import PageControllerComponent from './controllers/page-controller.js';
import MoviesModel from './models/movies';
import FiltersController from './controllers/filters-controller';
import StatisticsComponent from './components/statistics';
import {render, RenderPosition} from './utils';

const FILM_CARD_COUNT_TO_GENERATE = 15;
const siteMainElement = document.querySelector(`.main`);

const films = generateCards(FILM_CARD_COUNT_TO_GENERATE);

const moviesModel = new MoviesModel();
moviesModel.setCards(films);

const filtersController = new FiltersController(siteMainElement, moviesModel);
const pageControllerComponent = new PageControllerComponent(siteMainElement, moviesModel);
const statisticsComponent = new StatisticsComponent();

filtersController.setNavigationItemClickHandler((evt) => {
  if (evt.target.className.includes(`main-navigation__item--additional`)) {
    pageControllerComponent.hide();
    statisticsComponent.show();
  } else {
    pageControllerComponent.show();
    statisticsComponent.hide();
  }
});

filtersController.render();

pageControllerComponent.render();

render(siteMainElement, statisticsComponent.getElement(), RenderPosition.BEFOREEND);
