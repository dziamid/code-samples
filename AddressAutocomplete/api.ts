import {google} from 'google-maps';
import {IDatasourceAutocomplete} from "types/datasource";
import AutocompletePrediction = google.maps.places.AutocompletePrediction;
import {hasIn, omit} from 'lodash';
import {ILocationDetails} from "types/location";
const loadGoogleMapsAPI = require('load-google-maps-api').default;
import PlaceResult = google.maps.places.PlaceResult;

interface IWindow extends Window {
  google: google;
}

declare const window: IWindow;

export function isAPILoaded() {
  return hasIn(window, 'google.maps.places.AutocompleteService') && hasIn(window, 'google.maps.places.PlacesService');
}

export function loadAPI() {
  return loadGoogleMapsAPI({
    key: process.env.GOOGLE_API_KEY,
    libraries: ['places'],
    language: 'en',
  });
}

export function loadSuggestions(input: string) {
  return new Promise((resolve, reject) => {
    if (!isAPILoaded()) {
      reject('Google maps API is not loaded');
      return;
    }

    const autocompleteService = new window.google.maps.places.AutocompleteService();
    const OK = window.google.maps.places.PlacesServiceStatus.OK;
    const ZERO_RESULTS = window.google.maps.places.PlacesServiceStatus.ZERO_RESULTS;

    autocompleteService.getPlacePredictions({input}, (predictions: any, status: any) => {
      if (status === ZERO_RESULTS) {
        resolve(predictionsToSuggesions([]));
      }
      if (status !== OK) {
        reject(status);
      } else {
        resolve(predictionsToSuggesions(predictions));
      }
    });
  });
}

export function loadPlaceDetails(placeId: string) {
  return new Promise((resolve, reject) => {
    if (!isAPILoaded()) {
      reject('Google maps API is not loaded');
      return;
    }

    const placesDetailsService = new window.google.maps.places.PlacesService(document.createElement('div'));
    const OK = window.google.maps.places.PlacesServiceStatus.OK;
    const ZERO_RESULTS = window.google.maps.places.PlacesServiceStatus.ZERO_RESULTS;
    placesDetailsService.getDetails({placeId: placeId}, (result: PlaceResult, status) => {
      if (status === ZERO_RESULTS) {
        resolve({});
      }
      if (status !== OK) {
        reject(status);
      } else {
        resolve(parsePlaceDetails(result));
      }
    });
  });
}

const parsePlaceDetails = (placeResult: PlaceResult): ILocationDetails => {
  return {
    country: getAddressComponentLongName(placeResult, 'country'),
    state: getAddressComponentLongName(placeResult, 'administrative_area_level_1'),
    city: getAddressComponentLongName(placeResult, 'locality'),
    zip: getAddressComponentLongName(placeResult, 'postal_code'),
    street: getStreet(placeResult),
    lat: String(placeResult.geometry.location.lat()),
    long: String(placeResult.geometry.location.lng()),
  };
}

const getAddressComponentLongName = (placeResult: PlaceResult, addressComponentType: string): string => {
  const addressComponent = placeResult.address_components.find(ac => ac.types.indexOf(addressComponentType) !== -1);

  return addressComponent ? addressComponent.long_name : null;
}

const getStreet = (placeResult: PlaceResult): string => {
  const street = getAddressComponentLongName(placeResult, 'route');
  const streetNumber = getAddressComponentLongName(placeResult, 'street_number');
  if (!street) {
    return null;
  }

  return `${streetNumber} ${street}`.trim();
}


function predictionsToSuggesions(predictions: AutocompletePrediction[]): IDatasourceAutocomplete[] {
  return predictions.map(p => ({text: p.description, value: p.place_id}));
}
