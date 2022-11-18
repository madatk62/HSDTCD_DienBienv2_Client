import React, {useState, useEffect} from 'react'
import {Modal, Button} from 'react-bootstrap-v5'
import {useFormik, Field} from 'formik'
import * as yup from 'yup'
import clsx from 'clsx'
import {Select} from 'antd'
import {toast} from 'react-toastify'
import axios from 'axios'
import {shallowEqual, useSelector} from 'react-redux'

import {requestPOST_URL, requestPUT_URL, requestPOST_ASP} from '../../../../helpers/baseAPI'
import {CONFIG} from '../../../../helpers/config'
import TableGiayToHoSoDienTus from '../../giaytohosodientus/components/TableGiayToHoSoDienTus'
// const base_url = "https://danhmuc.hanhchinhcong.net/_layouts/15/TD.CSDLChung.WCF/CSDLChungService.svc";
const {Option} = Select

const GiayToSchema = yup.object().shape({
  tenHoSo: yup.string().trim().required('Tên hồ sơ là bắt buộc'),
})
const ModalHoSoDienTuItem = (props) => {
  const userInfor = useSelector((auth) => auth.global.userInfo, shallowEqual)

  const searchGiayToHSDTData = {
    idCongDan: userInfor.technicalId ? userInfor.technicalId : '',
    hoSoDienTuID: props?.data?.id ? props?.data?.id : '',
  }
  var initSelectFormValue = {
    thuTuc: props?.data?.maThuTuc ? props?.data?.maThuTuc : null,
    nhomHoSo: props?.data?.maNhomHoSo ? props?.data?.maNhomHoSo : null,
    loaiHoSo: props?.data?.maLoaiHoSo ? props?.data?.maLoaiHoSo : null,
    linhVuc: props?.data?.maLinhVuc ? props?.data?.maLinhVuc : null,
  }

  var initValue = {
    id: '',
    maHoSo: '',
    tenHoSo: '',
    tenThuTuc: '',
    maThuTuc: '',
    tenLinhVuc: '',
    maLinhVuc: '',
    tenNhomHoSo: '',
    maNhomHoSo: '',
    tenLoaiHoSo: '',
    maLoaiHoSo: null,
  }
  const [isLoading, setIsLoading] = useState(false)
  const [isDisableInput, setIsDisableInput] = useState(false)
  const [isSubmited, setIsSubmited] = useState(false)
  const [hoSoDienTuID, setHoSoDienTuID] = useState(null)
  // init formdata
  const [dsNhomGiayTo, setDsNhomGiayTo] = useState([])
  const [dsLoaiGiayTo, setDsLoaiGiayTo] = useState([])
  const [dsThuTuc, setDsThuTuc] = useState([])
  const [selectedLinhVuc, setSelectedLinhVuc] = useState({})
  const [selectedOption, setSelectedOption] = useState(initSelectFormValue)
  // LoadFormData
  const LoadFormDaTa = async () => {
    // load ds nhom giay to
    var urlDsNhomHGiayTo = `${CONFIG.BASE_DBHSDT_URL}/nhomhosodientus/search`
    var searchBodyNhomHGiayTo = {
      iDCongDan: userInfor.technicalId ? userInfor.technicalId : null,
    }
    var dataNhomHGiayTo = await requestPOST_URL(urlDsNhomHGiayTo, searchBodyNhomHGiayTo)
    if (dataNhomHGiayTo?.data) {
      setDsNhomGiayTo(dataNhomHGiayTo?.data)
    }
    // load ds loai giay to
    var urlDsLoaiHGiayTo = `${CONFIG.BASE_DBHSDT_URL}/loaihosodientus/search`
    var searchBodyLoaiHGiayTo = {
      iDCongDan: userInfor.technicalId ? userInfor.technicalId : null,
    }
    var dataLoaiHGiayTo = await requestPOST_URL(urlDsLoaiHGiayTo, searchBodyLoaiHGiayTo)
    if (dataLoaiHGiayTo?.data) {
      setDsLoaiGiayTo(dataLoaiHGiayTo?.data)
    }
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
      var result = resData?.result
      if (result) {
        setDsThuTuc(result)
      }
    }
    // //form thu tuc
    // var urlgetLinhVuc = `${CONFIG.URL_MotCuaDienBien}/LayDanhMucLinhVuc`
    // const resLinhVuc = await axios({
    //   method: 'Get',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${CONFIG.Bearer_Token_MotCuaDienBien}`,
    //     //   Authorization: `Bearer ${CONFIG.GETWAY_TOKEN}`,
    //     // "Access-Control-Allow-Origin":"*",
    //     // 'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    //   },
    //   url: urlgetLinhVuc,
    // })
    // if (resLinhVuc.status == 200) {
    //   var strResult = resLinhVuc.data.message
    //   var resData = JSON.parse(strResult)
    //   var result = resData?.result
    //   if (result) {
    //     setDsLinhVuc(result)
    //   }
    // }
    //
    // getLinhVucByMaTTHC('2.002042.000.00.00.H56')
  }
  const getLinhVucByMaTTHC = async (maTTHC) => {
    var urlgetLinhVuc = `${CONFIG.URL_MotCuaDienBien}/LayThuTuc?maTTHC=${maTTHC}`
    const resLinhVuc = await axios({
      method: 'Get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${CONFIG.Bearer_Token_MotCuaDienBien}`,
        //   Authorization: `Bearer ${CONFIG.GETWAY_TOKEN}`,
        // "Access-Control-Allow-Origin":"*",
        // 'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
      },
      url: urlgetLinhVuc,
    })
    if (resLinhVuc.status == 200) {
      var strResult = resLinhVuc.data.message
      var resData = JSON.parse(strResult)
      var result = resData?.result
      if (result) {
        console.log(formik.values)
        setSelectedOption({...selectedOption, linhVuc: result[0]?.LINHVUCTHUCHIEN[0]?.MALINHVUC})
        formik.values.maLinhVuc = result[0]?.LINHVUCTHUCHIEN[0]?.MALINHVUC
        formik.values.tenLinhVuc = result[0]?.LINHVUCTHUCHIEN[0]?.TENLINHVUC
        setSelectedLinhVuc({
          maLinhVuc: result[0]?.LINHVUCTHUCHIEN[0]?.MALINHVUC,
          tenLinhVuc: result[0]?.LINHVUCTHUCHIEN[0]?.TENLINHVUC,
        })
      }
    }
  }
  const handleSubmitForm = () => {
    if (hoSoDienTuID) {
      props.setModalVisible(false)
      setHoSoDienTuID(null)
      props.reRenderTable({iDCongDan: userInfor?.technicalId ? userInfor?.technicalId : ''})
    } else {
      var a = formik.handleSubmit()
    }
  }
  const handleLuuHoSo = () => {
    var postData = {
      maHoSo: formik.values.maHoSo ? formik.values.maHoSo : '',
      tenHoSo: formik.values.tenHoSo ? formik.values.tenHoSo : '',
      maThuTuc: formik.values.maThuTuc ? formik.values.maThuTuc : '',
      tenThuTuc: formik.values.tenThuTuc ? formik.values.tenThuTuc : '',
      maLinhVuc: formik.values.maLinhVuc ? formik.values.maLinhVuc : '',
      tenLinhVuc: formik.values.tenLinhVuc ? formik.values.tenLinhVuc : '',
      tenNhomHoSo: formik.values.tenNhomHoSo ? formik.values.tenNhomHoSo : '',
      maNhomHoSo: formik.values.maNhomHoSo ? formik.values.maNhomHoSo : '',
      tenLoaiHoSo: formik.values.tenLoaiHoSo ? formik.values.tenLoaiHoSo : '',
      maLoaiHoSo: formik.values.maLoaiHoSo ? formik.values.maLoaiHoSo : '',
      idCongDan: userInfor.technicalId ? userInfor.technicalId : '',
      taiKhoanTao: userInfor.userName ? userInfor.userName : '',
    }

    var url = ` ${CONFIG.BASE_DBHSDT_URL}/hosodientus`
    requestPOST_ASP(url, postData).then((res) => {
      toast.success('Thêm mới thành công')
      if (res?.data?.data) {
        setHoSoDienTuID(res?.data?.data)
        setIsSubmited(true)
      }
      // formik.setIsLoading(false)
      formik.setSubmitting(false)
      props.reRenderTable({iDCongDan: userInfor?.technicalId ? userInfor?.technicalId : ''})
    })
  }
  const handleClose = () => {
    formik.setValues(initValue)
    setSelectedOption(initSelectFormValue)
    props.setModalVisible(false)
  }
  const handleShow = () => props.setModalVisible(true)
  const formik = useFormik({
    initialValues: initValue,
    validationSchema: GiayToSchema,
    onSubmit: (values, {setStatus, setSubmitting}) => {
      setSubmitting(true)
      setIsLoading(true)

      if (props.action == 'edit') {
        var postData = {
          id: props?.data?.id,
          maHoSo: formik.values.maHoSo ? formik.values.maHoSo : '',
          tenHoSo: formik.values.tenHoSo ? formik.values.tenHoSo : '',
          maThuTuc: formik.values.maThuTuc ? formik.values.maThuTuc : '',
          tenThuTuc: formik.values.tenThuTuc ? formik.values.tenThuTuc : '',
          maLinhVuc: formik.values.maLinhVuc ? formik.values.maLinhVuc : '',
          tenLinhVuc: formik.values.tenLinhVuc ? formik.values.tenLinhVuc : '',
          tenNhomHoSo: formik.values.tenNhomHoSo ? formik.values.tenNhomHoSo : '',
          maNhomHoSo: formik.values.maNhomHoSo ? formik.values.maNhomHoSo : '',
          tenLoaiHoSo: formik.values.tenLoaiHoSo ? formik.values.tenLoaiHoSo : '',
          maLoaiHoSo: formik.values.maLoaiHoSo ? formik.values.maLoaiHoSo : '',
          idCongDan: userInfor.technicalId ? userInfor.technicalId : '',
          taiKhoanTao: userInfor.userName ? userInfor.userName : '',
        }

        var url = ` ${CONFIG.BASE_DBHSDT_URL}/hosodientus/${props.data.id}`
        requestPUT_URL(url, postData).then((res) => {
          toast.success('Cập nhật thành công')
          setIsLoading(false)
          setSubmitting(false)
          setIsSubmited(true)
          props.setModalVisible(false)
          props.reRenderTable({iDCongDan: userInfor?.technicalId ? userInfor?.technicalId : ''})
        })
      } else if (props.action == 'add') {
        var postData = {
          maHoSo: formik.values.maHoSo ? formik.values.maHoSo : '',
          tenHoSo: formik.values.tenHoSo ? formik.values.tenHoSo : '',
          maThuTuc: formik.values.maThuTuc ? formik.values.maThuTuc : '',
          tenThuTuc: formik.values.tenThuTuc ? formik.values.tenThuTuc : '',
          maLinhVuc: formik.values.maLinhVuc ? formik.values.maLinhVuc : '',
          tenLinhVuc: formik.values.tenLinhVuc ? formik.values.tenLinhVuc : '',
          tenNhomHoSo: formik.values.tenNhomHoSo ? formik.values.tenNhomHoSo : '',
          maNhomHoSo: formik.values.maNhomHoSo ? formik.values.maNhomHoSo : '',
          tenLoaiHoSo: formik.values.tenLoaiHoSo ? formik.values.tenLoaiHoSo : '',
          maLoaiHoSo: formik.values.maLoaiHoSo ? formik.values.maLoaiHoSo : '',
          idCongDan: userInfor.technicalId ? userInfor.technicalId : '',
          taiKhoanTao: userInfor.userName ? userInfor.userName : '',
        }
        var url = ` ${CONFIG.BASE_DBHSDT_URL}/hosodientus`
        requestPOST_ASP(url, postData).then((res) => {
          toast.success('Thêm mới thành công')
          setIsLoading(false)
          setSubmitting(false)
          setIsSubmited(true)
          props.setModalVisible(false)
          props.reRenderTable({iDCongDan: userInfor?.technicalId ? userInfor?.technicalId : ''})
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
  useEffect(() => {
    console.log(props)
    if (props.action == 'view') {
      setIsDisableInput(true)
      setIsSubmited(true)
    } else if (props.action == 'edit') {
      setIsSubmited(true)
    }
    formik.setValues(props.data)
    LoadFormDaTa()
  }, [])
  useEffect(() => {
    getLinhVucByMaTTHC(selectedOption.thuTuc)
  }, [selectedOption.thuTuc])
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
              <label className='form-label fw-bolder text-dark fs-6 required'>Tên hồ hồ sơ</label>
              <input
                placeholder='Tên hồ sơ'
                type='text'
                autoComplete='off'
                disabled={isDisableInput}
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
          {/* <div className='row fv-row mb-7'>
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
          </div> */}

          <div className='row fv-row mb-7'>
            <div className='col-xl-12 col-lg-12 col-md-12'>
              <label className='form-label fw-bolder text-dark fs-6 required'>
                Thủ tục hành chính
              </label>
              <Select
                // defaultValue='2.000379.000.00.00.H18'

                value={selectedOption.thuTuc}
                className='col-xl-12 col-lg-12 col-md-12'
                allowClear
                showSearch
                disabled={isDisableInput}
                placeholder='Thủ tục hành chính'
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                onChange={(val, text) => {
                  formik.values.maThuTuc = val
                  formik.values.tenThuTuc = text?.children
                  // formik.setValues({...formik.values, maThuTuc: val, tenThuTuc: text?.children})
                  setSelectedOption({...selectedOption, thuTuc: val})
                }}
              >
                {dsThuTuc.map((item) => {
                  // if (item.MATTHC == formik.values.maThuTuc && formik.values.maThuTuc) {
                  //   return (
                  //     <Option key={item.MATTHC} value={item.MATTHC} selected>
                  //       {item.TENTTHC}
                  //     </Option>
                  //   )
                  // }
                  return (
                    <Option key={item.MATTHC} value={item.MATTHC}>
                      {item.TENTTHC}
                    </Option>
                  )
                })}
              </Select>
            </div>
          </div>
          <div className='row fv-row mb-7'>
            <div className='col-xl-12 col-lg-12 col-md-12'>
              <label className='form-label fw-bolder text-dark fs-6 required'>Lĩnh vực</label>
              <Select
                // defaultValue='2.000379.000.00.00.H18'

                value={selectedOption.linhVuc}
                className='col-xl-12 col-lg-12 col-md-12'
                allowClear
                showSearch
                disabled={false}
                placeholder='Lĩnh vực'
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                onChange={(val, text) => {
                  // formik.values.maLinhVuc = val
                  // formik.values.tenLinhVuc = text?.children
                  formik.setValues({...formik.values, maLinhVuc: val, tenLinhVuc: text?.children})
                  setSelectedOption({...selectedOption, linhVuc: val})
                }}
              >
                {/* {dsLinhVuc.map((item) => {
                  // if (item.MATTHC == formik.values.maLinhVuc && formik.values.maLinhVuc) {
                  //   return (
                  //     <Option key={item.MATTHC} value={item.MATTHC} selected>
                  //       {item.TENTTHC}
                  //     </Option>
                  //   )
                  // }
                  return (
                    <Option key={item.MALINHVUC} value={item.MALINHVUC}>
                      {item.TENLINHVUC}
                    </Option>
                  )
                })} */}
                <Option key={selectedLinhVuc.maLinhVuc} value={selectedLinhVuc.maLinhVuc}>
                  {selectedLinhVuc.tenLinhVuc}
                </Option>
              </Select>
            </div>
          </div>
          <div className='row fv-row mb-7'>
            <div className='col-xl-6 col-lg-6 col-md-6'>
              <label className='form-label fw-bolder text-dark fs-6'>Loại hồ sơ</label>
              <Select
                // defaultValue='2.000379.000.00.00.H18'
                value={selectedOption.loaiHoSo}
                // defaultValue={props.data.maLoaiHoSo}
                className='col-xl-12 col-lg-12 col-md-12'
                allowClear
                showSearch
                disabled={isDisableInput}
                placeholder='Loại hồ sơ'
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                onChange={(val, option) => {
                  formik.values.maLoaiHoSo = val
                  formik.values.tenLoaiHoSo = option?.children
                  setSelectedOption({...selectedOption, loaiHoSo: val})
                }}
              >
                {dsLoaiGiayTo.map((item) => {
                  // if (item.MATTHC == formik.values.maThuTuc && formik.values.maThuTuc) {
                  //   return (
                  //     <Option key={item.MATTHC} value={item.MATTHC} selected>
                  //       {item.TENTTHC}
                  //     </Option>
                  //   )
                  // }
                  return (
                    <Option key={item.id} value={item.id}>
                      {item.ten}
                    </Option>
                  )
                })}
              </Select>
              {formik.touched.maLoaiHoSo && formik.errors.maLoaiHoSo && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert' className='text-danger'>
                      {formik.errors.maLoaiHoSo}
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div className='col-xl-6 col-lg-6 col-md-6'>
              <label className='form-label fw-bolder text-dark fs-6'>Nhóm hồ sơ</label>
              <Select
                value={selectedOption.nhomHoSo}
                className='col-xl-12 col-lg-12 col-md-12'
                allowClear
                showSearch
                disabled={isDisableInput}
                placeholder='Nhóm hồ sơ công dân'
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                onChange={(val, prop) => {
                  formik.values.maNhomHoSo = val
                  formik.values.tenNhomHoSo = prop?.children ? prop?.children : null
                  setSelectedOption({...selectedOption, nhomHoSo: val})
                  // formik.values.NhomGiayToCongDanID
                }}
              >
                {dsNhomGiayTo.map((item) => {
                  // if (item.MATTHC == formik.values.maThuTuc && formik.values.maThuTuc) {
                  //   return (
                  //     <Option key={item.MATTHC} value={item.MATTHC} selected>
                  //       {item.TENTTHC}
                  //     </Option>
                  //   )
                  // }
                  return (
                    <Option key={item.id} value={item.id}>
                      {item.ten}
                    </Option>
                  )
                })}
              </Select>
            </div>
          </div>
          {props.action != 'edit' && props.action != 'view' && (
            <div className='row fv-row mb-7'>
              <div className='col-xl-12 col-lg-12 col-md-12 d-flex'>
                <Button
                  className='btn btn-primary btn-sm m-btn m-btn--icon py-2 me-2'
                  type='button'
                  disabled={formik.isSubmitting || !formik.isValid || isSubmited}
                  onClick={handleLuuHoSo}
                >
                  <span>
                    <i className='fas fa-save'></i>
                    <span className=''>Lưu hồ sơ điện tử</span>
                  </span>
                </Button>
              </div>
              <span className='bullet bullet-horizontal flex-grow-1 bg-secondary h-1px mt-5'></span>
            </div>
          )}
          <div className=''>
            {props.action == 'view' ? (
              <TableGiayToHoSoDienTus
                lstAction={['btnView']}
                searchData={searchGiayToHSDTData}
                data={{hoSoDienTuID: props?.data?.id}}
                action='view'
              />
            ) : props.action == 'edit' ? (
              <TableGiayToHoSoDienTus
                lstAction={['btnView', 'btnEdit', 'btnDel']}
                searchData={searchGiayToHSDTData}
                data={{hoSoDienTuID: props?.data?.id}}
              />
            ) : props.action == 'add' ? (
              <TableGiayToHoSoDienTus
                lstAction={['btnView', 'btnEdit', 'btnDel']}
                searchData={searchGiayToHSDTData}
                data={{hoSoDienTuID: hoSoDienTuID}}
                action='addFromHSDT'
              />
            ) : null}
          </div>
        </Modal.Body>
        <Modal.Footer className='bg-light px-4 py-2 align-items-center'>
          <div className='d-flex justify-content-center  align-items-center'>
            <Button
              className='btn-sm btn-primary rounded-1 p-2  ms-2'
              onClick={handleSubmitForm}
              // type='submit'
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
