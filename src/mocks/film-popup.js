import {generateCard} from './card.js';
import {getRandomArrayItem, getRandomIntegerNumber} from '../utils.js';

const Countries = [`USA`,
  `UK`,
  `Australia`,
  `Germany`,
];
const Months = [`January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`,
];
const Directors = [`Anthony Mann`, `Stephen Spielberg`, `Martin Scorcese`, `Quentin Tarantino`];
const Writers = [`Anne Wigton`, ` Heinz Herald`, `Richard Weil`];
const Actors = [`Leonardo DiCaprio`, `Brad Pitt`, `Steve Carell`, `John Krasinski`];
const Ages = [6, 12, 16, 18];

const generateFilmPopup = () => {
  const originalCard = generateCard();
  originalCard.subtitle = originalCard.name;
  originalCard.country = getRandomArrayItem(Countries);
  originalCard.month = getRandomArrayItem(Months);
  originalCard.releaseDay = getRandomIntegerNumber(0, 30);
  originalCard.director = getRandomArrayItem(Directors);
  originalCard.writer = getRandomArrayItem(Writers);
  originalCard.actor = getRandomArrayItem(Actors);
  originalCard.ageRestriction = getRandomArrayItem(Ages);
  return originalCard;
};

export {generateFilmPopup};
