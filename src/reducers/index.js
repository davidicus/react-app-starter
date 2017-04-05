import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import logger from './logger';
import other from './other';

const rootReducer = combineReducers({logger, other, routing: routerReducer});

export default rootReducer;
