export default class Statistics {
  constructor() {
    this._isVisible = true;

    this._statisticsChangeHandlers = [];
  }

  show() {
    this._isVisible = true;
    this._filterChangeHandlers.forEach((handler) => handler());
  }

  hide() {
    this._isVisible = false;
    this._filterChangeHandlers.forEach((handler) => handler());
  }

  setStatisticsHandler(handler) {
    this._statisticsChangeHandlers.push(handler);
  }
}
