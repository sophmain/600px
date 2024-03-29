import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import photoReducer from './photo';
import uploadReducer from './upload';
import galleryReducer from './gallery';
import commentsReducer from './comment';
import likesReducer from './like';
import followerReducer from './follower';
import searchReducer from './search';
import messageReducer from './message';

const rootReducer = combineReducers({
  session,
  photos: photoReducer,
  uploads: uploadReducer,
  galleries: galleryReducer,
  comments: commentsReducer,
  likes: likesReducer,
  followers: followerReducer,
  search: searchReducer,
  message: messageReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
