import React, {useState, useEffect} from 'react'
import {Modal, Button} from 'react-bootstrap-v5'
import {Formik, useFormik} from 'formik'
import * as yup from 'yup'
import clsx from 'clsx'
import {Upload, Select} from 'antd'
import {toast} from 'react-toastify'

import {urlStringToFileList, getUrlDinhKem} from '../../common/Common'
import {CONFIG} from '../../../../helpers/config'
import {
  request_UploadFile,
  requestPOST_URL,
  requestPOST_DanhMuc,
  requestPOSTASP_URL,
} from '../../../../../src/helpers/baseAPI'
import {getBase64} from '../../../../../src/helpers/utils'
const {Option} = Select
const {Dragger} = Upload
const maxUploadSize = 3000000
var initValue = {
  MaGiayTo: '',
  TenGiayTo: '',
  UrlFile: '',
  LoaiGiayToID: '',
  NhomGiayToCongDanID: '',
  LoaiGiayToCongDanID: '',
  SoGiayTo: null,
  NguonGui: 'DinhKem',
}
const GiayToSchema = yup.object().shape({
  MaGiayTo: yup.string().trim().required('Mã giấy tờ là bắt buộc'),
  TenGiayTo: yup.string().trim().required('Tên giấy tờ là bắt buộc'),
  // UrlFile: yup.string(),
  SoGiayTo: yup.number().typeError('Số giấy tờ không hợp lệ'),
  // LoaiGiayToID: yup.string(),
  // NhomGiayToCongDanID: yup.string(),
  // LoaiGiayToCongDanID: yup.string(),
  // NguonGui: yup.string(),
})
const ModalFileCategoryItem = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [fileUpload, setFileUpload] = useState([])

  // init formdata
  const [dsNhomHGiayTo, setDsNhomHGiayTo] = useState([])
  const [dsLoaiHGiayTo, setDsLoaiHGiayTo] = useState([])
  // LoadFormData
  const LoadFormDaTa = async () => {
    // load ds nhom giay to
    var urlDsNhomHGiayTo = `${CONFIG.BASE_HSDT_URL}/DanhSachNhomGiayTo`
    var searchBodyNhomHGiayTo = {
      draw: 1,
      columns: [],
      Active: true,
      order: [],
      start: 0,
      length: 100,
      search: {
        value: '',
        regex: false,
      },
    }
    var dataNhomHGiayTo = await requestPOST_DanhMuc(urlDsNhomHGiayTo, searchBodyNhomHGiayTo)
    if (dataNhomHGiayTo.data) {
      setDsNhomHGiayTo(dataNhomHGiayTo.data.data)
    }
    // load ds loai giay to
    var urlDsLoaiHGiayTo = `${CONFIG.BASE_HSDT_URL}/DanhSachLoaiGiayTo`
    var searchBodyLoaiHGiayTo = {
      draw: 1,
      columns: [],
      Active: true,
      order: [],
      start: 0,
      length: 100,
      search: {
        value: '',
        regex: false,
      },
    }
    var dataLoaiHGiayTo = await requestPOST_DanhMuc(urlDsLoaiHGiayTo, searchBodyLoaiHGiayTo)
    if (dataLoaiHGiayTo.data) {
      setDsLoaiHGiayTo(dataLoaiHGiayTo.data.data)
    }
  }

  const handleSubmitForm = async () => {
    var url = await getUrlDinhKem(fileUpload)
    formik.values.UrlFile = url
    var a = formik.handleSubmit()
  }

  // const handleUploadFiles = async () => {
  //   var filesList = [...fileUpload]
  //   var uploadUrl = `${CONFIG.BASE_HSDT_URL}UploadDinhKem`
  //   var arrUrl = []
  //   if (fileUpload.length > 0) {
  //     await Promise.all(
  //       fileUpload.map(async (i, index) => {
  //         let tmp = await getBase64(i)
  //         tmp = tmp.substring(tmp.indexOf('base64,') + 7, tmp.length)
  //         // gọi api xử lý lưu file
  //         var body = {
  //           Base64: tmp,
  //           Name: i.name,
  //           Type: 'GiayTo',
  //         }
  //         var res = await request_UploadFile(uploadUrl, body)
  //         if (res) {
  //           arrUrl.push(res.data.data)
  //         }
  //       })
  //     )

  //     var strUrl = arrUrl.join('##')
  //     formik.values.UrlFile = strUrl
  //   }
  // }
  const handleClose = () => formik.setValues(initValue) + props.setModalVisible(false)
  const handleShow = () => props.setModalVisible(true)
  const formik = useFormik({
    initialValues: initValue,
    validationSchema: GiayToSchema,
    onSubmit: (values, {setStatus, setSubmitting}) => {
      setSubmitting(true)
      setIsLoading(true)
      if (props.action == 'edit') {
        var putData = {
          ID: props.data.ID,
          MaGiayTo: formik.values.MaGiayTo,
          TenGiayTo: formik.values.TenGiayTo,
          UrlFile: formik.values.UrlFile,
          LoaiGiayToCongDanID: formik.values.LoaiGiayToCongDanID,
          NhomGiayToCongDanID: formik.values.NhomGiayToCongDanID,
          SoGiayTo: formik.values.SoGiayTo,
        }
        var url = ` ${CONFIG.BASE_HSDT_URL}/SuaGiayTo`
        requestPOST_URL(url, putData).then((res) => {
          toast.success('Cập nhật thành công')
          setIsLoading(false)
          setSubmitting(false)
          props.setModalVisible(false)
          props.reRenderTable()
        })
      } else if (props.action == 'add') {
        var postData = {
          hoSoDienTuID: '123',
          maGiayTo: formik.values.maGiayTo,
          tenGiayTo: formik.values.tenGiayTo,
          maHoSoDienTu: '',
          dinhKem: 'consectetur',
        }
        console.log('====================================')
        console.log(postData)
        console.log('====================================')
        var url = ` ${CONFIG.BASE_DBHSDT_URL}/giaytohosodientus`
        requestPOSTASP_URL(url, postData)
          .then((res) => {
            // if(res==200){
            //     toast.success("Cập nhật thành công");
            //     props.reRenderTable()
            // }else{
            //     toast.warning("Cập nhật thất bại");

            // }
            setIsLoading(false)
            setSubmitting(false)
            props.setModalVisible(false)
          })
          .catch((err) => {
            toast.warning('Cập nhật thất bại')
            setIsLoading(false)
            setSubmitting(false)
            props.setModalVisible(false)
          })
      }
    },
    onReset: (values, {setStatus, setSubmitting, setValues}) => {
      setValues(props.data)
    },
  })
  // init file Upload
  const fillFormDinhKem = async () => {
    var arrFile = []
    if (props.data.UrlFile) {
      var arrUrls = props.data.UrlFile.split('##')

      arrUrls.map((url, index) => {
        var tmp = urlStringToFileList(url, index)
        arrFile.push(tmp)
      })
      setFileUpload(arrFile)
    }
  }
  const uploads = {
    onRemove: (file) => {
      var index = -1
      fileUpload.map((item, i) => {
        if (file == item) {
          index = i
        }
      })
      var newFilesList = [...fileUpload]
      newFilesList.splice(index, 1)
      setFileUpload(newFilesList)
    },
    beforeUpload: (file) => {
      setFileUpload((tmp) => {
        var totalSize = file.size
        tmp.map((item) => {
          totalSize += item.size
        })
        if (totalSize >= maxUploadSize) {
          toast.warning('Đính kèm vượt quá giới hạn cho phép')
          return [...tmp]
        } else {
          return [...tmp, file]
        }
      })
    },
    name: 'file',
    multiple: true,
    listType: 'picture',
    fileList: fileUpload,
  }
  useEffect(() => {
    LoadFormDaTa()
    formik.setValues(props.data)
    console.log(formik.errors)
    fillFormDinhKem()
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
            <div className='col-xl-6 col-lg-6 col-md-6'>
              <label className='form-label fw-bolder text-dark fs-6 required'>Mã giấy tờ</label>
              <input
                placeholder='Mã giấy tờ'
                type='text'
                autoComplete='off'
                {...formik.getFieldProps('MaGiayTo')}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {'is-invalid': formik.touched.MaGiayTo && formik.errors.MaGiayTo},
                  {
                    'is-valid': formik.touched.MaGiayTo && !formik.errors.MaGiayTo,
                  }
                )}
              />
              {formik.touched.MaGiayTo && formik.errors.MaGiayTo && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert' className='text-danger'>
                      {formik.errors.MaGiayTo}
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div className='col-xl-6 col-lg-6 col-md-6'>
              <label className='form-label fw-bolder text-dark fs-6'>Số giấy tờ</label>
              <input
                placeholder='Số giấy tờ'
                type='text'
                autoComplete='off'
                {...formik.getFieldProps('SoGiayTo')}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {'is-invalid': formik.touched.SoGiayTo && formik.errors.SoGiayTo},
                  {
                    'is-valid': formik.touched.SoGiayTo && !formik.errors.SoGiayTo,
                  }
                )}
              />
              {formik.touched.SoGiayTo && formik.errors.SoGiayTo && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert' className='text-danger'>
                      {formik.errors.SoGiayTo}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className='row fv-row mb-7'>
            <div className='col-xl-6 col-lg-6 col-md-6'>
              <label className='form-label fw-bolder text-dark fs-6'>Loại giấy tờ</label>
              <Select
                // defaultValue='2.000379.000.00.00.H18'
                defaultValue={props.data.LoaiGiayToCongDanID}
                className='col-xl-12 col-lg-12 col-md-12'
                allowClear
                showSearch
                // disabled={isDisableInput}
                placeholder='Loại giấy tờ công dân'
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                onChange={(val, option) => {
                  formik.values.LoaiGiayToCongDanID = val
                }}
              >
                {dsLoaiHGiayTo.map((item) => {
                  // if (item.MATTHC == formik.values.maThuTuc && formik.values.maThuTuc) {
                  //   return (
                  //     <Option key={item.MATTHC} value={item.MATTHC} selected>
                  //       {item.TENTTHC}
                  //     </Option>
                  //   )
                  // }
                  return (
                    <Option key={item.ID} value={item.ID}>
                      {item.Ten}
                    </Option>
                  )
                })}
              </Select>
              {formik.touched.LoaiGiayToCongDanID && formik.errors.LoaiGiayToCongDanID && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert' className='text-danger'>
                      {formik.errors.LoaiGiayToCongDanID}
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div className='col-xl-6 col-lg-6 col-md-6'>
              <label className='form-label fw-bolder text-dark fs-6'>Nhóm giấy tờ</label>
              <Select
                // defaultValue='2.000379.000.00.00.H18'
                defaultValue={props.data.NhomGiayToCongDanID}
                className='col-xl-12 col-lg-12 col-md-12'
                allowClear
                showSearch
                // disabled={isDisableInput}
                placeholder='Nhóm giấy tờ công dân'
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                onChange={(val, prop) => {
                  formik.values.NhomGiayToCongDanID = val
                  // formik.values.NhomGiayToCongDanID
                }}
              >
                {dsNhomHGiayTo.map((item) => {
                  // if (item.MATTHC == formik.values.maThuTuc && formik.values.maThuTuc) {
                  //   return (
                  //     <Option key={item.MATTHC} value={item.MATTHC} selected>
                  //       {item.TENTTHC}
                  //     </Option>
                  //   )
                  // }
                  return (
                    <Option key={item.ID} value={item.ID}>
                      {item.Ten}
                    </Option>
                  )
                })}
              </Select>
            </div>
          </div>
          <div className='row fv-row mb-7'>
            <div className='col-xl-6 col-lg-6 col-md-6'>
              <label className='form-label fw-bolder text-dark fs-6 required'>Tên giấy tờ</label>
              <textarea
                placeholder='Tên giấy tờ'
                rows={3}
                autoComplete='off'
                {...formik.getFieldProps('TenGiayTo')}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {'is-invalid': formik.touched.TenGiayTo && formik.errors.TenGiayTo},
                  {
                    'is-valid': formik.touched.TenGiayTo && !formik.errors.TenGiayTo,
                  }
                )}
              />
              {formik.touched.TenGiayTo && formik.errors.TenGiayTo && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert' className='text-danger'>
                      {formik.errors.TenGiayTo}
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div className='col-xl-6 col-lg-6 col-md-6'>
              <div>
                {' '}
                <label className='form-label fw-bolder text-dark fs-6'>Đính kèm</label>
              </div>
              <div>
                <Dragger {...uploads}>
                  <div>
                    <p className='ant-upload-text'>Thả tệp tin hoặc nhấp chuột để tải lên</p>
                    <p className='ant-upload-hint'>Đính kèm</p>
                  </div>
                </Dragger>
              </div>

              {formik.touched.UrlFile && formik.errors.UrlFile && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert' className='text-danger'>
                      {formik.errors.UrlFile}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* <div className='row fv-row mb-7'></div> */}
        </Modal.Body>
        <Modal.Footer className='bg-light px-4 py-2 align-items-center'>
          <div className='d-flex justify-content-center  align-items-center'>
            <Button
              className='btn-sm btn-primary rounded-1 p-2  ms-2'
              onClick={handleSubmitForm}
              // type='submit'
              disabled={formik.isSubmitting || !formik.isValid}
              hidden={formik.values.NguonGui == 'DVC' || props.action == 'view' ? true : false}
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
export default ModalFileCategoryItem
