/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import axios from 'axios'

import {toast} from "react-toastify";
import * as auth from '../redux/AuthRedux'
import {register} from '../redux/AuthCRUD'

const URL_GET_TECHID = `https://api.dienbien.gov.vn/KetNoiMotCuaQuocGia/TraCuuTechID?mstorcmnd=`;
const BEARER_TOKEN = `70957605-a469-31ff-ae92-a2b1cee5a264`;
const initialValues = {
  fullname: '',
  cccd:'',
  firstname: '',
  lastname: '',
  username: '',
  password: '',
  changepassword: ''
}

const registrationSchema = Yup.object().shape({
  fullname: Yup.string()
    .trim()
    .required("Yêu cầu nhập đầy đủ thông tin họ tên"),
  cccd: Yup.number()
  .required("Yêu cầu nhập đầy đủ thông tin CCCD/CMND"),
  // firstname: Yup.string()
  //   .min(3, 'Minimum 3 symbols')
  //   .max(50, 'Maximum 50 symbols')
  //   .trim()
  //   .required('First name is required'),
  username: Yup.string()
    .min(6, 'Minimum 6 symbols')
    .max(200, 'Maximum 200 symbols')
    .trim()
    .required('Tài khoản là bắt buộc'),

  // lastname: Yup.string()
  //   .min(3, 'Minimum 3 symbols')
  //   .max(50, 'Maximum 50 symbols')
  //   .trim()
  //   .required('Last name is required'),
  password: Yup.string()
    .min(6, 'Mật khẩu chứa ít nhất 6 ký tự')
    .max(50, 'Mật khẩu chứa nhiều nhất 50 ký tự')
    .trim()
    .required('Mật khẩu là bắt buộc'),
  changepassword: Yup.string()
    .required('Xác nhận mật khẩu là bắt buộc')
    .when('password', {
      is: (val: string) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf([Yup.ref('password')], "Xác nhận mật khẩu không trùng khớp"),
    }),
  // acceptTerms: Yup.bool().required('You must accept the terms and conditions'),
})

export function Registration() {
  const history = useHistory();
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues,
    validationSchema: registrationSchema,
    onSubmit: (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      setTimeout(() => {
        // check technicalID
       
        axios({
          method: 'get',
          url: `${URL_GET_TECHID}${values.cccd}`,
          headers: { 
            'Authorization': `Bearer ${BEARER_TOKEN}`
          }
        }).then(res=>{
          if(res.status==200){
            if(res.data.result.length >0){
              var registerBody = {
                userName: values.username,
                password: values.password,
                confirmPassword: values.changepassword,
                fullName: values.fullname,
                identityNumber: values.cccd,
                technicalId : res.data.result[0]?.TECHNICALID
              }
              register(registerBody)
              .then(token => {
                toast.success("Đăng ký tài khoản thành công");
                setLoading(true);
                history.push('auth/Login')
                // var accessToken = resToken.acesstoken;
                // dispatch(auth.actions.login(accessToken))
              })
              .catch((err) => {
                setLoading(false)
                setSubmitting(false)
                setStatus('Đăng ký tài khoản thất bại');
                toast.warning("Đăng ký tài khoản thất bại");
                if(err?.statusCode == 500) {
                  // toast.warning(err.exception);
                  formik.setErrors({
                    cccd: err.exception,
                  })
                }else{
                  if(err?.status == 400){
                    formik.setErrors({
                      username: err.errors?.UserName[0],
                    })
                    console.log(formik.errors.username);
                    
                  }
                }
                // history.push("/auth/login");
              })
            }else{
              setLoading(false)
              setSubmitting(false)
              setStatus('CCCD/CMND không có hồ sơ')
            }
          }else{
            setLoading(false)
            setSubmitting(false)
            setStatus('CCCD/CMND không có hồ sơ')
          }
          
        })
        //
       
      }, 1000)
    },
  })

  return (
    <form
      className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
      noValidate
      id='kt_login_signup_form'
      onSubmit={formik.handleSubmit}
    >
      {/* begin::Heading */}
      <div className='mb-10 text-center'>
        {/* begin::Title */}
        <h1 className='text-dark mb-3'>Tạo mới tài khoản</h1>
        {/* end::Title */}

        {/* begin::Link */}
        <div className='text-gray-400 fw-bold fs-4'>
         Đã có tài khoản?
          <Link to='/auth/login' className='link-primary fw-bolder text-400 fw-bold fs-4' style={{marginLeft: '5px'}}>
            Quên mật khẩu ?
          </Link>
        </div>
        {/* end::Link */}
      </div>
      {/* end::Heading */}

      {/* begin::Action */}
      {/* end::Action */}

      {formik.status && (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      )}

      {/* begin::Form group Firstname */}
      <div className='row fv-row mb-7'>
        <label className='form-label fw-bolder text-dark fs-6 required'>Họ và tên</label>
        <input 
          placeholder='Họ và tên'
          type='text'
          autoComplete = 'off'
          {...formik.getFieldProps('fullname')}
          className={clsx('form-control form-control-lg form-control-solid', 
            {'is-invalid': formik.touched.fullname && formik.errors.fullname},
            {
              'is-valid': formik.touched.fullname && !formik.errors.fullname,
            } )}

        />
        {
          (formik.touched.fullname && formik.errors.fullname) &&
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert' className='text-danger'>{formik.errors.fullname}</span>
            </div>
          </div>
        }
      </div>
      <div className='row fv-row mb-7'>
        <label className='form-label fw-bolder text-dark fs-6 required'>CCCD/CMND</label>
        <input
          placeholder='CCCD/CMND'
          autoComplete='off'
          {...formik.getFieldProps('cccd')}
          className = {clsx("form-control form-control-lg form-control-solid" ,
            {"is-invalid": formik.touched.cccd && formik.errors.cccd},
            {"is-valid": formik.touched.cccd && !formik.errors.cccd}
            )}
        />
        {(formik.touched.cccd && formik.errors.cccd)&&
        <div className='fv-plugins-message-container' >
          <div className='fv-help-block'>
            <span role='alert' className="text-danger">{formik.errors.cccd}</span>
          </div>
        </div>}
      </div>
      {/* end::Form group */}

      {/* begin::Form group Email */}
      <div className='fv-row mb-7'>
        <label className='form-label fw-bolder text-dark fs-6'>Tài khoản</label>
        <input
          placeholder='Tài khoản'
          type='text'
          autoComplete='off'
          {...formik.getFieldProps('username')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {'is-invalid': formik.touched.username && formik.errors.username},
            {
              'is-valid': formik.touched.username && !formik.errors.username,
            }
          )}
        />
        {formik.touched.username && formik.errors.username && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert' className='text-danger'>{formik.errors.username}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group Password */}
      <div className='mb-10 fv-row' data-kt-password-meter='true'>
        <div className='mb-1'>
          <label className='form-label fw-bolder text-dark fs-6'>Mật khẩu</label>
          <div className='position-relative mb-3'>
            <input
              type='password'
              placeholder='Mật khẩu'
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
                  <span role='alert' className='text-danger'>{formik.errors.password}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* end::Form group */}

      {/* begin::Form group Confirm password */}
      <div className='fv-row mb-5'>
        <label className='form-label fw-bolder text-dark fs-6'>Xác nhận mật khẩu</label>
        <input
          type='password'
          placeholder='Xác nhận mật khẩu'
          autoComplete='off'
          {...formik.getFieldProps('changepassword')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {
              'is-invalid': formik.touched.changepassword && formik.errors.changepassword,
            },
            {
              'is-valid': formik.touched.changepassword && !formik.errors.changepassword,
            }
          )}
        />
        {formik.touched.changepassword && formik.errors.changepassword && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert' className='text-danger'>{formik.errors.changepassword}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}
      <div className='text-center'>
        <button
          type='submit'
          id='kt_sign_up_submit'
          className='btn btn-lg btn-primary w-100 mb-5'
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className='indicator-label'>Đăng ký</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Đang đăng ký...{' '}
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
        <Link to='/auth/login'>
          <button
            type='button'
            id='kt_login_signup_form_cancel_button'
            className='btn btn-lg btn-light-primary w-100 mb-5'
          >
            Huỷ
          </button>
        </Link>
      </div>
      {/* end::Form group */}
    </form>
  )
}
