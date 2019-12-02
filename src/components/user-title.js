const getUserTitle = (watchedFilmsNumber) => {
  if (watchedFilmsNumber === 0) {
    return ``;
  } else if (watchedFilmsNumber >= 1 && watchedFilmsNumber <= 10) {
    return `Novice`;
  } else if (watchedFilmsNumber >= 11 && watchedFilmsNumber <= 20) {
    return `Fan`;
  }
  return `Movie Buff`;
};

export const createUserTitleTemplate = () => {
  return (
    `<section class="header__profile profile">
        <p class="profile__rating">${getUserTitle(21)}</p>
        <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};
