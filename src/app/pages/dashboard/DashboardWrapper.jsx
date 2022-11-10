/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Widget1, Widget2, Widget3} from './components'
import {MasterLayout} from '../../../_metronic/layout/MasterLayout'
import './index.scss'

const DashboardWrapper = () => {
  return (
    <>
      <div className='row m-0'>
        <Widget1 />
      </div>
      <div className='row m-0'>
        <Widget2 />
        <Widget3 />
      </div>
    </>
  )
}

export {DashboardWrapper}
