import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {AnyAction} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import type { AppDispatch, TDispatch } from './store';
import type { RootState } from '../features/rootReducer';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useThunkDispatch = () => useDispatch<TDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;