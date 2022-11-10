import _ from 'lodash'
import moment from 'moment'
import {CONFIG} from './config'

const reg =
  /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/
export const isUrl = (path) => reg.test(path)

export const handleImage = (values, URL) => {
  const arr = _.without(_.split(values, '##'), '')
  let res = []
  arr.forEach((i) => {
    res.push({
      url: !(i.includes('https://') || i.includes('http://')) ? URL + i : i,
      path: i,
    })
  })
  return res
}

export const convertImage = (array) => {
  var temp = []
  array.forEach((element) => {
    temp = _.concat(temp, element?.response?.data[0]?.url ?? element.path)
  })
  var res = _.uniq(temp).join('##')
  return res
}

export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}
export const convertISOString = (value, format) => {
  var num = moment(value, format).format('X')
  var timestamp = Number(num) * 1000 + 25200000
  var time = moment(timestamp).toISOString()
  return time
}

export const creatCode = () => {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
  )
}

export const getAccount = (str) => {
  var _strArr = str.split('|')
  if (_strArr && _strArr.length > 0) return _strArr[_strArr.length - 1]
  return str
}
export const ToSlug = (str) => {
  if (str) {
    str = str.replace(/^\s+|\s+$/g, '')
    str = str.toLowerCase()
    var from = 'àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ·/_,:;'
    var to = 'aaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyyd------'
    for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
    }
    str = str
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
  }
  return str
}
export const capitalizeWord = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
export const getPieChart = (dataPie) => {
  let isBig = window.innerWidth > 1440
  let chartOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: null,
    },
    tooltip: {
      pointFormat: '{name} (<b>{point.percentage:.1f}%</b>)',
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        innerSize: '50%',
        dataLabels: {
          enabled: true,
          format: '{point.percentage:.1f} %',
          distance: -38,
          style: {
            fontSize: '14px',
            textOutline: false,
            fontWeight: '500',
            fontFamily: 'roboto',
            color: '#fff',
            textShadow: '1px 1px 0 rgba(0,0,0,0.3)',
          },
        },
        showInLegend: true,
        slicedOffset: 10,
        colors: CONFIG.COLORS,
      },
    },
    legend: isBig
      ? {
          enabled: true,
          floating: false,
          borderWidth: 0,
          align: 'right',
          layout: 'vertical',
          verticalAlign: 'middle',
          itemMarginTop: 0,
          itemMarginBottom: 0,
          itemStyle: {
            lineHeight: '30px',
            fontSize: '14px',
            fontFamily: 'Roboto',
          },
          useHTML: true,
          labelFormat:
            '<span style="display:flex; margin-top:-7px; position:relative; width:130px;border-bottom:1px solid #DCDCDC;">&nbsp<span style="font-weight:normal; vertical-align:super; max-width: 100px; overflow: hidden;text-overflow: ellipsis">{name}</span> <b className="fw-bolder" style="vertical-align:super; position:absolute; right:0px;">{y}</b></span><br/>',
        }
      : {
          enabled: true,
          floating: false,
          borderWidth: 0,
          align: 'center',
          layout: 'horizontal',
          verticalAlign: 'bottom',
          itemMarginTop: 0,
          itemMarginBottom: 0,
          padding: 0,
          margin: 0,
          itemStyle: {
            lineHeight: '30px',
            fontSize: '14px',
            fontFamily: 'Roboto',
            height: '30px',
          },
          useHTML: true,
          labelFormat:
            '<span style="display:block; margin-top:-5px; position:relative">&nbsp<span style="font-weight:normal">{name}</span></span><br/>',
        },
    credits: {
      enabled: false,
    },
    series: [
      {
        colorByPoint: true,
        borderWidth: 0,
        data: dataPie,
        type: 'pie',
        name: 'Số lượng',
      },
    ],
  }
  return chartOptions
}

export const getColumnChart = (dataBar, cateBar) => {
  let chartOptions = {
    chart: {
      type: 'bar',
      backgroundColor: 'rgba(0,0,0,0)',
    },
    title: {
      text: null,
    },
    xAxis: {
      categories: cateBar,
    },
    yAxis: {
      title: null,
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: false,
        },
        color: '#19AADE',
      },
      series: {
        cursor: 'pointer',
      },
    },
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    series: [{data: dataBar}],
  }
  return chartOptions
}

export const getColumnSSChart = (dataBar, cateBar) => {
  let chartOptions = {
    chart: {
      type: 'column',
      backgroundColor: 'rgba(0,0,0,0)',
    },
    title: {
      text: null,
    },
    xAxis: {
      categories: cateBar,
    },
    yAxis: {
      title: null,
    },
    plotOptions: {
      column: {
        dataLabels: {
          enabled: false,
        },
      },
      series: {
        cursor: 'pointer',
      },
    },
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    series: dataBar,
  }
  return chartOptions
}

export const getOperatingSystem = (window) => {
  let operatingSystem = 'Not known'
  if (window.navigator.appVersion.indexOf('Win') !== -1) {
    operatingSystem = 'Windows OS'
  }
  if (window.navigator.appVersion.indexOf('Mac') !== -1) {
    operatingSystem = 'MacOS'
  }
  if (window.navigator.appVersion.indexOf('X11') !== -1) {
    operatingSystem = 'UNIX OS'
  }
  if (window.navigator.appVersion.indexOf('Linux') !== -1) {
    operatingSystem = 'Linux OS'
  }

  return operatingSystem
}
export const getBrowser = (window) => {
  let currentBrowser = 'Not known'
  if (window.navigator.userAgent.indexOf('Chrome') !== -1) {
    currentBrowser = 'Google Chrome'
  } else if (window.navigator.userAgent.indexOf('Firefox') !== -1) {
    currentBrowser = 'Mozilla Firefox'
  } else if (window.navigator.userAgent.indexOf('MSIE') !== -1) {
    currentBrowser = 'Internet Exployer'
  } else if (window.navigator.userAgent.indexOf('Edge') !== -1) {
    currentBrowser = 'Edge'
  } else if (window.navigator.userAgent.indexOf('Safari') !== -1) {
    currentBrowser = 'Safari'
  } else if (window.navigator.userAgent.indexOf('Opera') !== -1) {
    currentBrowser = 'Opera'
  } else if (window.navigator.userAgent.indexOf('Opera') !== -1) {
    currentBrowser = 'YaBrowser'
  } else {
    console.log('Others')
  }

  return currentBrowser
}
