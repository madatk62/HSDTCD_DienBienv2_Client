/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import '../index.scss'
import moment from 'moment'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import {CONFIG} from '../../../../helpers/config'
import {requestPOST, requestGET} from '../../../../helpers/baseAPI'
import {getPieChart} from '../../../../helpers/utils'
import CountUp from 'react-countup'
import {Skeleton} from 'antd'
import {Link} from 'react-router-dom'
// import { useHistory } from "react-router-dom";

const Widget2 = () => {
  // const history = useHistory();

  const [loading, setLoading] = useState(true)
  const [dataNV, setDataNV] = useState([])

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

      setLoading(false)
      // end::data PAHT
    }
    try {
      fetchData()
    } catch (error) {}

    return () => {}
  }, [])

  return (
    <div className='col-xl-4'>
      <Skeleton loading={loading} paragraph={{rows: 15}}>
        <div className='row'>
          {dataNV?.map((j, index1) => (
            <div className='col-xl-6 col-md-6 mt-6' key={index1}>
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
      </Skeleton>
    </div>
  )
}

export {Widget2}
