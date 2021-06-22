import {combineReducers} from 'redux';
import auth from './auth';
import imageRecognition from './ImageRecognition';

const rootReducer = combineReducers({
    [auth.types.NAME]: auth.reducer,
    [imageRecognition.types.NAME]: imageRecognition.reducer,
});

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;