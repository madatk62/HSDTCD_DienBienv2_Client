/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { KTSVG } from '../../../helpers'
import { Dropdown1 } from '../../content/dropdown/Dropdown1'

const ListsWidget6 = ({ className }) => {
  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0'>
        <h3 className='card-title fw-bolder text-dark'>Công việc đơn vị</h3>
        <div className='card-toolbar'>
          {/* begin::Menu */}
          <button
            type='button'
            className='btn btn-sm btn-icon btn-color-primary btn-active-light-primary'
            data-kt-menu-trigger='click'
            data-kt-menu-placement='bottom-end'
            data-kt-menu-flip='top-end'
          >
            <KTSVG path='/media/icons/duotune/general/gen024.svg' className='svg-icon-2' />
          </button>
          <Dropdown1 />
          {/* end::Menu */}
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body card-dashboard pt-2'>
        <marquee id="MARQUEE" direction="up" scrollamount="3" className='h-400px'>
        {/* begin::Item */}
        <div className='d-flex align-items-center bg-light-warning rounded p-5 mb-2'>
          {/* begin::Icon */}
          <span className='svg-icon svg-icon-warning me-5'>
            <KTSVG path='/media/icons/duotune/abstract/abs027.svg' className='svg-icon-1' />
          </span>
          {/* end::Icon */}
          {/* begin::Title */}
          <div className='flex-grow-1 me-2'>
            <a href='#' className='fw-bolder text-gray-800 text-hover-primary fs-6'>
              Lịch họp mới
            </a>
            <span className='text-muted fw-bold d-block'>Họp UBND tháng 12 sẽ diễn ra vào 8 giờ ngày 15/12/2021</span>
          </div>
          {/* end::Title */}
        </div>
        {/* end::Item */}
        
        {/* begin::Item */}
        <div className='d-flex align-items-center bg-light-info rounded p-5 mb-2'>
          {/* begin::Icon */}
          <span className='svg-icon svg-icon-info me-5'>
            <KTSVG path='/media/icons/duotune/abstract/abs027.svg' className='svg-icon-1' />
          </span>
          {/* end::Icon */}
          {/* begin::Title */}
          <div className='flex-grow-1 me-2'>
            <a href='#' className='fw-bolder text-gray-800 text-hover-primary fs-6'>
              Lịch họp mới
            </a>
            <span className='text-muted fw-bold d-block'>Họp UBND tháng 12 sẽ diễn ra vào 8 giờ ngày 15/12/2021</span>
          </div>
          {/* end::Title */}
        </div>
        {/* end::Item */}

        {/* begin::Item */}
        <div className='d-flex align-items-center bg-light-danger rounded p-5 mb-2'>
          {/* begin::Icon */}
          <span className='svg-icon svg-icon-danger me-5'>
            <KTSVG path='/media/icons/duotune/abstract/abs027.svg' className='svg-icon-1' />
          </span>
          {/* end::Icon */}
          {/* begin::Title */}
          <div className='flex-grow-1 me-2'>
            <a href='#' className='fw-bolder text-gray-800 text-hover-primary fs-6'>
              Lịch họp mới
            </a>
            <span className='text-muted fw-bold d-block'>Họp UBND tháng 12 sẽ diễn ra vào 8 giờ ngày 15/12/2021</span>
          </div>
          {/* end::Title */}
        </div>
        {/* end::Item */}

        {/* begin::Item */}
        <div className='d-flex align-items-center bg-light-success rounded p-5 mb-2'>
          {/* begin::Icon */}
          <span className='svg-icon svg-icon-success me-5'>
            <KTSVG path='/media/icons/duotune/abstract/abs027.svg' className='svg-icon-1' />
          </span>
          {/* end::Icon */}
          {/* begin::Title */}
          <div className='flex-grow-1 me-2'>
            <a href='#' className='fw-bolder text-gray-800 text-hover-primary fs-6'>
              Lịch họp mới
            </a>
            <span className='text-muted fw-bold d-block'>Họp UBND tháng 12 sẽ diễn ra vào 8 giờ ngày 15/12/2021</span>
          </div>
          {/* end::Title */}
        </div>
        {/* end::Item */}

        {/* begin::Item */}
        <div className='d-flex align-items-center bg-light-info rounded p-5 mb-2'>
          {/* begin::Icon */}
          <span className='svg-icon svg-icon-info me-5'>
            <KTSVG path='/media/icons/duotune/abstract/abs027.svg' className='svg-icon-1' />
          </span>
          {/* end::Icon */}
          {/* begin::Title */}
          <div className='flex-grow-1 me-2'>
            <a href='#' className='fw-bolder text-gray-800 text-hover-primary fs-6'>
              Lịch họp mới
            </a>
            <span className='text-muted fw-bold d-block'>Họp UBND tháng 12 sẽ diễn ra vào 8 giờ ngày 15/12/2021</span>
          </div>
          {/* end::Title */}
        </div>
        {/* end::Item */}
        {/* begin::Item */}
        <div className='d-flex align-items-center bg-light-warning rounded p-5 mb-2'>
          {/* begin::Icon */}
          <span className='svg-icon svg-icon-warning me-5'>
            <KTSVG path='/media/icons/duotune/abstract/abs027.svg' className='svg-icon-1' />
          </span>
          {/* end::Icon */}
          {/* begin::Title */}
          <div className='flex-grow-1 me-2'>
            <a href='#' className='fw-bolder text-gray-800 text-hover-primary fs-6'>
              Lịch họp mới
            </a>
            <span className='text-muted fw-bold d-block'>Họp UBND tháng 12 sẽ diễn ra vào 8 giờ ngày 15/12/2021</span>
          </div>
          {/* end::Title */}
        </div>
        {/* end::Item */}
        </marquee>
      </div>
      {/* end::Body */}
    </div>
  )
}

export { ListsWidget6 }
