import {mergeWith, cloneDeep} from 'lodash';
import {fromJS} from 'immutable';

import {ADD_ENTITIES, CLEAR_ENTITIES} from './constrants';
import {IModelName, IModels} from "models/types";

const initialState = {
};

export default (state = initialState, action: any) => {
  switch (action.type) {

    case ADD_ENTITIES: {
      const models = action.entities;

      const newState = cloneDeep(state);

      return mergeWith(newState, models);
    }

    case CLEAR_ENTITIES: {
      if (!action.names) {
        return {};
      } else {
        const newState = {...state};
        action.names.map(n => delete newState[n]);
        return newState;
      }
    }

    default:
      return state;
  }
};
