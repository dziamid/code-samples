import * as Pusher from 'pusher-js';
import {configurePusher} from 'pusher-redux';
import {getSubscriptions} from 'pusher-redux';
import * as PusherRedux from 'pusher-redux';
import * as actions from './actions';

const uuidV1 = require('uuid/v1');
const config: any = {
  store: null,
};

export default function configureSocket(store: any) {
  Pusher.logToConsole = true;
  config.store = store;
  return configurePusher(store, process.env.PUSHER_KEY, {
    cluster: process.env.PUSHER_CLUSTER,
    encrypted: true
  })
}

export function subscribe(channelName: string, eventName: string, actionType: string) {
  const id = uuidV1();
  config.store.dispatch(actions.subscribe(id, channelName, eventName, actionType));
  PusherRedux.subscribe(channelName, eventName, actionType);
}

export function unsubscribe(id: string) {
  const state = config.store.getState();
  const subscription = state.getIn(['socket', 'subscriptions', id]);
  if (subscription) {
    const {channelName, eventName, actionType} = subscription;
    config.store.dispatch(actions.unsubscribe(id));
    PusherRedux.unsubscribe(channelName, eventName, actionType);
  }

}

export function refreshSubscriptions() {
  const state = config.store.getState();
  const subscriptions = state.getIn(['socket', 'subscriptions']);
  unsubscribeAll();
  subscriptions.forEach(s => subscribe(s.channelName, s.eventName, s.actionType));
}

export function unsubscribeAll() {
  const state = config.store.getState();
  const subscriptions = state.getIn(['socket', 'subscriptions']);
  subscriptions.forEach(s => unsubscribe(s.id));
}

export function getAccountChannel(accountId) {
  return `account-${accountId}`;
}

