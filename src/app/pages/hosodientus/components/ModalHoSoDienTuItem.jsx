import React, {useState, useEffect} from 'react'
import {Modal, Button} from 'react-bootstrap-v5'
import {useFormik, Field} from 'formik'
import * as yup from 'yup'
import clsx from 'clsx'
import {Select} from 'antd'

import {requestPOST_URL, requestPUT_URL} from '../../../../helpers/baseAPI'
import {toast} from 'react-toastify'
// const base_url = "https://danhmuc.hanhchinhcong.net/_layouts/15/TD.CSDLChung.WCF/CSDLChungService.svc";

import {CONFIG} from '../../../../helpers/config'
import axios from 'axios'

const {Option} = Select
var initValue = {
  maHoSo: '',
  tenHoSo: '',
  tenThuTuc: '',
  maThuTuc: '',
}
const GiayToSchema = yup.object().shape({
  maHoSo: yup.string().trim().required('Mã hồ sơ là bắt buộc'),
  tenHoSo: yup.string().trim().required('Tên hồ sơ là bắt buộc'),
})
const ModalHoSoDienTuItem = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isDisableInput, setIsDisableInput] = useState(false)
  const [dsThuTuc, setDsThuTuc] = useState([])
  const handleSelectThuTuc = (val) => {
    formik.values.maThuTuc = val.value
    formik.values.tenThuTuc = val.children
  }
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
      var postData = {
        id: props.data.id,
        maHoSo: formik.values.maHoSo,
        tenHoSo: formik.values.tenHoSo,
        maThuTuc: formik.values.maThuTuc,
        tenThuTuc: formik.values.tenThuTuc,
      }
      var url = ` ${CONFIG.BASE_DBHSDT_URL}/hosodientus/${props.data.id}`
      requestPUT_URL(url, postData).then((res) => {
        toast.success('Cập nhật thành công')
        setIsLoading(false)
        setSubmitting(false)
        props.setModalVisible(false)
        props.reRenderTable()
      })
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
  const LoadSellectForm = async () => {
    //form thu tuc
    var urlgetThuTuc = `${CONFIG.URL_MotCuaDienBien}/LayDanhSachTTHC`
    const resThuTuc = await axios({
      method: 'Get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${CONFIG.Bearer_Token_MotCuaDienBien}`,
        //   Authorization: `Bearer ${CONFIG.GETWAY_TOKEN}`,
        // "Access-Control-Allow-Origin":"*",
        // 'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
      },
      url: urlgetThuTuc,
    })
    if (resThuTuc.status == 200) {
      var strResult = resThuTuc.data.message
      var resData = JSON.parse(strResult)
      var result = resData.result
      if (result) {
        setDsThuTuc(result)
      }
    }
  }
  useEffect(() => {
    if (props.action == 'view') {
      setIsDisableInput(true)
    }
    formik.setValues(props.data)

    LoadSellectForm()
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
          <Modal.Title className='text-white'>Chi tiết</Modal.Title>
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
              <label className='form-label fw-bolder text-dark fs-6 required'>Mã hồ sơ</label>
              <input
                placeholder='Mã giấy tờ'
                type='text'
                autoComplete='off'
                disabled={isDisableInput}
                {...formik.getFieldProps('maHoSo')}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {'is-invalid': formik.touched.maHoSo && formik.errors.maHoSo},
                  {
                    'is-valid': formik.touched.maHoSo && !formik.errors.maHoSo,
                  }
                )}
              />
              {formik.touched.maHoSo && formik.errors.maHoSo && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert' className='text-danger'>
                      {formik.errors.maHoSo}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className='row fv-row mb-7'>
            <div className='col-xl-12 col-lg-12 col-md-12'>
              <label className='form-label fw-bolder text-dark fs-6 required'>Tên hồ sơ</label>
              <textarea
                placeholder='Tên giấy tờ'
                rows={3}
                disabled={isDisableInput}
                autoComplete='off'
                {...formik.getFieldProps('tenHoSo')}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {'is-invalid': formik.touched.tenHoSo && formik.errors.tenHoSo},
                  {
                    'is-valid': formik.touched.tenHoSo && !formik.errors.tenHoSo,
                  }
                )}
              />
              {formik.touched.tenHoSo && formik.errors.tenHoSo && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert' className='text-danger'>
                      {formik.errors.tenHoSo}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className='row fv-row mb-7'>
            <div className='col-xl-12 col-lg-12 col-md-12'>
              <label className='form-label fw-bolder text-dark fs-6 required'>
                Thủ tục hành chính
              </label>
              <Select
                // defaultValue='2.000379.000.00.00.H18'
                defaultValue={props.data.maThuTuc}
                className='col-xl-12 col-lg-12 col-md-12'
                allowClear
                showSearch
                disabled={isDisableInput}
                placeholder='Thủ tục hành chính'
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                onChange={(val, text) => {
                  handleSelectThuTuc(text)
                }}
              >
                {dsThuTuc.map((item) => {
                  if (item.MATTHC == formik.values.maThuTuc && formik.values.maThuTuc) {
                    return (
                      <Option key={item.MATTHC} value={item.MATTHC} selected>
                        {item.TENTTHC}
                      </Option>
                    )
                  }
                  return (
                    <Option key={item.MATTHC} value={item.MATTHC}>
                      {item.TENTTHC}
                    </Option>
                  )
                })}
              </Select>
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
export default ModalHoSoDienTuItem
