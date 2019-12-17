import {generateCards} from './mocks/card.js';
import PageControllerComponent from './controllers/page-controller.js';

const FILM_CARD_COUNT_TO_GENERATE = 15;
const siteMainElement = document.querySelector(`.main`);

const films = generateCards(FILM_CARD_COUNT_TO_GENERATE);

const pageControllerComponent = new PageControllerComponent(siteMainElement);
pageControllerComponent.render(films);
