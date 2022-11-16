import React, {Suspense, lazy} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {FallbackView} from '../../_metronic/partials'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {CONFIG} from '../../helpers/config'
import {ProfileWrapper} from '../pages/profile/ProfileWrapper'
import FileCategories from '../pages/categories/FileCategories';
import GroupFileCategories from '../pages/categories/GroupFileCategories';
import TypeFileCategories from '../pages/categories/TypeFileCategories';
import HoSoDienTu from '../pages/hosodientus/HoSoDienTu'
import GiayToHoSoDienTus from '../pages/giaytohosodientus/GiayToHoSoDienTu'
import LoaiHoSoDienTus from '../pages/loaihosodientus/LoaiHoSoDienTu'

import NhomHoSoDienTus from '../pages/nhomhosodientus/NhomHoSoDienTu'
export function PrivateRoutes() {

  return (
    <Suspense fallback={<FallbackView />}>
      <Switch>
        {/* <Route path='/dashboard' component={DashboardWrapper} />
        <Route path='/profile' component={ProfileWrapper} />
        <Route path='/quan-tri' component={() => {
          window.location.replace(
            `${CONFIG.BASE_URL}/sites/admin/SitePages/default.aspx`
          );
          return null;
        }} /> */}
        <Route path='/categories' component={FileCategories} />
        <Route path='/group-file' component={GroupFileCategories} />
        <Route path='/type-file' component={TypeFileCategories} />
        <Route path='/loai-hsdt' component={LoaiHoSoDienTus} />
        <Route path='/nhom-hsdt' component={NhomHoSoDienTus} />
        <Route path='/ho-so-dien-tu' component={HoSoDienTu} />
        <Route path='/giay-to-ho-so-dien-tu' component={GiayToHoSoDienTus} />
        <Redirect from='/auth' to='/categories' />
        <Redirect exact from='/' to='/categories' />
        <Redirect to='error/404' />
      </Switch>
    </Suspense>
  )
}
