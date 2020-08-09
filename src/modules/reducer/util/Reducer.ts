import {Action, AnyAction, Reducer} from 'redux';

export function isAction<A extends AnyAction>(action: AnyAction, type: A['type']): action is A {
  return action.type === type;
}

export function createReducer<S>(defaultState: any = {}, syncKey: string | null = null) {
  const map = new Map<string, Reducer<S>>();

  const addReducer = <A extends Action>(type: A['type'], reducer: (state: S, action: A) => S) => {
    if (!type) {
      throw new Error('Empty type');
    }
    // @ts-ignore
    map.set(type, reducer);
  };

  const combinedReducer = (state: S | undefined = undefined, action: Action = {type: ''}) => {
    if (typeof state === 'undefined') {
      return defaultState;
    }
    
    let newState = state;
    const reducer = map.get(action.type);
    if (reducer) {
      newState = reducer(newState, action);
    }

    return newState;
  };

  return {addReducer, combinedReducer};
}

export function arrayToList<O extends { id: string }>(array: O[]): { [id: string]: O } {
  return array.reduce<{ [id: string]: O }>((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {});
}