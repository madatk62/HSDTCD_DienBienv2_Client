import axios from 'axios'

import { CONFIG } from './config'

export const requestGET = async (URL) => {
  try {
    const res = await axios({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${CONFIG.GETWAY_TOKEN}`,
      },
      url: `${CONFIG.GETWAY_URL}/${URL}`,
    })
    return res.data
  } catch (error) {
    return null
  }
}

export const requestPOST = async (URL, data) => {
  try {
    const res = await axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${CONFIG.GETWAY_TOKEN}`,
      },
      url: `${CONFIG.GETWAY_URL}/${URL}`,
      data,
    })

    return res.data
  } catch (error) {
    return null
  }
}

export const requestGET_CHAT = async (URL) => {
  try {
    const res = await axios({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      url: `${CONFIG.CHAT_URL}/${URL}`,
    })
    return res.data
  } catch (error) {
    return null
  }
}

export const requestGET_URL = async (URL) => {
  try {
    const res = await axios({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      url: URL,
    })
    return res.data
  } catch (error) {
    return null
  }
}
export const requestPOST_URLDanhMuc = async (URL, data) => {
  try {
    const res = await axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'tenant':'root',
        Authorization: `Bearer ${CONFIG.GETWAY_TOKEN_DienBien}`
        //   Authorization: `Bearer ${CONFIG.GETWAY_TOKEN}`,
        // "Access-Control-Allow-Origin":"*",
        // 'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
      },
      url: URL,
      data,
    })

    return res.data
  } catch (error) {
    return null
  }
}
export const requestPOST_URL = async (URL, data) => {
  try {
    const res = await axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'tenant':'root',
        Authorization: `Bearer ${CONFIG.SECURITY_TOKEN}`
        //   Authorization: `Bearer ${CONFIG.GETWAY_TOKEN}`,
        // "Access-Control-Allow-Origin":"*",
        // 'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
      },
      url: URL,
      data,
    })

    return res.data
  } catch (error) {
    return null
  }
}
export const requestPOST_DanhMuc= async (URL, data) => {
  try {
    const res = await axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'tenant':'root',
         Authorization: `Bearer ${CONFIG.GETWAY_TOKEN_DienBien}`
        //   Authorization: `Bearer ${CONFIG.GETWAY_TOKEN}`,
        // "Access-Control-Allow-Origin":"*",
        // 'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
      },
      url: URL,
      data,
    })

    return res.data
  } catch (error) {
    return null
  }
}
export const requestPOST_ASP = async (URL, data) => {
  try {
    return new Promise((resolve,reject)=>{
      axios({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8', 
          'Accept': 'application/json', 
          // 'tenant':'root',
          Authorization: `Bearer ${CONFIG.SECURITY_TOKEN}`
          //   Authorization: `Bearer ${CONFIG.GETWAY_TOKEN}`,
          //  "Access-Control-Allow-Origin":"*",
          //  'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
        },
        url: URL,
        data: JSON.stringify(data),
      }).then(res=> resolve(res))
        .catch(err=> reject(err));
  
    })

  } catch (error) {
    return null
  }
}
export const requestDELETE_ASP = async (URL, data= null) => {
  try {
    return new Promise((resolve,reject)=>{
      axios({
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json; charset=utf-8', 
          'Accept': 'application/json', 
          // 'tenant':'root',
          Authorization: `Bearer ${CONFIG.SECURITY_TOKEN}`
          //   Authorization: `Bearer ${CONFIG.GETWAY_TOKEN}`,
          //  "Access-Control-Allow-Origin":"*",
          //  'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
        },
        url: URL
      }).then(res=> resolve(res))
        .catch(err=> reject(err));
  
    })

  } catch (error) {
    return null
  }
}
export const request_UploadFile = async (URL, data) => {
  try {
    return new Promise((resolve,reject)=>{
      axios({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'tenant':'root',
          // Authorization: `Bearer ${CONFIG.SECURITY_TOKEN}`
             Authorization: `Bearer ${CONFIG.GETWAY_TOKEN_DienBien}`,
          // "Access-Control-Allow-Origin":"*",
          // 'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
        },
        url: URL,
        data,
      }).then(res=> resolve(res))
        .catch(err=> reject(err));
  
    })

  } catch (error) {
    return null
  }
}
export const requestPUT_URL = async (URL, data) => {
  try {
    const res = await axios({
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'tenant':'root',
         Authorization: `Bearer ${CONFIG.SECURITY_TOKEN}`,
        // "Access-Control-Allow-Origin":"*",
        // 'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
      },
      url: URL,
      data,
    })

    return res.data
  } catch (error) {
    return null
  }
}
export const requestPOST2 = async (URL, data) => {
  try {
    const res = await axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      url: URL,
      data,
    })
    return res.data
  } catch (error) {
    return null
  }
}

export const requestPOSTFile_URL = async (URL, data) => {
  try {
    const res = await axios({
      method: 'POST',
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      url: URL,
      data,
    })

    return res.data
  } catch (error) {
    return null
  }
}

export const TextToSpeech = async (text) => {
  return await axios
    .post('https://texttospeech.googleapis.com/v1/text:synthesize?key=AIzaSyCN28YlRssZ7mJekiBspByo2wYDJ-AxtrM', {
      input: {
        text: text,
      },
      audioConfig: {
        audioEncoding: 'MP3',
      },
      voice: {
        languageCode: 'vi-VN',
        name: 'vi-VN-Standard-A',
        ssmlGender: 'FEMALE',
      },
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return null;
    });
}