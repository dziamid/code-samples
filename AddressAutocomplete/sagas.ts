import {put, select} from 'redux-saga/effects';
const {throttle, takeEvery, fork} = require('redux-saga');
import {ILoadOptionsAction, IOptionSelectedAction} from './actions';
import {IDatasourceAutocomplete} from "types/datasource";
import {ILocationDetails} from "types/location";
import {loadPlaceDetails, loadSuggestions, isAPILoaded, loadAPI} from './api';
import {change, getSiblingFieldId} from 'utils/form';

function* handleAutocompleteLoad(action: ILoadOptionsAction) {
  const {payload: {query, fieldId}} = action;
  const options: IDatasourceAutocomplete[] = query ? yield loadSuggestions(query) : [];
  const optionsFieldId = getSiblingFieldId(fieldId, 'options');

  yield put(change(optionsFieldId, options));
}

function* handleDetailsLoad(action: IOptionSelectedAction) {
  const {option, fieldId} = action.payload;
  const addressFieldId = getSiblingFieldId(fieldId, 'address');
  const detailsFieldId = getSiblingFieldId(fieldId, 'details');
  const optionsFieldId = getSiblingFieldId(fieldId, 'options');

  if (option === null) {
    //clear field
    yield put(change(fieldId, null)); //placeId
    yield put(change(addressFieldId, null));
    yield put(change(detailsFieldId, {}));
    yield put(change(optionsFieldId, []));
    return;
  }

  const placeId = String(option.value);
  const address = option.label;

  yield put(change(fieldId, placeId));
  yield put(change(addressFieldId, address));

  const details: ILocationDetails = yield loadPlaceDetails(placeId);
  yield put(change(detailsFieldId, details));
}

export function* watchAddressRequest() {
  if (!isAPILoaded()) {
    yield loadAPI();
  }

  yield throttle(1000, 'ADDRESS_AUTOCOMPLETE_LOAD', handleAutocompleteLoad);
  yield takeEvery('ADDRESS_AUTOCOMPLETE_OPTION_SELECTED', handleDetailsLoad);
}

