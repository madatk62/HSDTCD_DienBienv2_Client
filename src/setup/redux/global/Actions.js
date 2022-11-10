import * as requestFromServer from './Crud'
import { globalSlice, callTypes } from './Slice'

const { actions } = globalSlice

export const setAccessToken = (accessToken) => (dispatch) => {
  dispatch(actions.setAccessToken(accessToken))
}

export const getUserInfo = (userInfo) => (dispatch) => {
  dispatch(actions.setUserInfo(userInfo))
}
