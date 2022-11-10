import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  accessToken: null,
  userInfo: null,
  listLoading: false,
  actionsLoading: false,
  error: null,
}
export const callTypes = {
  list: 'list',
  action: 'action',
}

export const globalSlice = createSlice({
  name: 'global',
  initialState: initialState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false
      } else {
        state.actionsLoading = false
      }
    },
    startCall: (state, action) => {
      state.error = null
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true
      } else {
        state.actionsLoading = true
      }
    },

    logOut: (state, action) => {
      state = initialState
    },

    setAccessToken: (state, action) => {
      const payload = action.payload
      state.accessToken = payload
    },
    setUserInfo: (state, action) => {
      const payload = action.payload
      state.userInfo = payload
    },
  },
})
