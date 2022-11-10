/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useFormik} from 'formik'
import {toast} from 'react-toastify'

import * as auth from '../redux/AuthRedux'
import * as actions from '../../../../setup/redux/global/Actions'
import {login,getUserByUserName} from '../redux/AuthCRUD'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import {TDImages} from '../../../assets/index'

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .min(6, 'Tài khoản chứa ít nhất 6 ký tự')
    .max(200, 'Tài khoản chứa nhiều nhất 200 ký tự')
    .required('Tài khoản là bắt buộc'),
  password: Yup.string()
    .min(6, 'Mật khẩu chứa ít nhất 6 ký tự')
    .max(50, 'Mật khẩu chứa nhiều nhất 50 ký tự')
    .required('Mật khẩu là bắt buộc'),
})

const initialValues = {
  email: '',
  password: '',
}

/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

export function Login() {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      setTimeout(() => {
        login(values.email, values.password)
          .then(async (res) => {
            if (res) {
              var token = res.token
              var user = await getUserByUserName(values.email)

              dispatch(actions.getUserInfo(user))
              setLoading(false)
              dispatch(auth.actions.login(res.token))
            }
          })
          .catch((err) => {
            setLoading(false)
            setSubmitting(false)
            setStatus('Tài khoản/mật khẩu không chính xác')
            toast.error('Tài khoản/mật khẩu không chính xác')
          })
      }, 1000)
    },
  })

  return (
    <form
      className='form w-100'
      onSubmit={formik.handleSubmit}
      noValidate
      id='kt_login_signin_form'
    >
      {/* begin::Heading */}
      <div className='text-center mb-10'>
        <h1 className='text-dark mb-3'>Đăng nhập hệ thống</h1>
        <div className='text-gray-400 fw-bold fs-4'>
          <span className='ml-1'>Bạn chưa có tài khoản? </span>
          <Link
            to='/auth/registration'
            className='link-primary fw-bolder mr-1 text-400 fw-bold fs-4'
          >
            Tài khoản mới
          </Link>
        </div>
      </div>
      {/* begin::Heading */}

      {formik.status ? (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      ) : (
        ''
      )}

      {/* begin::Form group */}
      <div className='fv-row mb-10'>
        <label className='form-label fs-6 fw-bolder text-dark'>Tài khoản</label>
        <input
          placeholder='Tài khoản'
          {...formik.getFieldProps('email')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {'is-invalid': formik.touched.email && formik.errors.email},
            {
              'is-valid': formik.touched.email && !formik.errors.email,
            }
          )}
          type='email'
          name='email'
          autoComplete='off'
        />
        {formik.touched.email && formik.errors.email && (
          <div className='fv-plugins-message-container'>
            <span role='alert' style={{color: 'red'}}>
              {formik.errors.email}
            </span>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='fv-row mb-10'>
        <div className='d-flex justify-content-between mt-n5'>
          <div className='d-flex flex-stack mb-2'>
            {/* begin::Label */}
            <label className='form-label fw-bolder text-dark fs-6 mb-0'>Mật khẩu</label>
            {/* end::Label */}
            {/* begin::Link */}

            {/* end::Link */}
          </div>
        </div>
        <input
          placeholder='Mật khẩu'
          type='password'
          autoComplete='off'
          {...formik.getFieldProps('password')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {
              'is-invalid': formik.touched.password && formik.errors.password,
            },
            {
              'is-valid': formik.touched.password && !formik.errors.password,
            }
          )}
        />
        {formik.touched.password && formik.errors.password && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert' style={{color: 'red'}}>
                {formik.errors.password}
              </span>
            </div>
          </div>
        )}
        <div className='d-flex flex-row-reverse'>
          <div className='fv-help-block ag'>
            <Link
              to='/auth/forgot-password'
              className='link-primary fs-6 fw-bolder'
              style={{marginLeft: '5px'}}
            >
              Quên mật khẩu ?
            </Link>
          </div>
        </div>
      </div>
      {/* end::Form group */}

      {/* begin::Action */}
      <div className='text-center'>
        <button
          type='submit'
          id='kt_sign_in_submit'
          className='btn btn-lg btn-primary w-100 mb-5'
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className='indicator-label'>Đăng nhập</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Đang đăng nhập...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>

        {/* begin::Separator */}
        {/* end::Separator */}
      </div>
      {/* end::Action */}
    </form>
  )
}
