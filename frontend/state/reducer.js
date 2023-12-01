import * as types from "./action-types";
// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from 'redux';

export const initialWheelState = 0
function wheel(state = initialWheelState, action) {
  switch (action.type) {
    case types.MOVE_CLOCKWISE:
      return (state + 1) % 6;
    case types.MOVE_COUNTERCLOCKWISE:
      return (state - 1 + 6) % 6;
    default:
      return state;
  }
};

const initialQuizState = null
function quiz(state = initialQuizState, action) {
  switch (action.type) {
    case types.SET_QUIZ_INTO_STATE:
      return action.payload;
    default:
      return state;
  }
}

const initialSelectedAnswerState = null;
function selectedAnswer(state = initialSelectedAnswerState, action) {
  switch (action.type) {
    case types.SET_SELECTED_ANSWER:
      return action.payload;
    default:
      return state;
  }
}

const initialMessageState = ''
function infoMessage(state = initialMessageState, action) {
  return state
}

const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
}
function form(state = initialFormState, action) {
  switch (action.type) {
    case types.INPUT_CHANGE:
      return { ...state, [action.payload.id]: action.payload.value };
    case types.RESET_FORM:
      return initialFormState;
    default:
      return state;
  }
}

export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form })