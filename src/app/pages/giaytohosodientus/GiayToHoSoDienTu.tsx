import React from 'react';
import TableGiayToHoSoDienTus from './components/TableGiayToHoSoDienTus';
const GiayToHoSoDienTus = (props:any) =>{
    const lstAction = ["btnView", "btnEdit"]
    return(<div className='card card-xl-stretch mb-xl-9'>
        <TableGiayToHoSoDienTus lstAction= {lstAction} />
    </div>)
}

export default GiayToHoSoDienTus;