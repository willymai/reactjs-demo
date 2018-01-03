/**
 * Created by truyetnguyen on 6/14/17.
 */

import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux'
const rootReducer = combineReducers({
  router: routing
});

export default rootReducer
