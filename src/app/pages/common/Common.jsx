import React from 'react'
import {request_UploadFile} from '../../../../src/helpers/baseAPI'
import {CONFIG} from '../../../../src/helpers/config'
import {getBase64} from '../../../helpers/utils'
const getFileName = (fileUrl) => {
  var fileName = ''
  if (fileUrl.length > 0) {
    fileName = fileUrl.substring(fileUrl.lastIndexOf('/') + 1, fileUrl.length)
  }
  return fileName
}
const urlStringToFileList = (str, index) => {
  var fileName = getFileName(str)
  var res = {
    uid: index,
    name: fileName,
    url: `https://hosodientu.dienbien.gov.vn/${str}`,
    path: str,
  }
  return res
}
const getUrlDinhKem = async (files) => {
  var arrUrl = []
  var arrFilesNew = []
  await Promise.all(
    files.map(async (item) => {
      if (item.path) {
        arrUrl.push(item.path)
      } else {
        var url = await handleUploadFile(item)
        arrUrl.push(url)
      }
    })
  )
  var strUrl = arrUrl.join('##')
  return strUrl
}
const handleUploadFile = async (file) => {
  var uploadUrl = `${CONFIG.BASE_HSDT_URL}/UploadDinhKem`
  let tmp = await getBase64(file)
  tmp = tmp.substring(tmp.indexOf('base64,') + 7, tmp.length)
  var body = {
    Base64: tmp,
    Name: file.name,
    Type: 'GiayTo',
  }
  var res = await request_UploadFile(uploadUrl, body)
  if (res) {
    return res.data.data
  }
}
// const handleUploadFiles = async (fileUpload) => {
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
//     return strUrl
//   }
// }
export {getFileName, getUrlDinhKem, urlStringToFileList}
