import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import '../index.scss'
import moment from 'moment'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import {CONFIG} from '../../../../helpers/config'
import {requestPOST, requestGET} from '../../../../helpers/baseAPI'
import {getColumnSSChart} from '../../../../helpers/utils'
import CountUp from 'react-countup'
// import { useHistory } from "react-router-dom";
import {Skeleton, Popover, Dropdown} from 'antd'
import * as actions from '../../../../setup/redux/global/Actions'
import {DropdownMenu} from '../../../components/DropdownMenu'
import {Link} from 'react-router-dom'

const Widget1 = () => {
  const dispatch = useDispatch()
  //   const history = useHistory()

  const [loading, setLoading] = useState(true)
  const [dataNV, setDataNV] = useState([])
  const [dataBDNV, setDataBDNV] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      let _data = [
        {
          Code: 'cho-tiep-nhan',
          Name: 'Chờ tiếp nhận',
          Number: 9,
        },
        {
          Code: 'cho-duyet',
          Name: 'Chờ duyệt',
          Number: 2,
        },
        {
          Code: 'cho-tiep-nhan',
          Name: 'Chờ tiếp nhận',
          Number: 9,
        },
        {
          Code: 'cho-duyet',
          Name: 'Chờ duyệt',
          Number: 2,
        },
      ]
      setDataNV(_data)

      let data1 = {
        graphs: [
          {
            balloonText: 'Văn bản đến trong tháng [[category]]: <b>[[value]]</b>',
            fillAlphas: 0.9,
            lineAlpha: 0.2,
            title: '',
            type: 'column',
            valueField: 'value1',
          },
          {
            balloonText: 'Văn bản đi trong tháng [[category]]: <b>[[value]]</b>',
            fillAlphas: 0.9,
            lineAlpha: 0.2,
            title: '',
            type: 'column',
            valueField: 'value2',
          },
        ],
        items: [
          {category: '8/2022', value1: 0, value2: 3},
          {category: '7/2022', value1: 19, value2: 13},
          {category: '6/2022', value1: 4, value2: 9},
          {category: '5/2022', value1: 15, value2: 4},
          {category: '4/2022', value1: 1, value2: 1},
          {category: '3/2022', value1: 184, value2: 110},
        ],
      }
      let dataBar = []
      let cateBar = []
      data1?.graphs?.map((j, index) => {
        dataBar.push({
          name: j?.balloonText?.replace('[[category]]: <b>[[value]]</b>', ''),
          code: j.valueField,
          data: [],
          color: CONFIG.COLORS[index],
        })
      })
      data1?.items?.map((h) => {
        cateBar.push(h.category)
        dataBar.map((k) => {
          let _field = k.code
          let _val = h[_field]
          k.data.push(_val)
        })
      })
      const chartOptions = getColumnSSChart(dataBar, cateBar)
      setDataBDNV(chartOptions)
      setLoading(false)
    }
    fetchData()

    return () => {}
  }, [])

  return (
    <div className='col-xl-12'>
      <Skeleton loading={loading} paragraph={{rows: 8}}>
        <div className='row'>
          <div className='col-xl-8'>
            <div className='card shadow-sm mt-3' id='QLVB-SLVBDI'>
              <div className='p-0 rounded-0 border-0 card-header'>
                <h3 className='card-title fw-normal text-primary fs-4 px-4'>
                  QLVB - Số lượng văn bản đến đi cơ quan
                </h3>
              </div>
              <div className='card-body p-4 px-xl-6 pt-xl-0'>
                <div className='align-items-center'>
                  <div className='highchart-nv'>
                    <HighchartsReact
                      containerProps={{style: {height: 298}}}
                      highcharts={Highcharts}
                      options={dataBDNV}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-xl-4'>
            <div className='row'>
              {dataNV?.map((j, index1) => (
                <div className={`col-xl-6 col-md-6 mt-${index1 < 2 ? 3 : 6}`} key={index1}>
                  <Link
                    className='card card-stretch shadow-sm cursor-pointer bg-hover-light-primary'
                    role='button'
                    to='/'
                  >
                    <div className='card-body p-6 text-center'>
                      <span className='bg-opacity-25 mb-2 bg-primary rounded-circle mx-auto h-35px h-xxl-50px w-35px w-xxl-50px d-flex align-items-center justify-content-center'>
                        <span className='svg-icon svg-icon-3x svg-icon-success'>
                          <span className='svg-icon fs-2 text-primary fad fs-2x fa-comments-alt fa-fw'></span>
                        </span>
                      </span>
                      <CountUp className='text-primary fs-1 fw-bold' end={j.Number} duration={1} />
                      <p className='m-0 mt-2 text-gray-600 fs-6 text-1line' title={j.Name}>
                        PAHT - {j.Name}
                      </p>
                    </div>
                  </Link>
                </div>
              )) ?? ''}
            </div>
          </div>
        </div>
      </Skeleton>
    </div>
  )
}

export {Widget1}
