import * as types from "./action-types";
// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from 'redux';

export const initialWheelState = 0

function wheel (state = initialWheelState, action) {
  switch (action.type) {
    case types.MOVE_CLOCKWISE:
      return {
        ...state,
        activeCogIndex: (state.activeCogIndex + 1) % state.cogs.length,
        cogs: state.cogs.slice(1).concat(state.cogs[0]),
      };

    case types.MOVE_COUNTERCLOCKWISE:
      return {
        ...state,
        activeCogIndex: (state.activeCogIndex - 1 + state.cogs.length) % state.cogs.length,
        cogs: [state.cogs[state.cogs.length - 1]].concat(state.cogs.slice(0, -1)),
      };

    default: return state;
  }
};

const initialQuizState = null
function quiz(state = initialQuizState, action) {
  return state
}

const initialSelectedAnswerState = null
function selectedAnswer(state = initialSelectedAnswerState, action) {
  return state
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
  return state
}

export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form })