/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC} from 'react'
import {KTSVG} from '../../../helpers'
import {ChatInner} from '../../chat/ChatInner'
import { CONFIG } from '../../../../helpers/config'

const DrawerMessenger: FC = () => (
  <div
    id='kt_drawer_chat'
    className='bg-white'
    data-kt-drawer='true'
    data-kt-drawer-name='chat'
    data-kt-drawer-activate='true'
    data-kt-drawer-overlay='true'
    data-kt-drawer-width="{default:'40%', 'md': '45%'}"
    data-kt-drawer-direction='end'
    data-kt-drawer-toggle='#kt_drawer_chat_toggle'
    data-kt-drawer-close='#kt_drawer_chat_close'
  >
    <iframe src={`${CONFIG.BASE_URL}/sites/dashboard/SitePages/ttnb/default.aspx#/sites/dashboard/SitePages/ttnb/chat`} className="iframeApp h-100"></iframe>
  </div>
)

export {DrawerMessenger}
