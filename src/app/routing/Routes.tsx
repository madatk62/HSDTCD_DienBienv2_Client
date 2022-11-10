/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import React, {FC} from 'react'
import {Redirect, Switch, Route} from 'react-router-dom'
import {shallowEqual, useSelector} from 'react-redux'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import {PrivateRoutes} from './PrivateRoutes'
import { PublicRoutes } from './PublicRoutes'
import {ErrorsPage} from '../modules/errors/ErrorsPage'
import {RootState} from '../../setup'
const Routes: FC = () => {
  const accessToken = useSelector<RootState>(({auth}) => auth.accessToken, shallowEqual)
  return (
    <Switch>
    
     
      {accessToken?
        <><MasterLayout>
          <PrivateRoutes />
        </MasterLayout>
          {/* <Redirect from='auth/*' to ="/categories" />  */}
        </>: <PublicRoutes />}
    </Switch>
  )
}

export {Routes}
