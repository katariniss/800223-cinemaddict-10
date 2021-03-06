import AbstractSmartComponent from './abstract-smart-component.js';
import UserRating from './user-rating';
import {getFilmDuration} from '../mocks/card';
import {formatDate, encodeText} from '../utils.js';

import moment from "moment";

const createFilmPopupTemplate = (card, options) => {
  const {
    id,
    name,
    description,
    poster,
    genres,
    rating,
    subtitle,
    country,
    releaseDate,
    runTime,
    director,
    writer,
    actor,
    ageRestriction,
    comments
  } = card;

  const createCommentMarkup = () => {
    return comments.map((comment) => {

      return (
        `<li class="film-details__comment">
          <span class="film-details__comment-emoji">
            <img src="${comment.emoji}" width="55" height="55" alt="emoji">
          </span>
          <div>
            <p class="film-details__comment-text">${encodeText(comment.text)}</p>
            <p class="film-details__comment-info">
              <span class="film-details__comment-author">${comment.author}</span>
              <span class="film-details__comment-day">${formatDate(comment.date)}</span>
              <button class="film-details__comment-delete" data-film-id="${id}" data-comment-id="${comment.id}">Delete</button>
            </p>
          </div>
        </li>`
      );
    })
    .join(`\n`);
  };

  const commentsTemplate = createCommentMarkup(comments);
  const getReleaseDate = () => moment(releaseDate).format(`DD MMMM YYYY`);

  const {
    isUserRatingVisible
  } = options;

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
          <div class="form-details__top-container">
          <div class="film-details__close">
              <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
              <div class="film-details__poster">
              <img class="film-details__poster-img" src="./images/posters/${poster}" alt="${name}">

              <p class="film-details__age">${ageRestriction}+</p>
              </div>

              <div class="film-details__info">
              <div class="film-details__info-head">
                  <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${name}</h3>
                  <p class="film-details__title-original">Original: ${subtitle}</p>
                  </div>

                  <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                  </div>
              </div>

              <table class="film-details__table">
                  <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                  </tr>
                  <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writer}</td>
                  </tr>
                  <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actor}</td>
                  </tr>
                  <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${getReleaseDate()}</td>
                  </tr>
                  <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${getFilmDuration(runTime)}</td>
                  </tr>
                  <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                  </tr>
                  <tr class="film-details__row">
                  <td class="film-details__term">${card.genres.length > 1 ? `Genres` : `Genre`}</td>
                  <td class="film-details__cell">
                      <span class="film-details__genre">${genres.join(`, `)}</span>
                  </td>
                  </tr>
              </table>

              <p class="film-details__film-description">
              ${description}
              </p>
              </div>
          </div>

          <section class="film-details__controls">
              <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${card.toWatch ? `checked` : ``}>
              <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

              <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${card.isWatched ? `checked` : ``}>
              <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

              <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${card.isFavorite ? `checked` : ``}>
              <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
          </div>

          ${isUserRatingVisible ? new UserRating().getTemplate() : ``}

          <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
              <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

              <ul class="film-details__comments-list">
                ${commentsTemplate}
              </ul>

              <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label"></div>

              <label class="film-details__comment-label">
                  <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>

              <div class="film-details__emoji-list">
                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="sleeping">
                  <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                  </label>

                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="neutral-face">
                  <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                  </label>

                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-gpuke" value="grinning">
                  <label class="film-details__emoji-label" for="emoji-gpuke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                  </label>

                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="grinning">
                  <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                  </label>
              </div>
              </div>
          </section>
        </div>
      </form>
    </section>`
  );
};

export default class FilmPopup extends AbstractSmartComponent {
  constructor(card) {
    super();
    this._card = card;
    this._emojiSelected = null;

    this._isUserRatingVisible = card.isWatched;
    this.closeButtonClickHandler = () => {};
    this.watchlistButtonClickHandler = () => {};
    this.watchedButtonClickHandler = () => {};
    this.favoriteButtonClickHandler = () => {};
    this.deleteButtonClickHandler = () => {};
    this.addCommentHandler = () => {};

    this.recoveryListeners();
  }

  getTemplate() {
    return createFilmPopupTemplate(
        this._card,
        {
          isUserRatingVisible: this._isUserRatingVisible
        });
  }

  recoveryListeners() {
    this.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, (e) => this.closeButtonClickHandler(e));
    this.getElement().querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, (e) => this.watchlistButtonClickHandler(e));
    this.getElement().querySelector(`.film-details__control-label--watched`)
      .addEventListener(`click`, (e) => this.watchedButtonClickHandler(e));
    this.getElement().querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, (e) => this.favoriteButtonClickHandler(e));

    const deleteButtons = this.getElement().querySelectorAll(`.film-details__comment-delete`);
    [...deleteButtons].forEach((button) => {
      button.addEventListener(`click`, (e) => {
        const filmId = e.target.attributes[`data-film-id`].value;
        const commentId = e.target.attributes[`data-comment-id`].value;

        this.deleteButtonClickHandler(filmId, commentId);
      });
    });


    this.getElement().querySelector(`.film-details__emoji-list`).addEventListener(`change`, (e) => {
      if (e.target.classList.contains(`film-details__emoji-item`) && e.target.checked) {
        const cloneImgElement = e.target.nextElementSibling.querySelector(`img`).cloneNode();
        const targetElement = this.getElement().querySelector(`.film-details__add-emoji-label`);
        targetElement.innerHTML = ``;
        targetElement.appendChild(cloneImgElement);

        const imgTargetElement = this.getElement().querySelector(`.film-details__emoji-label[for=${e.target.id}] img`);
        this._emojiSelected = imgTargetElement.getAttribute(`src`);
      }
    });

    const newCommentInput = this.getElement().querySelector(`.film-details__comment-input`);
    newCommentInput.addEventListener(`keydown`, (e) => {
      if (e.key === `Enter` && e.metaKey && newCommentInput.value && this._emojiSelected) {

        const newCommentMessage = newCommentInput.value;
        const newComment = {
          id: String(new Date() + Math.random()),
          emoji: this._emojiSelected,
          text: newCommentMessage,
          date: new Date()
        };

        this.addCommentHandler(newComment);
      }
    });
  }

  setCloseButtonClickHandler(handler) {
    this.closeButtonClickHandler = handler;
  }

  setWatchlistButtonClickHandler(handler) {
    this.watchlistButtonClickHandler = handler;
  }

  setWatchedButtonClickHandler(handler) {
    this.watchedButtonClickHandler = handler;
  }

  setFavoriteButtonClickHandler(handler) {
    this.favoriteButtonClickHandler = handler;
  }

  setDeleteButtonClickHandler(handler) {
    this.deleteButtonClickHandler = handler;
  }

  setAddCommentHandler(handler) {
    this.addCommentHandler = handler;
  }
}
