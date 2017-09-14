import {IAction} from 'types/redux';
import {SUBSCRIBE, UNSUBSCRIBE} from './constants';

export type ISocketAction = ISubscribeAction | IUnsubscribeAction;

export interface ISubscribeAction extends IAction {
  payload: {
    id: string;
    channelName: string;
    eventName: string;
    actionType: string;
  }
}

export function subscribe(id: string, channelName: string, eventName: string, actionType: string): ISubscribeAction {
  return {
    type: SUBSCRIBE,
    payload: {
      id,
      channelName,
      eventName,
      actionType,
    },
  };
}

export interface IUnsubscribeAction extends IAction {
  payload: string
}

export function unsubscribe(id: string): IUnsubscribeAction {
  return {
    type: UNSUBSCRIBE,
    payload: id,
  };
}
