/* eslint-disable react/jsx-no-target-blank */
import {KTSVG} from '../../../helpers'
import {AsideMenuItemWithSub} from './AsideMenuItemWithSub'
import {AsideMenuItem} from './AsideMenuItem'
import {useDispatch, useSelector} from 'react-redux'
import React, {useState, useEffect} from 'react'
import {CONFIG} from '../../../../helpers/config'

export const AsideMenuMain = () => {
  const accessToken = useSelector((state) => state.global.accessToken)

  const [data, setData] = useState([])

  return (
    <>
      <AsideMenuItemWithSub
        to='/manage/'
        title='Giấy tờ cá nhân'
        // icon='/media/icons/duotune/communication/com006.svg'
        // fontIcon='bi-person'
      >
        <AsideMenuItem to='/categories' title='Giấy tờ cá nhân' hasBullet={true} />
        <AsideMenuItem to='/group-file' title='Nhóm giấy tờ' hasBullet={true} />
        <AsideMenuItem to='/type-file' title='Loại giấy tờ' hasBullet={true} />
      </AsideMenuItemWithSub>
      <AsideMenuItem to='/ho-so-dien-tu' title='Hồ sơ điện tử' hasBullet={false} />
      <AsideMenuItem to='/giay-to-ho-so-dien-tu' title='Giấy tờ hồ sơ điện tử' hasBullet={false} />
      {/* <AsideMenuItem
        to='/dashboard'
        icon='/media/icons/duotune/general/gen032.svg'
        title='Dashboard'
      />
      <AsideMenuItem
        to='/quan-tri'
        icon='/media/icons/duotune/general/gen049.svg'
        title='Quản trị'
      /> */}
    </>
  )
}
