import { delay } from '../utils/common';
// import key from 'keymaster';

export default {

    namespace: 'count',

    state: {
        record: 0,
        current: 0,
    },

    subscriptions: {
        keyboardWatcher({ dispatch }) {
            // key('⌘+up, ctrl+up', () => { dispatch({type:'add1'}) });
        },
    },

    effects: {
        *add({ payload }, { call, put }) {  // eslint-disable-line
            yield put({ type: 'add1'});
            yield call(delay, 1000);
            yield put({ type: 'minus' });
        },
    },

    reducers: {
        add1(state, action) {
            const newCurrent = state.current + 1;
            return { ...state,
                record: newCurrent > state.record ? newCurrent : state.record,
                current: newCurrent,
            };
        },
        minus(state) {
            return { ...state, current: state.current - 1 };
        },
    },

};
