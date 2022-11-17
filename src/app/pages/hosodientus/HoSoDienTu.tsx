import React from 'react';
import TableHoSoDienTus1 from './components/TableHoSoDienTus1';
import {shallowEqual, useSelector} from 'react-redux'
import { RootState } from '../../../setup';
const HoSoDienTus = (props:any) =>{
    const userInfor = useSelector<RootState>((auth) => auth.global.userInfo, shallowEqual) as any;
    const lstAction = ["btnView", "btnEdit", 'btnDel']
    const searchData = { iDCongDan: userInfor.technicalId ? userInfor.technicalId : null,}
    return(<div className='card card-xl-stretch mb-xl-9'>
        <TableHoSoDienTus1 lstAction= {lstAction}/>
    </div>)
}

export default HoSoDienTus;