import {id} from 'types';
import {ISchemas, IInclude} from "models/types";
const {get, post, patch, put, destroy} = require('utils/request');

const urls: Partial<ISchemas> = {
  account: '/accounts',
  user: '/users',
  company: '/companies',
  jobPosition: '/jobPositions',
  jobTitle: '/jobTitles',
  workflow: '/workflows',
  candidate: '/candidates',
  degreeType: '/degreeTypes',
};

export function* fetchModel(model: string, ids: id[], include: IInclude[]) {
  const url = urls[model]; //todo: pluralize
  const where = {id: {inq: ids}};
  const filter = {where, include};
  const params = {filter};

  return yield get({url, params});
}

