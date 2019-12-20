import {render, RenderPosition} from '../utils.js';
import FilmCardComponent from '../components/card.js';
import FilmPopupComponent from '../components/film-popup.js';

export default class MovieController {
  constructor(container) {
    this._container = container;
  }

  render(card) {
    const filmCardComponent = new FilmCardComponent(card);
    const filmCardElement = filmCardComponent.getElement();

    const filmPopupComponent = new FilmPopupComponent(card);

    const handleCardClick = () => {
      render(this._container, filmPopupComponent.getElement(), RenderPosition.BEFOREEND);
      document.addEventListener(`keydown`, onEscKeyDown);

      filmPopupComponent.setCloseButtonClickHandler(onPopupCloseClick);
    };

    filmCardComponent.setPosterClickHandler(handleCardClick);
    filmCardComponent.setFilmNameClickHandler(handleCardClick);
    filmCardComponent.setCommentsClickHandler(handleCardClick);

    render(this._container, filmCardElement, RenderPosition.BEFOREEND);

    const onEscKeyDown = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
      if (isEscKey) {
        removePopup();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    const onPopupCloseClick = () => {
      const closePopupButton = this._container.querySelector(`.film-details__close-btn`);
      closePopupButton.removeEventListener(`click`, onPopupCloseClick);
      removePopup();
    };

    const removePopup = () => {
      const popup = this._container.querySelector(`.film-details`);
      if (popup) {
        popup.remove();
      }
    };

  }
}
