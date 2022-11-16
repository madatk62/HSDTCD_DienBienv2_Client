import react, {useState, useEffect} from 'react'
import {Button, Col, Collapse} from 'react-bootstrap-v5'
import {Form, Input, Select} from 'antd'
import {shallowEqual, useSelector} from 'react-redux'
import axios from 'axios'

import {CONFIG} from '../../../../helpers/config'
import {requestPOST_URL} from '../../../../helpers/baseAPI'
const {Option} = Select
const PageHearder = (props) => {
  const userInfor = useSelector((auth) => auth.global.userInfo, shallowEqual)
  var initSelected = {
    maThuTuc: null,
    maNhomHoSo: null,
    maLoaiHoSo: null,
  }
  const FormItem = Form.Item
  const [form] = Form.useForm()
  const [isOpenCollapse, setIsOpenCollapse] = useState(false)
  const [selectedOption, setSelectedOption] = useState(initSelected)
  //   const [dsOptions, setDsOptions] = useState({
  //     dsThuTuc: [],
  //     dsLoaiHS: [],
  //     dsNhomHS: [],
  //   })
  const [dsThuTuc, setDsThuTuc] = useState([])
  const [dsLoaiHS, setDsLoaiHS] = useState([])
  const [dsNhomHS, setDsNhomHS] = useState([])
  useEffect(() => {
    LoadDsOptions()
  }, [])
  const LoadDsOptions = async () => {
    // load ds thu tuc
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
    // load ds nhom giay to
    var urlDsNhomHGiayTo = `${CONFIG.BASE_DBHSDT_URL}/nhomhosodientus/search`
    var searchBodyNhomHGiayTo = {
      iDCongDan: userInfor.technicalId ? userInfor.technicalId : null,
    }
    var dataNhomHGiayTo = await requestPOST_URL(urlDsNhomHGiayTo, searchBodyNhomHGiayTo)
    if (dataNhomHGiayTo?.data) {
      //   setDsOptions({
      //     dsLoaiHS: dsOptions.dsLoaiHS,
      //     dsThuTuc: dsOptions.dsThuTuc,
      //     dsNhomHS: dataNhomHGiayTo?.data,
      //   })
      setDsNhomHS(dataNhomHGiayTo?.data)
    }
    // load ds loai giay to
    var urlDsLoaiHGiayTo = `${CONFIG.BASE_DBHSDT_URL}/loaihosodientus/search`
    var searchBodyLoaiHGiayTo = {
      iDCongDan: userInfor.technicalId ? userInfor.technicalId : null,
    }
    var dataLoaiHGiayTo = await requestPOST_URL(urlDsLoaiHGiayTo, searchBodyLoaiHGiayTo)
    if (dataLoaiHGiayTo?.data) {
      //   setDsOptions({
      //     dsNhomHS: dsOptions.dsNhomHS,
      //     dsThuTuc: dsOptions.dsThuTuc,
      //     dsLoaiHS: dataLoaiHGiayTo?.data,
      //   })
      setDsLoaiHS(dataLoaiHGiayTo?.data)
    }
  }
  const handleTimKiem = () => {
    var formData = form.getFieldValue()

    var searchValue = {
      iDCongDan: userInfor?.technicalId ? userInfor?.technicalId : '',
      maThuTuc: formData.maThuTuc ? formData.maThuTuc : null,
      maNhomHoSo: formData.maNhomHoSo ? formData.maNhomHoSo : null,
      maLoaiHoSo: formData.maLoaiHoSo ? formData.maLoaiHoSo : null,
    }

    props.setSearchValue(searchValue)
  }
  return (
    <>
      <div className='px-3 py-3 border-bottom border-secondary border-bottom-solid d-flex align-items-center justify-content-between'>
        <h3 className='card-title fw-bold text-header-td fs-4 mb-0'>{props?.title ?? ''}</h3>
        <div className='align-items-center justify-content-between'>
          <button
            className='btn btn-secondary btn-sm m-btn m-btn--icon py-2 me-2'
            type='button'
            aria-expanded={isOpenCollapse}
            onClick={() => setIsOpenCollapse(!isOpenCollapse)}
          >
            <span>
              <i className='fas fa-search'></i>
              <span className=''>Tìm kiếm</span>
            </span>
          </button>
          <button
            className='btn btn-primary btn-sm m-btn m-btn--icon py-2 me-2'
            type='button'
            onClick={props.onClickThemMoi}
          >
            <span>
              <i className='fas fa-plus'></i>
              <span className=''>Thêm mới</span>
            </span>
          </button>
        </div>
      </div>
      <div>
        <Collapse in={isOpenCollapse}>
          <div className='card card-body'>
            <Form form={form} hideRequiredMark autoComplete='off'>
              <div className='row'>
                {/* <div className='col-xl-6 col-lg-6'>
                  <FormItem label='Từ khoá' name='keywordSearch'>
                    <Input placeholder='Từ khoá tìm kiếm' />
                  </FormItem>
                </div> */}
                <div className='col-xl-6 col-lg-6'>
                  <FormItem label='Thủ tục hành chính' name='maThuTuc'>
                    <Select
                      // defaultValue='2.000379.000.00.00.H18'

                      value={selectedOption.maThuTuc}
                      className='col-xl-12 col-lg-12 col-md-12'
                      allowClear
                      showSearch
                      //   disabled={isDisableInput}
                      placeholder='Thủ tục hành chính'
                      filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                      onChange={(val, text) => {
                        // formik.values.maThuTuc = val
                        // formik.values.tenThuTuc = text?.children
                        setSelectedOption({...selectedOption, maThuTuc: val})
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
                  </FormItem>
                </div>
                <div className='col-xl-6 col-lg-6'>
                  <FormItem label='Loại hồ sơ' name='maLoaiHoSo'>
                    <Select
                      // defaultValue='2.000379.000.00.00.H18'

                      value={selectedOption.maLoaiHoSo}
                      className='col-xl-12 col-lg-12 col-md-12'
                      allowClear
                      showSearch
                      //   disabled={isDisableInput}
                      placeholder='Loại hồ sơ'
                      filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                      onChange={(val, text) => {
                        // formik.values.maThuTuc = val
                        // formik.values.tenThuTuc = text?.children
                        setSelectedOption({...selectedOption, maLoaiHoSo: val})
                      }}
                    >
                      {dsLoaiHS.map((item) => {
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
                  </FormItem>
                </div>
                <div className='col-xl-6 col-lg-6'>
                  <FormItem label='Nhóm hồ sơ' name='maNhomHoSo'>
                    <Select
                      // defaultValue='2.000379.000.00.00.H18'

                      value={selectedOption.maNhomHoSo}
                      className='col-xl-12 col-lg-12 col-md-12'
                      allowClear
                      showSearch
                      //   disabled={isDisableInput}
                      placeholder='Nhóm hồ sơ'
                      filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                      onChange={(val, text) => {
                        // formik.values.maThuTuc = val
                        // formik.values.tenThuTuc = text?.children
                        setSelectedOption({...selectedOption, maThuTuc: val})
                      }}
                    >
                      {dsNhomHS.map((item) => {
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
                  </FormItem>
                </div>
              </div>
              <div className='row'>
                <div className='col-xl-12 col-lg-12 d-flex justify-content-center'>
                  <button
                    className='btn btn-primary btn-sm m-btn m-btn--icon py-2 me-2'
                    onClick={handleTimKiem}
                  >
                    <span>
                      <i className='fas fa-search'></i>
                      <span className=''>Tìm kiếm</span>
                    </span>
                  </button>
                  <button
                    className='btn btn-secondary btn-sm m-btn m-btn--icon py-2 me-2'
                    onClick={() => {
                      form.resetFields()
                      setSelectedOption(initSelected)
                      handleTimKiem()
                    }}
                  >
                    <span>
                      <i className='fas fa-sync'></i>
                      <span className=''>Tải lại</span>
                    </span>
                  </button>
                </div>
              </div>
            </Form>
          </div>
        </Collapse>
      </div>
    </>
  )
}
export default PageHearder
