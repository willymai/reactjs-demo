import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import { createLogger } from 'redux-logger'

const configureStore = (history) => createStore(
  rootReducer,
  applyMiddleware(thunk, history)
)

export default configureStore
