import { FC, useEffect, useState } from 'react'
import { connect, useDispatch, ConnectedProps, useSelector } from 'react-redux'
import { RootState } from '../../setup'
import { getCookie, setCookie } from '../../helpers/cookies'
import { CONFIG } from '../../helpers/config'

import * as actions from '../../setup/redux/global/Actions'
import { LayoutSplashScreen } from '../../_metronic/layout/core'
import { requestPOST, requestGET } from '../../helpers/baseAPI'

const AuthInit = (props) => {
  const dispatch = useDispatch()
  const accessToken = useSelector((state) => state.global.accessToken)
  const [showSplashScreen, setShowSplashScreen] = useState(true)

  let token = getCookie('token')

  if (!token) {
    if (process.env.NODE_ENV === 'production') {
      sessionStorage.clear()
      localStorage.clear()
      window.location.href = `${CONFIG.BASE_URL}/_layouts/closeConnection.aspx?loginasanotheruser=true`
    } else {
      token = CONFIG.TOKEN_DEMO
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      console.log(process.env.NODE_ENV)
      if (!accessToken) {
        dispatch(actions.setAccessToken(token))
      }
      setShowSplashScreen(false)
    }
    fetchData()
    return () => { }
  }, [])

  return showSplashScreen || !accessToken ? <LayoutSplashScreen /> : <>{props.children}</>
}

export default AuthInit
