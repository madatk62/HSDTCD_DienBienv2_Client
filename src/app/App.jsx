import React, {Suspense} from 'react'
import {BrowserRouter, HashRouter} from 'react-router-dom'
import {I18nProvider} from '../_metronic/i18n/i18nProvider'
import {LayoutProvider, LayoutSplashScreen} from '../_metronic/layout/core'
import AuthInit from './routing/AuthInit'
import {Routes} from './routing/Routes'
import {ToastContainer, toast} from 'react-toastify'
import moment from 'moment'
import 'moment/locale/vi'
moment.locale('vi')

const App = ({basename}) => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <BrowserRouter basename={basename}>
        <I18nProvider>
          <LayoutProvider>
            <AuthInit>
              <Routes />
              <ToastContainer
                position='top-right'
                autoClose={3000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </AuthInit>
          </LayoutProvider>
        </I18nProvider>
      </BrowserRouter>
    </Suspense>
  )
}

export {App}
