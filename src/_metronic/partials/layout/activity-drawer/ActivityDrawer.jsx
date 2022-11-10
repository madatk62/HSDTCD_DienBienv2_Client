import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { KTSVG } from '../../../helpers'
import { useLayout } from '../../../layout/core'
import { Switch, Radio } from 'antd'

const ActivityDrawer = () => {
  const { config, setLayout } = useLayout()
  return (
    <div
      id='kt_activities'
      className='bg-white'
      data-kt-drawer='true'
      data-kt-drawer-name='activities'
      data-kt-drawer-activate='true'
      data-kt-drawer-overlay='true'
      data-kt-drawer-width="{default:'300px', 'lg': '400px'}"
      data-kt-drawer-direction='end'
      data-kt-drawer-toggle='#kt_activities_toggle'
      data-kt-drawer-close='#kt_activities_close'
    >
      <div className='card shadow-none rounded-0 flex-grow-1'>
        <div className='card-header px-4' id='kt_activities_header'>
          <h3 className='card-title fw-bolder text-dark'>Cấu hình giao diện</h3>

          <div className='card-toolbar'>
            <button
              type='button'
              className='btn btn-sm btn-icon btn-active-light-primary me-n5'
              id='kt_activities_close'
            >
              <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
            </button>
          </div>
        </div>
        <div className='card-body px-0 position-relative' id='kt_activities_body'>
          <div className='px-4'>
            <div className='py-2'>
              <div className='d-flex align-items-center justify-content-between'>
                <label className='form-label text-gray-600 fw-bold fs-6'>Thu gọn Menu</label>
                <Switch defaultChecked={config.aside.minimized} onChange={(checked) => {
                  let _config = config
                  _config.aside.minimized = checked
                  setLayout(_config)
                }} />
              </div>
            </div>

            <div className='py-2'>
              <div className='d-flex align-items-center justify-content-between'>
                <label className='form-label text-gray-600 fw-bold fs-6'>Giao diện Menu</label>
                <Radio.Group
                  optionType='button'
                  buttonStyle="solid"
                  options={[
                    { label: 'Sáng', value: 'light' },
                    { label: 'Tối', value: 'dark' }
                  ]}
                  onChange={(e) => {
                    let _config = config
                    _config.aside.theme = e.target.value
                    setLayout(_config)
                  }}
                  value={config.aside.theme}>
                </Radio.Group>
              </div>
            </div>

            <div className='py-2'>
              <div className='d-flex align-items-center justify-content-between'>
                <label className='form-label text-gray-600 fw-bold fs-6'>Ẩn Menu</label>
                <Switch defaultChecked={!config.aside.display} onChange={(checked) => {
                  let _config = config
                  _config.aside.display = !checked
                  setLayout(_config)
                }} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export { ActivityDrawer }
