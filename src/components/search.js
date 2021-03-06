import AbstractComponent from './abstract-component.js';

const createSearchTemplate = () => {
  return (
    `<section class="films-list__search">
      <form class="films-list__search-form">
        <p>
          <input type="search" name="q" placeholder="I'm looking for...">
          <input type="submit" value="Search">
        </p>
      </form>
    </section>`
  );
};

export default class Search extends AbstractComponent {
  getTemplate() {
    return createSearchTemplate();
  }
}
