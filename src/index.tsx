import React from 'react'
import ReactDOM from 'react-dom'
// Redux
// https://github.com/rt2zz/redux-persist
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import * as _redux from './setup'
import store, { persistor } from './setup/redux/Store'
// Apps
import { App } from './app/App'
import { ConfigProvider } from "antd";
import locale from 'antd/lib/locale/vi_VN';
import { MetronicI18nProvider } from './_metronic/i18n/Metronici18n'
import 'antd/dist/antd.css'
import 'react-toastify/dist/ReactToastify.css';
/**
 * TIP: Replace this style import with dark styles to enable dark mode
 *
 * import './_metronic/assets/sass/style.dark.scss'
 *
 * TIP: Replace this style import with rtl styles to enable rtl mode
 *
 * import './_metronic/assets/css/style.rtl.css'
 **/
import './_metronic/assets/sass/style.scss'
import './_metronic/assets/sass/style.react.scss'
/**
 * Base URL of the website.
 *
 * @see https://facebook.github.io/create-react-app/docs/using-the-public-folder
 */
const { PUBLIC_URL } = process.env
/**
 * Creates `axios-mock-adapter` instance for provided `axios` instance, add
 * basic Metronic mocks and returns it.
 *
 * @see https://github.com/ctimmerm/axios-mock-adapter
 */

ReactDOM.render(
  <MetronicI18nProvider>
    <ConfigProvider locale={locale}>
      <Provider store={store}>
        {/* Asynchronously persist redux stores and show `SplashScreen` while it's loading. */}
        <PersistGate persistor={persistor} loading={<div>Loading...</div>}>
          <App basename={PUBLIC_URL} />
        </PersistGate>
      </Provider>
    </ConfigProvider>
  </MetronicI18nProvider>,
  document.getElementById('root')
)
