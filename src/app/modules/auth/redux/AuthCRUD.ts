import axios from 'axios'
import {AuthModel} from '../models/AuthModel'
import {UserModel} from '../models/UserModel'
import { CONFIG } from '../../../../helpers/config'
const API_URL = (process.env.NODE_ENV === 'production') ?"":"https://localhost:5001"//process.env.REACT_APP_API_URL || 'api'

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/auth/get-user`
export const LOGIN_URL = `${API_URL}/api/tokens`
export const REGISTER_URL = `${API_URL}/api/users/self-register`
export const REQUEST_PASSWORD_URL = `${API_URL}/api/users/self-register`
export const GET_USER_BY_USERNAME_URL = `${API_URL}/api/users`
// Server should return AuthModel
export function login(username: string, password: string):Promise<any> {
 return new Promise((resolve,reject)=>{
    axios({
      url: LOGIN_URL,
      method: "POST",
      headers:{ 
        "Accept":"Application/json",
        "Content-type": "Application/json",
        "Tenant":"root",
        "Access-Control-Allow-Origin":"*",
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
      },
      data: {
        userName: username,
        password: password
      }
    }).then( (res)=>{
        resolve(res.data);
    })
      .catch(err=>reject(err.response.data))
 })
}

// Server should return AuthModel
export function register(body: any) {
  // return axios.post<AuthModel>(REGISTER_URL, {
  //   email,
  //   firstname,
  //   lastname,
  //   password,
  // })
  return  new Promise((resolve,reject )=>{
    axios({
    url: REGISTER_URL,
    method:"POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Tenant': 'root',
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      // 'Authorization': `Bearer ${CONFIG.TOKEN_DEMO}`,
    },
    data: body
   }).then(res=>{
      resolve(res);
   }).catch(err=>{
    reject(err.response.data)} )
  })
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.post<{result: boolean}>(REQUEST_PASSWORD_URL, {email})
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  // Check common redux folder => setupAxios
  return axios.get<UserModel>(GET_USER_BY_ACCESSTOKEN_URL)
}

export function getUserByUserName(username:string) {
  // Authorization head should be fulfilled in interceptor.
  // Check common redux folder => setupAxios
  return  new Promise((resolve,reject )=>{
    // var userName = localStorage.getItem('account');
    var url = `${GET_USER_BY_USERNAME_URL}/${username}`
    axios({
    url:url ,
    method:"GET",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Tenant': 'root',
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      // 'Authorization': `Bearer ${CONFIG.TOKEN_DEMO}`,
      Authorization: `Bearer ${CONFIG.SECURITY_TOKEN}`,
    },
   }).then(res=>{
      resolve(res.data);
   }).catch(err=>{
    reject(err.response.data)} )
  })
}