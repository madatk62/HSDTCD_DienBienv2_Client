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
// import { useHistory } from "react-router-dom";
import {Skeleton} from 'antd'

const Widget3 = () => {
  //   const history = useHistory()

  const [loading, setLoading] = useState(true)
  const [dataBDNV, setDataBDNV] = useState([])
  const [dataVBCD, setDataVBCD] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      let data1 = [
        {category: 'Chưa thực hiện', value: 4},
        {category: 'Đang thực hiện', value: 26},
        {category: 'Đã thực hiện', value: 12},
      ]
      let dataPie = []
      data1.map((h) => {
        dataPie.push({
          name: h?.category ?? '',
          y: h?.value ?? 0,
        })
      })
      let chartOptions = getPieChart(dataPie)
      setDataBDNV(chartOptions)

      let data3 = [
        {category: 'Chưa thực hiện', value: 264},
        {category: 'Đang thực hiện', value: 104},
        {category: 'Đã thực hiện', value: 71},
      ]
      let dataPie3 = []
      data3.map((h) => {
        dataPie3.push({
          name: h?.category ?? '',
          y: h?.value ?? 0,
        })
      })
      let chartOptions3 = getPieChart(dataPie3)
      setDataVBCD(chartOptions3)
      setLoading(false)
    }
    fetchData()

    return () => {}
  }, [])

  return (
    <div className='col-xl-8'>
      <Skeleton loading={loading} paragraph={{rows: 15}}>
        <div className='card shadow-sm mt-6'>
          <div className='row'>
            <div className='col-xl-6 border-end border-gray-30'>
              <div className='p-0 rounded-0 border-0 card-header'>
                <h3 className='card-title fw-normal text-primary fs-4 px-4'>
                  CDDH - Văn bản chỉ đạo
                </h3>
              </div>
              <div className='card-body p-4 px-xl-6 pt-xl-0'>
                <div className='align-items-center'>
                  <div className='highchart-nv'>
                    <HighchartsReact
                      containerProps={{style: {height: 298}}}
                      highcharts={Highcharts}
                      options={dataVBCD}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='col-xl-6 border-end border-gray-30'>
              <div className='p-0 rounded-0 border-0 card-header'>
                <h3 className='card-title fw-normal text-primary fs-4 px-4'>
                  CDDH - Theo dõi nhiệm vụ
                </h3>
              </div>
              <div className='card-body p-4 px-xl-6 pt-xl-0'>
                <div className='align-items-center'>
                  <div className='highchart-nv'>
                    <HighchartsReact
                      containerProps={{style: {height: 300}}}
                      highcharts={Highcharts}
                      options={dataBDNV}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Skeleton>
    </div>
  )
}

export {Widget3}
