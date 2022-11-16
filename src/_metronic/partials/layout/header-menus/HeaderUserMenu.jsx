/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {shallowEqual, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {RootState} from '../../../../setup'
import {Languages} from './Languages'
import {useDispatch} from 'react-redux'
import {CONFIG} from '../../../../helpers/config'
import {Logout} from '../../../../app/modules/auth'
const HeaderUserMenu = () => {
  const dispatch = useDispatch()

  const logout = () => {
    sessionStorage.clear()
    localStorage.clear()
    window.location.reload()
  }

  const removeData = () => {
    sessionStorage.clear()
    localStorage.clear()
    window.location.reload()
  }

  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px'
      data-kt-menu='true'
    >
      {/* <div className='menu-item px-3'>
        <div className='menu-content d-flex align-items-center px-3'>
          <div className='symbol symbol-50px me-5'>
            <img alt='Logo' src={''} />
          </div>

          <div className='d-flex flex-column'>
            <div className='fw-bolder d-flex align-items-center fs-5'>
              Demo1
              <span className='badge badge-light-success fw-bolder fs-8 px-2 py-1 ms-2'>Pro</span>
            </div>
            <a href='#' className='fw-bold text-muted text-hover-primary fs-7'>
              
            </a>
          </div>
        </div>
      </div>

      <div className='separator my-2'></div> */}

      {/* <div className='menu-item px-5'>
        <Link to={'/profile'} className='menu-link px-5'>
          Thông tin cá nhân
        </Link>
      </div>

      <div className='menu-item px-5'>
        <a
          onClick={() => {
            window.open(`${CONFIG.BASE_URL}`, '_blank')
          }}
          className='menu-link px-5'
        >
          Đổi mật khẩu
        </a>
      </div>

      <div className='separator my-2'></div>

      <div className='menu-item px-5 my-1'>
        <a onClick={removeData} className='menu-link px-5'>
          Làm mới thông tin người dùng
        </a>
      </div> */}

      {/* <div className='menu-item px-5 my-1'>
        <Link to='/crafted/account/settings' className='menu-link px-5'>
          Hỏi đáp
        </Link>
      </div> */}

      <div className='menu-item px-5'>
        <a onClick={logout} className='menu-link px-5'>
          Đăng xuất
        </a>
      </div>
    </div>
  )
}

export {HeaderUserMenu}
