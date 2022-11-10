/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { KTSVG, toAbsoluteUrl, defaultAlerts, defaultLogs } from '../../../helpers'
import { Tab, Nav } from 'react-bootstrap-v5'
import { requestPOST, requestGET_CHAT, TextToSpeech } from '../../../../helpers/baseAPI'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { Popover } from 'antd'

const classname = ['warning', 'danger', 'info', 'success']

const HeaderNotificationsMenu = () => {

  const userInfoDomino = useSelector((state) => state.global.userInfoDomino)

  const history = useHistory()

  const [data, setData] = useState([])
  const [refresh, setRefresh] = useState(true)
  const [unRead, setUnRead] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      let res = await requestGET_CHAT(`v1/notifi?username=${userInfoDomino?.tendangnhap}&perpage=100`)
      let _data = res?.data ?? []
      let _dataU = _data.filter(i => !i.isRead)
      setData(_data)
      setUnRead(_dataU.length)
      setRefresh(false)
    }

    try {
      if (userInfoDomino?.tendangnhap && refresh) fetchData()
    } catch (error) { }
    return () => { }
  }, [refresh])

  const deleteNotify = async (id) => {
    var res = await requestGET_CHAT(`v1/notifi/admindelete?id=${id}`)
    let _data = res?.data ?? {}
    setRefresh(true)
  }

  const readNotify = async (item) => {
    var res = await TextToSpeech(`${item.title}. ${item.body}`)
    let _data = res?.audioContent ?? null
    if (_data) {
      var snd = new Audio("data:audio/wav;base64," + _data);
      snd.play();
    }
  }

  const handleChiTiet = (item) => {
    var _type = item?.appType ?? ''
    var _data = JSON.parse(item?.data??"")
    var nav = ''
    var param = ''
    switch (_type) {
      case 'CDDH_Drawer':
        nav = 'CDDHDOMINO'
        param = `docid=${_data.docid}`
        break;
      case 'LICHCTDOMINO_Drawer':
        nav = 'LICHDOMINO'
        param = `docid=${_data.docid}`
        break;
      case 'PAHT_Drawer':
        nav = 'PAHT'
        param = `func=${_data.function}`
        break;
      case 'TLCH_Drawer':
        nav = 'HOP'
        break;
      case 'KTXH_Drawer':
        nav = 'BAOCAO'
        param = `func=${_data.function}`
        break;
      case 'QLVB_Drawer':
        nav = 'QLVBDOMINO'
        break;
      default:
        break;
    }
    if(nav) history.replace(`/${nav}?${param}`)
  }

  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column w-350px w-lg-400px'
      data-kt-menu='true'
    >
      <Tab.Container id="notifycation-tab" defaultActiveKey="first">
        <div
          className='d-flex flex-column bgi-no-repeat rounded-top'
        >
          <h3 className='text-center fw-bolder fs-4 px-5 pt-5'>
            Thông báo <span className='fs-8 opacity-75 ps-1'>({unRead} chưa đọc)</span>
          </h3>

          <Nav variant="pills" className='nav nav-line-tabs nav-line-tabs-2x nav-stretch fw-bold px-9'>
            <Nav.Item className='nav-item'>
              <Nav.Link
                className='fw-bolder pb-4 rounded-0'
                eventKey="first"
              >
                Cá nhân
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>

        <Tab.Content>
          <Tab.Pane eventKey="first">
            <div className='scroll-y mh-400px my-3 px-5'>
              {data.map((item, index) => (
                <div key={`alert${index}`} className='d-flex flex-stack pb-3'>
                  <div className='d-flex align-items-center'>
                    <div className='symbol symbol-35px me-4'>
                      <span className={clsx('symbol-label', `bg-light-${classname[index % 4]}`)}>
                        {' '}
                        <KTSVG
                          path={`/media/icons/duotune/art/art002.svg`}
                          className={`svg-icon-2 svg-icon-${classname[index % 4]}`}
                        />
                      </span>
                    </div>

                    <div className='mb-0 me-2' onClick={() => handleChiTiet(item)}>
                      <div>
                        <a className='fs-6 text-gray-800 text-hover-primary fw-bolder'>
                          {item.title}
                        </a>
                      </div>
                      <div className='text-gray-600 fs-7 w-250px text-1line'>{item.body}</div>
                      <span className='text-gray-400 fs-8 fst-italic'>{item.createdAt ? moment(item.createdAt).fromNow() : ''}</span>
                    </div>
                  </div>
                  <div className='d-flex'>
                    <a onClick={() => deleteNotify(item?.id)}><i title='Xóa' className='fa me-1 text-danger fa-trash me-3' /></a>
                    <a onClick={() => readNotify(item)}><i title='Đọc' className='fa me-1 text-primary fa-microphone' /></a>
                  </div>
                </div>
              ))}
            </div>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  )
}

export { HeaderNotificationsMenu }
