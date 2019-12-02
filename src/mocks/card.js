import {getRandomArrayItem, getRandomIntegerNumber, getRandomDecimal} from '../utils.js';

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

const FilmsPosters = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`
];

const generateCards = (count) => {
  return [...new Array(count)]
    .map(generateCard);
};

const MAX_DURATION_IN_HOURS = 2;
const MAX_DURATION_IN_MINUTES = 55;

const MIN_YEAR = 1980;
const MAX_YEAR = 2020;

const MIN_RATING = 0;
const MAX_RATING = 10;

const generateCard = () => {
  const DurationInHours = getRandomIntegerNumber(1, MAX_DURATION_IN_HOURS);
  const DurationInMinutes = getRandomIntegerNumber(0, MAX_DURATION_IN_MINUTES);

  return {
    name: getRandomArrayItem(FilmsList),
    description: getRandomArrayItem(DescriptionItems) + getRandomArrayItem(DescriptionItems),
    rating: getRandomDecimal(MIN_RATING, MAX_RATING),
    year: getRandomIntegerNumber(MIN_YEAR, (MAX_YEAR - MIN_YEAR)),
    durationInHours: DurationInHours,
    durationInMinutes: DurationInMinutes,
    totalDuration: `${DurationInHours}h ${DurationInMinutes}m`,
    genre: getRandomArrayItem(FilmsGenres),
    poster: getRandomArrayItem(FilmsPosters),
    toWatch: Math.random() > 0.5,
    isWatched: Math.random() > 0.5,
    isFavourite: Math.random() > 0.5,
    commentsCount: getRandomIntegerNumber(0, 20)
  };
};

export {generateCard, generateCards};
