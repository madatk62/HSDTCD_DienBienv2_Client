import React from 'react';
import TableHoSoDienTus1 from './components/TableHoSoDienTus1';
import {shallowEqual, useSelector} from 'react-redux'
import { RootState } from '../../../setup';
const ThongKeHoSoDienTus = (props:any) =>{
    const userInfor = useSelector<RootState>((auth) => auth.global.userInfo, shallowEqual) as any;
    const lstAction = ["btnView"]
    const searchData = { iDCongDan: userInfor.technicalId ? userInfor.technicalId : null,}
    return(<div className='card card-xl-stretch mb-xl-9'>
        <TableHoSoDienTus1 lstAction= {lstAction} headerTitle = "Thống kê hồ sơ điện tử" from = "ThongKe"/>
    </div>)
}

export default ThongKeHoSoDienTus;