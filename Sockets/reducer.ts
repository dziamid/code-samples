import {SUBSCRIBE, UNSUBSCRIBE} from './constants';
import {Map} from 'immutable';
import {ISocketAction, ISubscribeAction, IUnsubscribeAction} from "./actions";
import {IState} from "../types/redux";

const initialState = Map({
  subscriptions: Map({}),
});

export default function (state: IState = initialState, action: ISocketAction) {

  switch (action.type) {
    case SUBSCRIBE:
      return subscribeReducer(state, action as ISubscribeAction);

    case UNSUBSCRIBE:
      return unsubscribeReducer(state, action as IUnsubscribeAction);

    default:
      return state;
  }
}

function subscribeReducer(state: IState, action: ISubscribeAction) {
  const subscriptions = state.get('subscriptions');
  const {payload: subscription} = action;

  return state.set('subscriptions', subscriptions.set(subscription.id, subscription));
}


function unsubscribeReducer(state: IState, action: IUnsubscribeAction) {
  const subscriptions = state.get('subscriptions');
  const {payload: id} = action;

  return state.set('subscriptions', subscriptions.delete(id));

}