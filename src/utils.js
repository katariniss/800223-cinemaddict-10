import moment from "moment";
import he from "he";

const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const HIDDEN_CLASS = `visually-hidden`;

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

const show = (element) => {
  element.classList.remove(HIDDEN_CLASS);
};

const hide = (element) => {
  element.classList.add(HIDDEN_CLASS);
};

const replace = (newComponent, oldComponent) => {
  if (newComponent && oldComponent) {
    const parentElement = oldComponent.getElement().parentElement;
    const newElement = newComponent.getElement();
    const oldElement = oldComponent.getElement();

    const isExistElements = !!(parentElement && newElement && oldElement);

    if (isExistElements && parentElement.contains(oldElement)) {
      parentElement.replaceChild(newElement, oldElement);
    }
  }
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(max * Math.random());
};

const getRandomDecimal = (min, max) => {
  return ((max - min) * Math.random()).toFixed(1);
};


const formatDate = (date) => {
  const today = moment(new Date());
  if (today.diff(date, `week`) >= 1) {
    return moment(date).format(`YYYY/MM/DD hh:mm`);
  }
  return moment(date).fromNow();
};

const DESCRIPTION_MAX_LENGTH = 140;

const cutText = (text) => {
  return text.length > DESCRIPTION_MAX_LENGTH
    ? `${text.substring(0, DESCRIPTION_MAX_LENGTH - 1)}...`
    : text;
};

const encodeText = (text) => he.encode(text);

export {RenderPosition, createElement, render, remove, show, hide, replace, getRandomArrayItem, getRandomIntegerNumber, getRandomDecimal, formatDate, cutText, encodeText};
