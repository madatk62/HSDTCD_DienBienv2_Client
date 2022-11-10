import React, { useState, useEffect } from 'react'
import { Menu, Button, Space, DatePicker } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../setup/redux/global/Actions'
import moment from 'moment'
import { CONFIG } from '../../helpers/config'
import { requestPOST, requestPOST_URL } from '../../helpers/baseAPI'
import { getPieChart, getColumnChart, getColumnSSChart } from '../../helpers/utils'
const { RangePicker } = DatePicker;

const DropdownTime = ({ dataBD, setDataBD, id, type, title, path }) => {

  const accessToken = useSelector((state) => state.global.accessToken)

  const dispatch = useDispatch()

  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = async (reset) => {
    setLoading(true)
    let _type = type
    let _url = _type === "tron" ? "LayDuLieuBieuDoTron" : _type === "cot" ? "LayDuLieuBieuDoCot" : _type === "cotSoSanh" ? "LayDuLieuBieuDoCotSoSanh" : ""
    let body = {
      token: accessToken,
      function: id,
      fromDate: reset ? '' : fromDate,
      toDate: reset ? '' : toDate
    }
    let res = await requestPOST(path + '/' + _url, body)
    let data1 = res?.data ?? []
    let _itemChart = {}
    if (data1) {
      if (_type === "tron") {
        let dataPie = []
        data1.map(h => {
          dataPie.push({
            name: h?.category ?? '',
            y: h?.value ?? 0
          })
        })
        let chartOptions = getPieChart(dataPie)
        _itemChart = { title: title, chartOptions: chartOptions, id: id, type: type }
      }
      if (_type === "cot") {
        let dataBar = []
        let cateBar = []
        data1.map(h => {
          dataBar.push(h.value)
          cateBar.push(h.category)
        })
        const chartOptions = getColumnChart(dataBar, cateBar)
        _itemChart = { title: title, chartOptions: chartOptions, id: id, type: type }
      }
      if (_type === "cotSoSanh" && data1?.items) {
        let dataBar = []
        let cateBar = []
        data1?.graphs?.map((j, index) => {
          dataBar.push({ name: j?.balloonText?.replace("[[category]]: <b>[[value]]</b>", ""), code: j.valueField, data: [], color: CONFIG.COLORS[index] })
        })
        data1?.items?.map(h => {
          cateBar.push(h.category)
          dataBar.map((k) => {
            let _field = k.code
            let _val = h[_field]
            k.data.push(_val)
          })
        })
        const chartOptions = getColumnSSChart(dataBar, cateBar)
        _itemChart = { title: title, chartOptions: chartOptions, id: id, type: type }
      }
      var _arr = [...dataBD]
      _arr.map(k => {
        if (k.id === id) {
          k.chartOptions = _itemChart.chartOptions
        }
      })
      setDataBD(_arr)
    }
    setLoading(false)
  }

  const handleChangeKTXH = async (reset) => {
    setLoading(true)
    let body = {
      token: accessToken,
      period: "Y",
    }
    let res = await requestPOST(CONFIG.KTXH_PATH + '/rptstats/received-by-ous', body)
    let data3 = res?.data ?? []
    let _dataBar = []
    let cateBar = []
    data3.map((h) => {
      _dataBar.push(h?.Value)
      cateBar.push(h?.Info?.Name)
    })
    let dataBar = [
      {
        name: 'Số lượng',
        data: _dataBar,
      }
    ]
    const chartOptions1 = getColumnSSChart(dataBar, cateBar)
    let _itemChart = { title: 'Biểu đồ nhận báo cáo theo đơn vị cấp dưới', chartOptions: chartOptions1, id: 'KTXH_BCDVCD' }
    var _arr = [...dataBD]
    _arr.map(k => {
      if (k.id === id) {
        k.chartOptions = _itemChart.chartOptions
      }
    })
    setDataBD(_arr)
    setLoading(false)
  }

  const handleChangeKTXH_BCCQ = async (reset) => {
    setLoading(true)
    let body = {
      token: accessToken,
      getCount: true,
      fromDate: reset ? '' : fromDate,
      toDate: reset ? '' : toDate
    }
    let _data = []

    let res1 = await requestPOST(CONFIG.KTXH_PATH + '/rptstats/ou-reporting-tmpls', body)
    let data3 = res1?.total ?? 0
    _data.push({
      "title": "Tổng số lượng",
      "value": data3
    })

    let res2 = await requestPOST(CONFIG.KTXH_PATH + '/rptstats/ou-sent', body)
    let data4 = res2?.total ?? 0

    _data.push({
      "title": "Đã hoàn thành",
      "value": data4
    })

    let data5 = data3 - data4

    _data.push({
      "title": "Đang xử lý",
      "value": data5
    })

    let dataPie = []
    _data.map(h => {
      dataPie.push({
        name: h?.title ?? '',
        y: h?.value ?? 0
      })
    })
    let chartOptions = getPieChart(dataPie)

    let _itemChart = { title: 'Biểu đồ báo cáo cơ quan', chartOptions: chartOptions, id: 'KTXH_BDBCCQ', type: 'tron' }
    var _arr = [...dataBD]
    _arr.map(k => {
      if (k.id === id) {
        k.chartOptions = _itemChart.chartOptions
      }
    })
    setDataBD(_arr)
    setLoading(false)
  }

  return (
    <div className='d-grid'>
      <span className='text-primary fw-bold'>Từ ngày</span>
      <DatePicker
        format='DD/MM/YYYY'
        placeholder='Từ ngày'
        style={{ width: '100%', marginTop: 5, marginBottom: 10 }}
        value={fromDate ? moment(fromDate, 'DD/MM/YYYY') : ''}
        onChange={(date, dateString) => {
          setFromDate(dateString)
        }}
      />
      <span className='text-primary fw-bold'>Đến ngày</span>
      <DatePicker
        format='DD/MM/YYYY'
        placeholder='Đến ngày'
        style={{ width: '100%', marginTop: 5, marginBottom: 10 }}
        value={toDate ? moment(toDate, 'DD/MM/YYYY') : ''}
        disabledDate={(d) => d.isBefore(moment(fromDate, 'DD/MM/YYYY'))}
        onChange={(date, dateString) => {
          setToDate(dateString)
        }}
      />

      <div className='d-flex align-items-center justify-content-center mt-2'>
        <a
          className='btn btn-primary btn-sm m-btn m-btn--icon py-2 me-1'
          onClick={() => {
            if (id === 'KTXH_BCDVCD') {
              handleChangeKTXH()
            }
            else if(id === 'KTXH_BDBCCQ'){
              handleChangeKTXH_BCCQ()
            }
            else {
              handleChange()
            }
          }}
        >
          <span>
            {loading ? <span className='spinner-border spinner-border-sm me-1'></span> : <i className='fas fa-search'></i>}
            <span className=''>Xem</span>
          </span>
        </a>
        <a
          className='btn btn-secondary btn-sm m-btn m-btn--icon py-2 ms-1'
          onClick={() => {
            setFromDate('')
            setToDate('')
            if (id === 'KTXH_BCDVCD') {
              handleChangeKTXH(true)
            }
            else if(id === 'KTXH_BDBCCQ'){
              handleChangeKTXH_BCCQ(true)
            }
            else {
              handleChange(true)
            }
          }}
        >
          <span>
            {loading ? <span className='spinner-border spinner-border-sm me-1'></span> : <i className='fas fa-sync'></i>}
            <span className=''>Xoá</span>
          </span>
        </a>
      </div>
    </div>
  )
}

export { DropdownTime }