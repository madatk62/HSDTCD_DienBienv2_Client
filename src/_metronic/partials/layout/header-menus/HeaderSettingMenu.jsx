/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../../setup/redux/global/Actions'

const HeaderSettingMenu = () => {
  const dispatch = useDispatch()

  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-350px w-lg-400px'
      data-kt-menu='true'
    >
      
    </div>
  )
}

export { HeaderSettingMenu }
