export const createSiteMenuMarkup = (filter) => {
  const {name, count} = filter;

  return (
    `<a href="#${name}" class="main-navigation__item main-navigation__item--${name}">${name}<span class="main-navigation__item-count">${count}</span></a>`
  );
};

export const createSiteMenuTemplate = (filters) => {
  const filtersMarkup = filters.map((it, i) => createSiteMenuMarkup(it, i === 0)).join(`\n`);

  return (
    `<nav class="main-navigation">
        <a href="#all" class="main-navigation__item main-navigation__item--all">All movies</a>
        ${filtersMarkup}
        <a href="#stats" class="main-navigation__item main-navigation__item--additional main-navigation__item--active">Stats</a>
    </nav>`
  );
};
