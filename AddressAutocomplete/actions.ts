import {Action} from 'redux';
import {ISelectOption} from "../Select/index";
import {IAction} from 'types/redux';

export interface ILoadOptionsAction extends IAction {
  payload: {
    query: string;
    fieldId: string;
  }
}
export function loadOptions(query: string, fieldId: string): ILoadOptionsAction {
  return {
    type: 'ADDRESS_AUTOCOMPLETE_LOAD',
    payload: {
      query,
      fieldId,
    },
  };
}

export interface IOptionSelectedAction extends IAction {
  payload: {
    option: ISelectOption|null;
    fieldId: string;
  }
}

export function optionSelected(option: ISelectOption, fieldId: string): IOptionSelectedAction {
  return {
    type: 'ADDRESS_AUTOCOMPLETE_OPTION_SELECTED',
    payload: {
      option,
      fieldId,
    },
  };
}
