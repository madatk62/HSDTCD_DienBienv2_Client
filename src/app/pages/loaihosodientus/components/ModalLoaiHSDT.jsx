import React, {useState, useEffect} from 'react'
import {Modal, Button} from 'react-bootstrap-v5'
import {useFormik} from 'formik'
import * as yup from 'yup'
import clsx from 'clsx'
import {shallowEqual, useSelector} from 'react-redux'

import {
  requestPOSTASP_URL,
  requestPOST_URL,
  requestPUT_URL,
} from '../../../../../src/helpers/baseAPI'
import {Upload} from 'antd'
import {toast} from 'react-toastify'
import {CONFIG} from '../../../../helpers/config'

const GiayToSchema = yup.object().shape({
  Ma: yup.string().trim().required('Mã loại hồ sơ là bắt buộc'),
  Ten: yup.string().trim().required('Tên loại hồ sơ là bắt buộc'),
})
const ModaTypelFileCategoryItem = (props) => {
  const userInfor = useSelector((auth) => auth.global.userInfo, shallowEqual)
  var initValue = {
    Ma: props?.data?.ma ? props?.data?.ma : '',
    Ten: props?.data?.ten ? props?.data?.ten : '',
  }
  const [isLoading, setIsLoading] = useState(false)
  const [fileUpload, setFileUpload] = useState([])
  const [isDisableInput, setIsDisableInput] = useState(false)
  const [searchData, setSearchData] = useState({
    iDCongDan: userInfor.technicalId ? userInfor.technicalId : '',
  })
  const handleSubmitForm = () => {
    var a = formik.handleSubmit()
  }
  const handleClose = () => props.setModalVisible(false)
  const handleShow = () => props.setModalVisible(true)
  const formik = useFormik({
    initialValues: initValue,
    validationSchema: GiayToSchema,
    onSubmit: (values, {setStatus, setSubmitting}) => {
      setSubmitting(true)
      setIsLoading(true)
      if (props.action == 'edit') {
        var postData = {
          iDCongDan: userInfor.technicalId ? userInfor.technicalId : null,
          id: props?.data?.id,
          ma: formik.values.Ma,
          ten: formik.values.Ten,
        }
        var url = ` ${CONFIG.BASE_DBHSDT_URL}/loaihosodientus/${props?.data?.id}`
        requestPUT_URL(url, postData).then((res) => {
          toast.success('Cập nhật thành công')
          setIsLoading(false)
          setSubmitting(false)
          props.setModalVisible(false)

          props.reRenderTable(searchData)
        })
      } else if (props.action == 'add') {
        var postData = {
          iDCongDan: userInfor.technicalId ? userInfor.technicalId : null,
          ma: formik.values.Ma,
          ten: formik.values.Ten,
        }
        var url = ` ${CONFIG.BASE_DBHSDT_URL}/loaihosodientus`
        requestPOSTASP_URL(url, postData).then((res) => {
          toast.success('Cập nhật thành công')
          setIsLoading(false)
          setSubmitting(false)
          props.setModalVisible(false)
          props.reRenderTable(searchData)
        })
      }

      // setTimeout(()=>{

      //     setIsLoading(false);
      //     setSubmitting(false);
      // },1000)
    },
    onReset: (values, {setStatus, setSubmitting, setValues}) => {
      setValues(props.data)
    },
  })
  // init file Upload
  useEffect(() => {
    if (props.action == 'view') {
      setIsDisableInput(true)
    }
    formik.setValues({
      ...formik.values,
      Ma: props?.data?.ma ? props?.data?.ma : '',
      Ten: props?.data?.ten ? props?.data?.ten : '',
    })
  }, [])
  return (
    <form
      className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
      noValidate
      id='file_category_detail_form'
      onSubmit={formik.handleSubmit}
    >
      <Modal
        fullscreen={'lg-down'}
        size='xl'
        onExited={handleClose}
        keyboard={true}
        scrollable={true}
        onEscapeKeyDown={handleClose}
        show={props.modalVisible}
        backdrop='static'
      >
        <Modal.Header className='bg-primary px-4 py-3'>
          <Modal.Title className='text-white'>
            {props.action == 'view' ? 'Chi tiết' : props.action == 'add' ? 'Thêm mới' : 'Chỉnh sửa'}
          </Modal.Title>
          <button
            type='button'
            className='btn-close btn-close-white'
            aria-label='Close'
            onClick={handleClose}
          ></button>
        </Modal.Header>
        <Modal.Body>
          <div className='row fv-row mb-7'>
            <div className='col-xl-12 col-lg-12 col-md-12'>
              <label className='form-label fw-bolder text-dark fs-6 required'>Mã loại hồ sơ</label>
              <input
                placeholder='Mã loại hồ sơ'
                type='text'
                autoComplete='off'
                disabled={isDisableInput}
                {...formik.getFieldProps('Ma')}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {'is-invalid': formik.touched.Ma && formik.errors.Ma},
                  {
                    'is-valid': formik.touched.Ma && !formik.errors.Ma,
                  }
                )}
              />
              {formik.touched.Ma && formik.errors.Ma && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert' className='text-danger'>
                      {formik.errors.Ma}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className='row fv-row mb-7'>
            <div className='col-xl-12 col-lg-12 col-md-12'>
              <label className='form-label fw-bolder text-dark fs-6 required'>Tên loại hồ sơ</label>
              <textarea
                placeholder='Tên loại hồ sơ'
                rows={3}
                disabled={isDisableInput}
                autoComplete='off'
                {...formik.getFieldProps('Ten')}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {'is-invalid': formik.touched.Ten && formik.errors.Ten},
                  {
                    'is-valid': formik.touched.Ten && !formik.errors.Ten,
                  }
                )}
              />
              {formik.touched.Ten && formik.errors.Ten && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert' className='text-danger'>
                      {formik.errors.Ten}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className='bg-light px-4 py-2 align-items-center'>
          <div className='d-flex justify-content-center  align-items-center'>
            <Button
              className='btn-sm btn-primary rounded-1 p-2  ms-2'
              onClick={handleSubmitForm}
              type='submit'
              disabled={formik.isSubmitting || !formik.isValid}
              hidden={props.action == 'view' ? true : false}
            >
              {!isLoading ? (
                <span>
                  <i className='fa fa-save'></i>
                  {props.action == 'add' ? 'Tạo mới' : 'Cập nhật'}
                </span>
              ) : (
                <span className='indicator-progress' style={{display: 'block'}}>
                  {props.action == 'add' ? 'Đang tạo mới... ' : 'Đang cập nhật...'}{' '}
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </Button>
          </div>
          <div className='d-flex justify-content-center  align-items-center'>
            <Button className='btn-sm btn-secondary rounded-1 p-2  ms-2' onClick={handleClose}>
              <i className='fa fa-times'></i>Đóng
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </form>
  )
}
export default ModaTypelFileCategoryItem
