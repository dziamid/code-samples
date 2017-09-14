/**
 * Selectors to query relational data from redux
 *
 */
import {createSelector} from 'reselect';
import schema from "./schema";
import {IModels, IModelName, IInclude, ISchemas, IModelsObject} from 'models/types';

const {jobPosition: jobPositionSchema} = schema;

import {values, pick} from 'lodash';
import {Id} from "types/index";
import {Map, List} from 'immutable';

export const selectModels = (state: Map<any, any>) => state.get('models');

export const selectModel = (name: IModelName) => createSelector(
  selectModels,
  (models: IModels) => {
    return pick(models, [name]);
  },
)

export const findOne = (name: IModelName, id: Id) => createSelector(
  selectModel(name),
  (model: IModelsObject) => {
    const models = model[name];
    return models && models[id];
  }
)

export const find = (name: IModelName, ids: Id[]) => createSelector(
  selectModel(name),
  (model: IModelsObject) => {
    return values(pick(model, ids));
  }
)

export const findAll = (name: IModelName) => createSelector(
  selectModel(name),
  (model: IModelsObject) => {
    return values(model)[0];
  }
)

export const findAllValues = (name: IModelName) => createSelector(
  selectModel(name),
  (model: IModelsObject) => {
    return values(values(model)[0]);
  }
)
