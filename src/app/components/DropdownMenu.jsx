import React, { useState, useEffect } from 'react'
import { Menu, Button, Space, DatePicker } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../setup/redux/global/Actions'
const { RangePicker } = DatePicker;

const DropdownMenu = ({id}) => {

  const dispatch = useDispatch()

  const [date, setDate] = useState([]);

  return (
    <div className='d-grid'>
      <span className='text-primary fw-bold'>Thao tác</span>
      <Button
        type='text'
        onClick={() => {
          
        }}
        className='text-gray-600 text-start fw-bold'
      ><i className='far fa-share-alt me-2'></i>Tạo công việc</Button>
    </div>
  )
}

export { DropdownMenu }