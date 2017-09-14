
import {
  ADD_ENTITIES,
  CLEAR_ENTITIES,
} from './constrants';

import {IModelName} from "./types";

export function addEntities(entities: any) {
  return {
    type: ADD_ENTITIES,
    entities,
  };
}

export function clearEntities(names?: IModelName[]) {
  return {
    type: CLEAR_ENTITIES,
    names,
  }
}
