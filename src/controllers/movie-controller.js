import {render, RenderPosition} from '../utils.js';
import FilmCardComponent from '../components/card.js';
import FilmPopupComponent from '../components/film-popup.js';
import {replace} from '../utils';

export default class MovieController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;

    this.cardComponent = null;
  }

  render(card) {
    const oldCardComponent = this.cardComponent;

    const newFilmCardComponent = new FilmCardComponent(card);
    const filmCardElement = newFilmCardComponent.getElement();

    const filmPopupComponent = new FilmPopupComponent(card);

    const handleCardClick = () => {
      render(this._container, filmPopupComponent.getElement(), RenderPosition.BEFOREEND);
      document.addEventListener(`keydown`, onEscKeyDown);

      filmPopupComponent.setCloseButtonClickHandler(onPopupCloseClick);
    };

    newFilmCardComponent.setPosterClickHandler(handleCardClick);
    newFilmCardComponent.setFilmNameClickHandler(handleCardClick);
    newFilmCardComponent.setCommentsClickHandler(handleCardClick);

    newFilmCardComponent.setFavoriteButtonClickHandler(() => {
      const thisMovieController = this;

      this._onDataChange(
          thisMovieController,
          card,
          Object.assign({}, card, {
            isFavourite: !card.isFavourite,
          }));
    });

    newFilmCardComponent.setToWatchButtonClickHandler(() => {
      const thisMovieController = this;

      this._onDataChange(
          thisMovieController,
          card,
          Object.assign({}, card, {
            toWatch: !card.toWatch,
          }));
    });

    newFilmCardComponent.setAlreadyWatchedButtonClickHandler(() => {
      const thisMovieController = this;

      this._onDataChange(
          thisMovieController,
          card,
          Object.assign({}, card, {
            isWatched: !card.isWatched,
          }));
    });

    let isFirstRender = !oldCardComponent;

    if (isFirstRender) {
      render(this._container, filmCardElement, RenderPosition.BEFOREEND);
    } else {
      replace(newFilmCardComponent, oldCardComponent);
    }

    this.cardComponent = newFilmCardComponent;

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
