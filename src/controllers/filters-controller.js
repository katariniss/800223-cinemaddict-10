import FiltersComponent from '../components/filters.js';
import {render, RenderPosition} from '../utils';
import {generateFilters} from '../mocks/filter';
import {FilterType} from '../const';

export default class FiltersController {
  constructor(container, moviesModel) {
    this._moviesModel = moviesModel;
    this._container = container;

    this._activeFilterType = FilterType.ALL;

    this._onFilterChange = this._onFilterChange.bind(this);
  }

  render() {
    const siteMenuComponent = new FiltersComponent(generateFilters());
    render(this._container, siteMenuComponent.getElement(), RenderPosition.BEFOREEND);
    siteMenuComponent.setFilterChangeHandler(this._onFilterChange);
  }

  _onFilterChange(filterType) {
    this._moviesModel.setFilter(filterType);
    this._activeFilterType = filterType;
  }
}
