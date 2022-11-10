/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { KTSVG } from '../../../helpers'
import { Dropdown1 } from '../../content/dropdown/Dropdown1'

const ListsWidget3 = ({ className }) => {
  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0'>
        <h3 className='card-title fw-bolder text-dark'>Công việc cá nhân</h3>
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
          <div className='d-flex align-items-center mb-8'>
            {/* begin::Bullet */}
            <span className='bullet bullet-vertical me-3 h-40px bg-success'></span>
            {/* end::Bullet */}
            {/* begin::Description */}
            <div className='flex-grow-1'>
              <a href='#' className='text-gray-800 text-hover-primary fw-bolder fs-6'>
                4 hồ sơ xử lý quá hạn
              </a>
              <span className='text-muted fw-bold d-block'>Dịch vụ công</span>
            </div>
            {/* end::Description */}
            <span className='badge badge-light-success fs-8 fw-bolder'>New</span>
          </div>
          {/* end:Item */}
          {/* begin::Item */}
          <div className='d-flex align-items-center mb-8'>
            {/* begin::Bullet */}
            <span className='bullet bullet-vertical me-3 h-40px bg-primary'></span>
            {/* end::Bullet */}
            {/* begin::Description */}
            <div className='flex-grow-1'>
              <a href='#' className='text-gray-800 text-hover-primary fw-bolder fs-6'>
                2 tin bài chưa duyệt
              </a>
              <span className='text-muted fw-bold d-block'>Cổng thông tin</span>
            </div>
            {/* end::Description */}
            <span className='badge badge-light-primary fs-8 fw-bolder'>New</span>
          </div>
          {/* end:Item */}
          {/* begin::Item */}
          <div className='d-flex align-items-center mb-8'>
            {/* begin::Bullet */}
            <span className='bullet bullet-vertical me-3 h-40px bg-warning'></span>
            {/* end::Bullet */}
            {/* begin::Description */}
            <div className='flex-grow-1'>
              <a href='#' className='text-gray-800 text-hover-primary fw-bolder fs-6'>
                10 phản ánh chưa trả lời
              </a>
              <span className='text-muted fw-bold d-block'>Phản ánh hiện trường</span>
            </div>
            {/* end::Description */}
            <span className='badge badge-light-warning fs-8 fw-bolder'>New</span>
          </div>
          {/* end:Item */}
          {/* begin::Item */}
          <div className='d-flex align-items-center mb-8'>
            {/* begin::Bullet */}
            <span className='bullet bullet-vertical me-3 h-40px bg-primary'></span>
            {/* end::Bullet */}
            {/* begin::Description */}
            <div className='flex-grow-1'>
              <a href='#' className='text-gray-800 text-hover-primary fw-bolder fs-6'>
                3 phản ánh quá hạn xử lý
              </a>
              <span className='text-muted fw-bold d-block'>Phản ánh hiện trường</span>
            </div>
            {/* end::Description */}
            <span className='badge badge-light-primary fs-8 fw-bolder'>New</span>
          </div>
          {/* end:Item */}
          {/* begin::Item */}
          <div className='d-flex align-items-center mb-8'>
            {/* begin::Bullet */}
            <span className='bullet bullet-vertical me-3 h-40px bg-danger'></span>
            {/* end::Bullet */}
            {/* begin::Description */}
            <div className='flex-grow-1'>
              <a href='#' className='text-gray-800 text-hover-primary fw-bolder fs-6'>
                2 nhiệm vụ đang xử lý
              </a>
              <span className='text-muted fw-bold d-block'>Chỉ đạo điều hanh</span>
            </div>
            {/* end::Description */}
            <span className='badge badge-light-danger fs-8 fw-bolder'>New</span>
          </div>
          {/* end:Item */}
          {/* begin::Item */}
          <div className='d-flex align-items-center'>
            {/* begin::Bullet */}
            <span className='bullet bullet-vertical me-3 h-40px bg-success'></span>
            {/* end::Bullet */}
            {/* begin::Description */}
            <div className='flex-grow-1'>
              <a href='#' className='text-gray-800 text-hover-primary fw-bolder fs-6'>
                3 cán bộ đến hạn nâng lương
              </a>
              <span className='text-muted fw-bold d-block'>Quản lý cán bộ</span>
            </div>
            {/* end::Description */}
            <span className='badge badge-light-success fs-8 fw-bolder'>New</span>
          </div>
          {/* end:Item */}
        </marquee>
      </div>
      {/* end::Body */}
    </div>
  )
}

export { ListsWidget3 }
