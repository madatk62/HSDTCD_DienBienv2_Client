import React from 'react';
import {shallowEqual, useSelector} from 'react-redux'

import TableGiayToHoSoDienTus from './components/TableGiayToHoSoDienTus';


import { RootState } from '../../../setup';
const GiayToHoSoDienTus = (props:any) =>{
    const userInfor = useSelector<RootState>((auth) => auth.global.userInfo, shallowEqual) as any;
    const lstAction = ["btnView", "btnEdit"]
    const searchData = { iDCongDan: userInfor.technicalId ? userInfor.technicalId : null,}
    return(<div className='card card-xl-stretch mb-xl-9'>
        <TableGiayToHoSoDienTus lstAction= {lstAction} searchData = {searchData}/>
    </div>)
}

export default GiayToHoSoDienTus;