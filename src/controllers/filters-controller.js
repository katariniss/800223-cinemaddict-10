import FiltersComponent from '../components/filters.js';
import { render, RenderPosition } from '../utils';
import { generateFilters } from '../mocks/filter';

export default class FiltersController {
  constructor(container, moviesModel) {
    this._moviesModel = moviesModel;
    this._container = container;
  }

  render() {
    const siteMenuComponent = new FiltersComponent(generateFilters());
    render(this._container, siteMenuComponent.getElement(), RenderPosition.BEFOREEND);
  }
}
