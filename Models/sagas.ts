import {values, reduce} from 'lodash';

import {take, call, put, select, fork, cancel, race} from 'redux-saga/effects';
import {Id} from "types/index";
import schema from 'models/schema';
import {IModelName, IInclude} from 'models/types';

import {fetchModel} from './api';
import {addEntities} from './actions';
import {normalize} from 'normalizr';

interface INormalizedData {
  entities: any,
  result: any,
}

/**
 * Generalized method to query relational data from the backend and cache the result in redux
 *
 * Example usage:
 * const entities = yield queryModels('user', [userId], [
 *    {
 *      relation: 'companies',
 *      scope: {
 *        include: ['locations'],
 *      },
 *    },
 *
 */
export function* queryModels(modelName: IModelName, ids: Id[], include?: IInclude[]) {
  const singleModelSchema = schema[modelName];
  const denormalizedData: any[] = yield fetchModel(modelName, ids, include);
  const normalizedData: INormalizedData = normalize(denormalizedData, [singleModelSchema]);

  const {entities} = normalizedData;
  yield put(addEntities(entities));

  return reduce(entities, (result, value, key) => ({...result, [key]: values(value)}), {});
}
