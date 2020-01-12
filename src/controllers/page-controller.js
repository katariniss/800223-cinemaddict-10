import FilmsListComponent from '../components/films-list.js';
import SearchComponent from '../components/search.js';
import ShowMoreButtonComponent from '../components/show-more.js';
import SortingComponent, {SortType} from '../components/sorting.js';
import UserTitleComponent from '../components/user-title.js';
import NoCardsComponent from '../components/no-cards.js';
import MovieController from '../controllers/movie-controller.js';

import {render, RenderPosition} from '../utils.js';

const FILM_CARD_COUNT_IN_EXTRA = 2;
const SHOW_MORE_CARD_COUNT = 5;

export default class PageController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._movieControllers = [];
    this._shownCards = [];
    this._sortBy = SortType.DEFAULT;

    this._onViewChange = this._onViewChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._moviesModel.setFilterChangeHandler(this._onFilterChange);
  }

  _onViewChange() {
    this._movieControllers.forEach((movieController) => movieController.setDefaultView());
  }

  _onDataChange(movieController, oldCard, newCard) {
    this._moviesModel.updateCard(oldCard.id, newCard);

    movieController.render(newCard);
  }

  _onFilterChange() {
    this._shownCards = [];

    const showMoreButton = document.querySelector(`.films-list__show-more`);
    showMoreButton.style.display = `block`;

    this.tryToShowMore();

    const filmsElement = this._container.querySelector(`.films`);
    const filmsGeneralListElement = filmsElement.querySelector(`.films-list`);
    this.renderGeneralCards(filmsGeneralListElement);
  }

  render() {
    this._shownCards = [];

    const filmsComponent = new FilmsListComponent();
    render(this._container, filmsComponent, RenderPosition.BEFOREEND);

    const sortingComponent = new SortingComponent();
    render(this._container, sortingComponent.getElement(), RenderPosition.BEFOREEND);

    const filmsListComponent = new FilmsListComponent();
    render(this._container, filmsListComponent.getElement(), RenderPosition.BEFOREEND);

    const filmsElement = this._container.querySelector(`.films`);
    const filmsGeneralListElement = filmsElement.querySelector(`.films-list`);

    this.renderHeader();

    this.tryToShowMore();

    this.renderGeneralCards(filmsGeneralListElement);

    this.renderTopRatedCards(filmsElement);

    this.renderMostCommentedCards(filmsElement);

    const showMoreButtonComponent = new ShowMoreButtonComponent();
    render(filmsGeneralListElement, showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

    if (this.getFilms().length > 0) {
      this.renderCards(filmsGeneralListElement, this._shownCards);
    } else {
      render(filmsGeneralListElement, new NoCardsComponent().getElement(), RenderPosition.AFTERBEGIN);
    }

    const showMoreButton = document.querySelector(`.films-list__show-more`);
    showMoreButtonComponent.setShowMoreClickHandler(() => {
      if (!this.tryToShowMore()) {
        showMoreButton.style.display = `none`;
      }

      this.renderGeneralCards(filmsGeneralListElement);
    });

    if (this.getFilms().length === 0 || this.getFilms().length < SHOW_MORE_CARD_COUNT) {
      showMoreButton.style.display = `none`;
    }

    const footerStatisticElement = document.querySelector(`.footer__statistics p`);
    footerStatisticElement.textContent = `${this.getFilms().length} movies inside`;

    sortingComponent.setSortTypeChangeHandler((sortType) => {
      this._sortBy = sortType;
      this._shownCards = this.getSortedFilteredCards(this._sortBy).slice(0, this._shownCards.length);
      this.renderCards(filmsGeneralListElement, this._shownCards);
    });
  }

  renderHeader() {
    const siteHeaderElement = document.querySelector(`.header`);

    const searchComponent = new SearchComponent();
    render(siteHeaderElement, searchComponent.getElement(), RenderPosition.BEFOREEND);

    const userTitleComponent = new UserTitleComponent();
    render(siteHeaderElement, userTitleComponent.getElement(), RenderPosition.BEFOREEND);
  }

  renderGeneralCards(filmsGeneralListElement) {
    this.renderCards(filmsGeneralListElement, this._shownCards);
  }

  renderTopRatedCards(filmsElement) {
    const topRatedCards = this.getFilms().sort((a, b) => (a.rating < b.rating) ? 1 : -1);
    const topRatedCardsElement = filmsElement.querySelector(`.films-list--top-rated`);

    if (topRatedCards.some((card) => card.rating > 0)) {
      this.renderCards(topRatedCardsElement, topRatedCards.slice(0, FILM_CARD_COUNT_IN_EXTRA));
    }
  }

  renderMostCommentedCards(filmsElement) {
    const mostCommentedCards = this.getFilms().sort((a, b) => (a.commentsCount < b.commentsCount) ? 1 : -1);
    const mostCommentedCardsElement = filmsElement.querySelector(`.films-list--most-commented`);
    if (mostCommentedCards.some((card) => card.commentsCount > 0)) {
      this.renderCards(mostCommentedCardsElement, mostCommentedCards.slice(0, FILM_CARD_COUNT_IN_EXTRA));
    }
  }

  renderCards(filmsListElement, cardsToRender) {
    const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);
    filmsListContainerElement.innerHTML = ``;
    cardsToRender.forEach(
        (card) => {
          const movieControllerComponent = new MovieController(
              filmsListContainerElement,
              this._onDataChange,
              this._onViewChange
          );
          movieControllerComponent.render(card);

          this._movieControllers.push(movieControllerComponent);
        }
    );
  }

  tryToShowMore() {
    const endIndex = this._shownCards.length + SHOW_MORE_CARD_COUNT;

    let newCardsToShow = [];
    if (endIndex >= this.getFilms().length) {
      newCardsToShow = this.getSortedFilteredCards(this._sortBy).slice(this._shownCards.length);
    } else {
      newCardsToShow = this.getSortedFilteredCards(this._sortBy).slice(this._shownCards.length, endIndex);
    }

    this._shownCards = [...this._shownCards, ...newCardsToShow];

    return this.getFilms().length !== this._shownCards.length;
  }

  getSortedFilteredCards(sortBy) {
    switch (sortBy) {
      case SortType.DATE:
        return [...this.getFilms()].sort((previous, next) => next.year - previous.year);
      case SortType.RATING:
        return [...this.getFilms()].sort((previous, next) => next.rating - previous.rating);
      default:
        return [...this.getFilms()];
    }
  }

  getFilms() {
    return this._moviesModel.getCards();
  }
}
