import {getRandomArrayItem, getRandomIntegerNumber, getRandomDecimal} from '../utils.js';
import moment from 'moment';

const FilmsList = [
  `Matrix`,
  `Green Book`,
  `Frozen`,
  `Brave Heart`,
  `Good Will Hunting`,
  `The Help`,
  `Lilo and Stitch`,
  `Adventureland`,
  `Notting Hill`,
  `Love, Actually`,
  `Avengers`,
  `Long Shot`,
  `Crazy, Stupid, Love`,
  `La-la-la Land`,
  `Revenant`
];

const DescriptionItems = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

const FilmsGenres = [
  `comedy`,
  `drama`,
  `thriller`,
  `animation`,
  `musical`,
  `fantasy`,
  `science fiction`,
  `romance`,
  `action`
];

const releaseDate = new Date(new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 10000))
);

const minsToMilliseconds = (minutes) => minutes * 60 * 1000;
const runTime = getRandomIntegerNumber(minsToMilliseconds(120), minsToMilliseconds(60));

const FilmsPosters = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`
];

const Countries = [`USA`,
  `UK`,
  `Australia`,
  `Germany`,
];

const Directors = [`Anthony Mann`, `Stephen Spielberg`, `Martin Scorcese`, `Quentin Tarantino`];
const Writers = [`Anne Wigton`, ` Heinz Herald`, `Richard Weil`];
const Actors = [`Leonardo DiCaprio`, `Brad Pitt`, `Steve Carell`, `John Krasinski`];
const Ages = [6, 12, 16, 18];

const FILM_COMMENTS_MIN = 2;
const FILM_COMMENTS_MAX = 10;

const COMMENTS_EMOJIES = [
  `./images/emoji/smile.png`,
  `./images/emoji/puke.png`,
  `./images/emoji/sleeping.png`,
  `./images/emoji/angry.png`
];

const COMMENTS_MESSAGES = [
  `Interesting setting and a good cast`,
  `Booooooooooring`,
  `Almost two hours? Seriously?`,
  `Very very old. Meh`
];

const COMMENTS_AUTHORS = [
  `Tim Macoveev`,
  `John Doe`
];

const generateFilmComments = () => {
  return new Array(getRandomIntegerNumber(FILM_COMMENTS_MIN, FILM_COMMENTS_MAX))
    .fill(``)
    .map(() => {
      return {
        emoji: getRandomArrayItem(COMMENTS_EMOJIES),
        text: getRandomArrayItem(COMMENTS_MESSAGES),
        author: getRandomArrayItem(COMMENTS_AUTHORS),
        date: releaseDate
      };
    });
};

const generateGenre = () => {
  const genres = FilmsGenres
  .slice()
  .filter(() => Math.random() > 0.5)
  .sort(() => (Math.random() - 0.5));

  return genres.length ? genres : [FilmsGenres[getRandomIntegerNumber(0, FilmsGenres.length - 1)]];
};

const getFilmDuration = (filmDuration) => {
  const momentDuration = moment.duration(filmDuration);
  return `${momentDuration.hours()}h ${momentDuration.minutes()}m`;
};

const generateCards = (count) => {
  return [...new Array(count)]
    .map(generateCard);
};

const MIN_YEAR = 1980;
const MAX_YEAR = 2020;

const MIN_RATING = 0;
const MAX_RATING = 10;

const generateCard = () => {
  const commentsArray = generateFilmComments();

  return {
    id: String(new Date() + Math.random()),
    name: getRandomArrayItem(FilmsList),
    description: getRandomArrayItem(DescriptionItems) + getRandomArrayItem(DescriptionItems),
    rating: getRandomDecimal(MIN_RATING, MAX_RATING),
    year: getRandomIntegerNumber(MIN_YEAR, (MAX_YEAR - MIN_YEAR)),
    genres: generateGenre(),
    poster: getRandomArrayItem(FilmsPosters),
    toWatch: Math.random() > 0.5,
    isWatched: Math.random() > 0.5,
    isFavorite: Math.random() > 0.5,
    commentsCount: getRandomIntegerNumber(0, 20),
    subtitle: getRandomArrayItem(FilmsList),
    country: getRandomArrayItem(Countries),
    releaseDay: getRandomIntegerNumber(0, 30),
    releaseDate,
    runTime,
    director: getRandomArrayItem(Directors),
    writer: getRandomArrayItem(Writers),
    actor: getRandomArrayItem(Actors),
    ageRestriction: getRandomArrayItem(Ages),
    comments: commentsArray
  };
};

export {generateCard, generateCards, getFilmDuration};
