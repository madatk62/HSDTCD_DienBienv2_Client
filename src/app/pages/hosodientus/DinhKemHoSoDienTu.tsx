import React from 'react';
import TableDinhKemHoSoDienTus from './components/TableDinhKemHoSoDienTus';
import {shallowEqual, useSelector} from 'react-redux'
import { RootState } from '../../../setup';
const DinhKemHoSoDienTus = (props:any) =>{
    const userInfor = useSelector<RootState>((auth) => auth.global.userInfo, shallowEqual) as any;
    const lstAction = ["btnView", "btnAddFile"]
    const searchData = { iDCongDan: userInfor.technicalId ? userInfor.technicalId : null,}
    return(<div className='card card-xl-stretch mb-xl-9'>
        <TableDinhKemHoSoDienTus lstAction= {lstAction} headerTitle = "Đính kèm hồ sơ điện tử"/>
    </div>)
}

export default DinhKemHoSoDienTus;