import AbstractComponent from './abstract-component.js';

const createFilmCardTemplate = ({
  name,
  description,
  rating,
  year,
  totalDuration,
  genre,
  poster,
  toWatch,
  isWatched,
  isFavourite,
  commentsCount
}) => {
  return (
    `<article class="film-card">
      <h3 class="film-card__title">${name}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${totalDuration}</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img src="./images/posters/${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${commentsCount} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${toWatch ? `film-card__controls-item--active` : ``}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isWatched ? `film-card__controls-item--active` : ``}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${isFavourite ? `film-card__controls-item--active` : ``}">Mark as favorite</button>
      </form>
    </article>`
  );
};

export default class Card extends AbstractComponent {
  constructor(card) {
    super();

    this._card = card;
  }

  getTemplate() {
    return createFilmCardTemplate(this._card);
  }

  setPosterClickHandler(handler) {
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, handler);
  }

  setFilmNameClickHandler(handler) {
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, handler);
  }

  setCommentsClickHandler(handler) {
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, handler);
  }
}
