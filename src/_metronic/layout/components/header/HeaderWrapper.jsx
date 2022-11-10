/* eslint-disable react-hooks/exhaustive-deps */
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { MenuComponent } from '../../../assets/ts/components'
import { KTSVG, toAbsoluteUrl } from '../../../helpers'
import { useLayout } from '../../core'
import { Header } from './Header'
import { DefaultTitle } from './page-title/DefaultTitle'
import { Topbar } from './Topbar'
import moment from 'moment';

export function HeaderWrapper() {
  const { pathname } = useLocation()
  const { config, classes, attributes } = useLayout()
  const { header, aside } = config

  const [time, setTime] = useState(moment().format("HH:mm:ss"));
  const [date, setDate] = useState(`${moment().format("dddd")}, ngày ${moment().format('LL')}`);

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [pathname])

  useEffect(() => {
    let secTimer = setInterval(() => {
      setTime(moment().format("HH:mm:ss"))
    }, 1000)

    return () => clearInterval(secTimer);
  }, []);

  return (
    <div
      id='kt_header'
      className={clsx('header', classes.header.join(' '), 'align-items-stretch')}
      {...attributes.headerMenu}
    >
      <div
        className={clsx(
          classes.headerContainer.join(' '),
          'd-flex align-items-stretch justify-content-between'
        )}
      >
        {/* begin::Aside mobile toggle */}
        {aside.display && (
          <div className='d-flex align-items-center d-lg-none ms-n3 me-1' title='Show aside menu'>
            <div
              className='btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px'
              id='kt_aside_mobile_toggle'
            >
              <KTSVG path='/media/icons/duotune/abstract/abs015.svg' className='svg-icon-2x mt-1' />
            </div>
          </div>
        )}
        {/* end::Aside mobile toggle */}
        {/* begin::Logo */}
        {/* <div className='d-flex align-items-center flex-grow-1 flex-lg-grow-0'>
          <Link to='/dashboard'>
            <img alt='Logo' src={toAbsoluteUrl('/media/logos/quochuy.png')} className='h-40px' />
          </Link>
        </div> */}
        {/* end::Logo */}

        {/* begin::Wrapper */}
        <div className='d-flex align-items-stretch justify-content-between flex-lg-grow-1'>
          {/* begin::Navbar */}
          {header.left === 'menu' && (
            <div className='d-flex align-items-stretch' id='kt_header_nav'>
              <Header />
            </div>
          )}

          {header.left === 'page-title' && (
            <div className='d-none d-sm-flex d-md-flex align-items-center flex-shrink-0' id='kt_header_nav'>
              {/* <DefaultTitle /> */}
              <div className='d-flex align-items-center'>
                <span className='fs-xxl-2x text-primary me-4 box-thoigian-left'>{time}</span>
                <div>
                  <div className="box-nhietdo">
                    <div className="d-flex align-items-center">
                      <div className="d-flex align-items-center me-4">
                        <img src={toAbsoluteUrl('/media/logos/weather.svg')} alt="icon-weather" />
                        <span className="ms-2 fw-bold mt-1">34°C</span>
                      </div>
                      <div className="d-flex align-items-center mt-1">
                        <span className="fw-bold">AQI:</span>&nbsp; <span className="text-success fw-bold"> 23 (Tốt)</span>
                      </div>
                    </div>
                  </div>
                  <span className='fs-6 text-gray-800'>{date}</span>
                </div>
              </div>
            </div>
          )}
          {/* <div className='me-5 d-flex align-items-center'>
            <marquee id="MARQUEE" direction="left" scrollamount="5">
              <span className="fw-bolder fs-6 text-white">
                Các đơn vị trong Khối cần tập trung đăng ký chỉ tiêu thi đua để nỗ lực phấn đấu hoàn thành ngay từ đầu năm. Tập trung tuyên truyền sâu rộng những nội dung của phong trào thi đua, khen thưởng của Khối tới toàn thể cán bộ, công chức, viên chức trong đơn vị. Chú trọng quan tâm tổ chức các phong trào thi đua một cách thực chất, hấp dẫn, tạo chuyển biến tích cực trong thực hiện nhiệm vụ chính trị được giao, đồng thời triển khai thực hiện tốt công tác phòng, chống dịch COVID-19 để góp phần thực hiện thắng lợi các chỉ tiêu phát triển kinh tế - xã hội của tỉnh năm 2022.
              </span>
            </marquee>
          </div> */}
          <div className='d-flex align-items-stretch flex-shrink-0'>
            <Topbar />
          </div>
        </div>
        {/* end::Wrapper */}
      </div>
    </div>
  )
}
