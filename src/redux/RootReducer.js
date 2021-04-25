import storage from 'redux-persist/lib/storage'
import { persistCombineReducers } from 'redux-persist'
import BaseReducer from './BaseReducer';
import entry from '../features/store/Reducer';

const rootReducer = {
    baseReducer: BaseReducer,
    entry
}

export const persistConfig = {
    key: 'Project.0.0',
    storage,
    blacklist: [
        'entry',
    ]
}

const appReducer = persistCombineReducers(persistConfig, rootReducer)

const reducer = (state, action) => {
    return appReducer(state, action)
};

export default reducer;