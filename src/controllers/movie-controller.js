import {render, RenderPosition, replace, remove} from '../utils.js';
import FilmCardComponent from '../components/card.js';
import FilmPopupComponent from '../components/film-popup.js';

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this.isPopupOpen = false;
    this.filmPopupComponent = null;
    this.cardComponent = null;
    this.onViewChange = onViewChange;
  }

  render(card) {
    const oldCardComponent = this.cardComponent;

    const newFilmCardComponent = new FilmCardComponent(card);
    const filmCardElement = newFilmCardComponent.getElement();

    const handleAlreadyWatchedClick = () => {
      const thisMovieController = this;

      this._onDataChange(
          thisMovieController,
          card,
          Object.assign({}, card, {
            isWatched: !card.isWatched,
          }));
    };

    const onPopupCloseClick = () => {
      const closePopupButton = this._container.querySelector(`.film-details__close-btn`);
      closePopupButton.removeEventListener(`click`, onPopupCloseClick);
      removePopup();
    };
    if (this.isPopupOpen) {
      if (this.filmPopupComponent) {
        remove(this.filmPopupComponent);
      }
      this.filmPopupComponent = new FilmPopupComponent(card);
      render(this._container, this.filmPopupComponent.getElement(), RenderPosition.BEFOREEND);
      this.filmPopupComponent.setCloseButtonClickHandler(onPopupCloseClick);
      this.filmPopupComponent.setWatchedButtonClickHandler(handleAlreadyWatchedClick);
    }

    const handleCardClick = () => {
      this.onViewChange();
      document.addEventListener(`keydown`, onEscKeyDown);

      this.isPopupOpen = true;
      this.render(card);
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

    newFilmCardComponent.setAlreadyWatchedButtonClickHandler(handleAlreadyWatchedClick);

    let isFirstRender = !oldCardComponent;

    if (isFirstRender) {
      render(this._container, filmCardElement, RenderPosition.BEFOREEND);
    } else {
      replace(newFilmCardComponent, oldCardComponent);
    }

    this.cardComponent = newFilmCardComponent;

    const setDefaultView = () => {
      if (this.isPopupOpen) {
        removePopup();
      }
    };

    const onEscKeyDown = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
      if (isEscKey) {
        removePopup();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    const removePopup = () => {
      this.isPopupOpen = false;
      const popup = this._container.querySelector(`.film-details`);
      if (popup) {
        popup.remove();
      }
    };
  }
}
