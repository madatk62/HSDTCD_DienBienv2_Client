/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from 'react'
import {useIntl} from 'react-intl'
import {useDispatch, useSelector} from 'react-redux'
import {PageTitle} from '../../../_metronic/layout/core'
import {CONFIG} from '../../../helpers/config'
import {Navigate, Route, Routes} from 'react-router-dom'
import {toast} from 'react-toastify'
import {Link} from 'react-router-dom'
import {KTSVG, toAbsoluteUrl} from '../../../_metronic/helpers'
import {requestPOST, requestGET} from '../../../helpers/baseAPI'
import moment from 'moment'
import {
  Form,
  Input,
  Typography,
  Select,
  Checkbox,
  Divider,
  DatePicker,
  Spin,
  Upload,
  Image,
  Dropdown,
  Menu,
  Table,
  List,
  InputNumber,
} from 'antd'
import {Modal, Button, Tab, Nav, Card} from 'react-bootstrap-v5'

const ProfilePage = () => {
  const userInfoDomino = useSelector((state) => state.global.userInfoDomino)
  const accessToken = useSelector((state) => state.global.accessToken)
  const [form] = Form.useForm()
  const [dataUser, setDataUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)
  const [buttonLoading, setButtonLoading] = useState(false)
  const DATA_GENDER = [
    {
      id: 1,
      name: 'Nam',
    },
    {
      id: 2,
      name: 'Nữ',
    },
    {
      id: 3,
      name: 'Khác',
    },
  ]
  useEffect(() => {
    const fetchData = async () => {
      try {
        var reqBody = {
          token: accessToken,
        }
        const response = await requestPOST(`danhmuc/GetUserInfo`, reqBody)
        setDataUser(response?.data ?? null)
      } catch (error) {}
      setRefreshing(false)
    }
    if (refreshing) {
      fetchData()
    }

    return () => {}
  }, [refreshing])
  const handleExited = () => {
    form.resetFields()
  }
  const getFileName = (fileUrl) => {
    var fileName = ''
    if (fileUrl.length > 0) {
      fileName = fileUrl.substring(fileUrl.lastIndexOf('/') + 1, fileUrl.length)
    }
    return fileName
  }
  const handleSubmit = async () => {
    setButtonLoading(true)
    try {
      let values = await form.validateFields()

      let formData = form.getFieldsValue(true)
      var bodyData = {
        token: accessToken,
        userInfo: {
          FullName: formData.FullName,
          Birthday: formData.Birthday,
          Sex: formData.Sex?.id,
          Phone: formData.Phone,
          Email: formData.Email,
        },
      }
      var res = await requestPOST(`danhmuc/UpdateUserInfo`, bodyData)
      if (res?.error?.code == 200) {
        toast.success('Thao tác thành công!')
        setRefreshing(true)
        setModalVisible(false)
      } else {
        toast.warning('Thao tác không thành công!')
      }
    } catch (error) {}
    setButtonLoading(false)
  }
  const handleModal = () => {
    var temp = {...dataUser}
    temp.Birthday = temp?.Birthday ? moment(temp.Birthday) : ''
    temp.Sex = temp?.Sex ? DATA_GENDER.find((i) => i.name == temp.Sex)?.id : ''

    form.setFieldsValue(temp)
    setModalVisible(true)
    setButtonLoading(false)
  }
  return (
    <>
      <div className='card mb-5 mb-xl-10'>
        <div className='card-header cursor-pointer p-2'>
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>Thông tin cá nhân</h3>
          </div>
          <div
            className='btn btn-primary btn-sm align-self-center'
            onClick={() => {
              handleModal()
            }}
          >
            <i className='fas fa-edit'></i>
            Cập nhật
          </div>
        </div>
        <div className='card-body pt-5 pb-0'>
          <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
            <div className='me-7 mb-4'>
              <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
                <img src={toAbsoluteUrl('/media/avatars/blank.png')} alt='Metronic' />
              </div>
            </div>

            <div className='flex-grow-1'>
              <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
                <div className='d-flex flex-column'>
                  <div className='d-flex align-items-center mb-2'>
                    <span className='text-primary fs-2 fw-bolder me-1'>
                      {dataUser?.FullName ?? userInfoDomino?.tendaydu}
                    </span>
                  </div>

                  <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>
                    {/* <span className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'>
                      <KTSVG
                        path='/media/icons/duotune/communication/com006.svg'
                        className='svg-icon-4 me-1'
                      />
                      {userInfoDomino?.gioitinh === '2' ? 'Nam' : 'Nữ'}
                    </span> */}
                    <span className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'>
                      <KTSVG
                        path='/media/icons/duotune/general/gen018.svg'
                        className='svg-icon-4 me-1'
                      />
                      {userInfoDomino?.donvicap1}
                    </span>
                    {/*  <span className='d-flex align-items-center text-gray-400 text-hover-primary mb-2'>
                      <KTSVG
                        path='/media/icons/duotune/communication/com011.svg'
                        className='svg-icon-4 me-1'
                      />
                      max@kt.com
                    </span> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='my-5 mb-xl-10 border-top pt-5'>
            <div className='row'>
              <div className='col-lg-6'>
                <div className='row mb-7'>
                  <label className='col-lg-3 fw-bold text-muted'>Họ tên</label>

                  <div className='col-lg-9'>
                    <span className='fw-bolder fs-6 text-dark'>
                      {dataUser?.FullName ?? userInfoDomino?.tendaydu}
                    </span>
                  </div>
                </div>

                <div className='row mb-7'>
                  <label className='col-lg-3 fw-bold text-muted'>Đơn vị</label>

                  <div className='col-lg-9 fv-row'>
                    <span className='fw-bold fs-6'>{userInfoDomino?.donvicap1}</span>
                  </div>
                </div>
                <div className='row mb-7'>
                  <label className='col-lg-3 fw-bold text-muted'>Chức vụ</label>

                  <div className='col-lg-9'>
                    <span className='fw-bolder fs-6 text-dark'>{userInfoDomino?.chucvu}</span>
                  </div>
                </div>
                <div className='row mb-7'>
                  <label className='col-lg-3 fw-bold text-muted'>Tên đăng nhập</label>

                  <div className='col-lg-9'>
                    <span className='fw-bolder fs-6 text-dark'>{userInfoDomino?.tendangnhap}</span>
                  </div>
                </div>
              </div>
              <div className='col-lg-6'>
                <div className='row mb-7'>
                  <label className='col-lg-3 fw-bold text-muted'>Ngày sinh</label>

                  <div className='col-lg-9'>
                    <span className='fw-bolder fs-6 text-dark'>
                      {dataUser?.Birthday ? moment(dataUser?.Birthday).format('DD/MM/YYYY') : ''}
                    </span>
                  </div>
                </div>

                <div className='row mb-7'>
                  <label className='col-lg-3 fw-bold text-muted'>Giới tính</label>

                  <div className='col-lg-9 fv-row'>
                    <span className='fw-bold fs-6'>{dataUser?.Sex ?? ''}</span>
                  </div>
                </div>
                <div className='row mb-7'>
                  <label className='col-lg-3 fw-bold text-muted'>Điện thoại</label>

                  <div className='col-lg-9'>
                    <span className='fw-bolder fs-6 text-dark'>{dataUser?.Phone ?? ''}</span>
                  </div>
                </div>
                <div className='row mb-7'>
                  <label className='col-lg-3 fw-bold text-muted'>Email</label>
                  <div className='col-lg-9'>
                    <span className='fw-bolder fs-6 text-dark'>{dataUser?.Email ?? ''}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={modalVisible}
        size='sm'
        scrollable
        onExited={() => {
          handleExited()
        }}
      >
        <Modal.Header className='bg-primary px-4 py-3'>
          <Modal.Title className='text-white'>{'Cập nhật thông tin cá nhân'}</Modal.Title>
          <button
            type='button'
            className='btn-close btn-close-white'
            aria-label='Close'
            onClick={() => setModalVisible(false)}
          ></button>
        </Modal.Header>
        <Modal.Body>
          <Form form={form} layout='vertical'>
            <div className='row px-10'>
              <div className='col-xl-12'>
                <Form.Item
                  label='Họ và tên'
                  name='FullName'
                  rules={[{required: true, message: 'Không được để trống!'}]}
                >
                  <Input />
                </Form.Item>
              </div>
              <div className='col-xl-12'>
                <Form.Item
                  label='Ngày sinh'
                  name='Birthday'
                  rules={[{required: true, message: 'Không được để trống!'}]}
                >
                  <DatePicker
                    style={{width: '100%'}}
                    format='DD/MM/YYYY'
                    placeholder='Chọn ngày sinh'
                  />
                </Form.Item>
              </div>
              <div className='col-xl-12'>
                <Form.Item
                  label='Giới tính'
                  name='Sex'
                  rules={[{required: true, message: 'Không được để trống!'}]}
                >
                  <Select placeholder={'Chọn giới tính'}>
                    {DATA_GENDER?.map((item) => {
                      return (
                        <Select.Option key={item.id} value={item.id}>
                          {item.name}
                        </Select.Option>
                      )
                    })}
                  </Select>
                </Form.Item>
              </div>
              <div className='col-xl-12'>
                <Form.Item
                  label='Điện thoại'
                  name='Phone'
                  rules={[{required: true, message: 'Không được để trống!'}]}
                >
                  <Input />
                </Form.Item>
              </div>
              <div className='col-xl-12'>
                <Form.Item
                  label='Email'
                  name='Email'
                  rules={[{required: true, message: 'Không được để trống!'}]}
                >
                  <Input />
                </Form.Item>
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer className='bg-light px-4 py-2 align-items-center'>
          <div className='d-flex justify-content-center  align-items-center'>
            <Button
              disabled={buttonLoading}
              className='btn-sm btn-success rounded-1 p-2  ms-2'
              onClick={() => handleSubmit()}
            >
              <i className='fa fa-save'></i>Xác nhận
            </Button>
            <Button
              className='btn-sm btn-danger rounded-1 p-2  ms-2'
              onClick={() => setModalVisible(false)}
            >
              <i className='fa fa-times'></i>Đóng
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  )
}

const ProfileWrapper = () => {
  const intl = useIntl()
  return (
    <>
      <ProfilePage />
    </>
  )
}

export {ProfileWrapper}
