import { all } from 'redux-saga/effects'
import { combineReducers } from 'redux'
import * as auth from '../../app/modules/auth'
import { globalSlice } from './global/Slice'

export const rootReducer = combineReducers({
  global: globalSlice.reducer,
  auth: auth.reducer
})

export type RootState = ReturnType<typeof rootReducer>

export function* rootSaga() {
  yield all([auth.saga()])
}
