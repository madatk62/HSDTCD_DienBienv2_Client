import React, {useState,useEffect} from 'react'
import {toast} from "react-toastify"
import {shallowEqual, useSelector} from 'react-redux'
import {Popconfirm} from 'antd'

import { TableList } from '../../../components'
import {CONFIG} from '../../../../helpers/config';
import { requestPOST_URL,requestDELETE_ASP } from '../../../../helpers/baseAPI';
import ModalNhomHSDT from './ModalNhomHSDT';
import PageHearder from './PageHeader';
import {RootState} from '@setup/index'
const TableNhomHSDT = (props:any) => {
    const userInfor = useSelector<RootState>((auth) => auth.global.userInfo, shallowEqual) as any;
    const [searchValue, setSearchValue] = useState({
        iDCongDan: userInfor.technicalId?userInfor.technicalId: ""
    });
    const [modalAction, setModalAction] = useState("");
    const column = [
        {
            title: 'Mã',
            dataIndex: 'ma',
            key: 'ma',
        },
        {
            title: 'Tên',
            dataIndex: 'ten',
            key: 'ten'   
        },
        {
            title: 'Thao tác',
            dataIndex: '',
            key:'action',
            width:'15%',
            render:(text:string,record:any) =>{
                return(
                    <div>
                        <a
                            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1 mb-1'
                            data-toggle='m-tooltip'
                            title='Xem chi tiết'
                            onClick={() => {
                                handleItem(record,"view");
                            }}
                            >
                            <i className='fa fa-eye'></i>
                        </a>
                        <a
                            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1 mb-1'
                            data-toggle='m-tooltip'
                            title='Sửa'
                            onClick={() => {
                                handleItem(record,"edit");
                            }}
                            >
                            <i className='fa fa-edit'></i>
                        </a>
                        <Popconfirm
                             title='Bạn có chắc chắn muốn xoá?'
                             onConfirm={() => {
                                handleItem(record,"delete");
                              }}
                              okText='Xoá'
                              cancelText='Huỷ'
                        >
                            <a
                                className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1 mb-1'
                                data-toggle='m-tooltip'
                                title='xoá'
                                >
                                <i className='fa fa-trash'></i>
                            </a>    
                        </Popconfirm>
                    </div>
                )
            }
        }
    ]
    const [dataTable, setDataTable] = useState([{}]);
    const [detailItem, setDetailItem] = useState({})
    const [modalVisible, setModalVisible] = useState(false);
    useEffect(()=>{
        getDataCategories(searchValue);
    },[])
    const handleItem = async (record: any, action:string = "view")=>{
        if(action == "delete"){
           
            var urlDel = `${CONFIG.BASE_DBHSDT_URL}/nhomhosodientus/${record.id}`
            const resDel = await requestDELETE_ASP(urlDel);
            if(resDel){
                toast.success("Xoá thành công");
                getDataCategories(searchValue);
            }
        
        }else{
            if(record) {
                setDetailItem(record);
            }
            setModalAction(action);
            setModalVisible(!modalVisible);
        }
    }
    const getDataCategories = (searchValue:any = {})=>{
        var url = `${CONFIG.BASE_DBHSDT_URL}/Nhomhosodientus/search`;
        requestPOST_URL(url,searchValue).then(res=>{
            if(res){
                setDataTable(res.data);
            }
        })
      
    }
    return(<div>
          <PageHearder title="Danh sách nhóm hồ sơ" onClickThemMoi={()=>{
            setDetailItem({});
            handleItem(null,"add")}}/>
        <div className='card-body card-dashboard px-3 py-3'>
            <div className='card-dashboard-body table-responsive'>
                <TableList 
                    dataTable = {dataTable}
                    columns = {column}
                    isPagination ={true}
                />
            </div>
        </div>
        
        {modalVisible && <ModalNhomHSDT modalVisible= {modalVisible} setModalVisible= {setModalVisible} data={detailItem} reRenderTable = {getDataCategories} action={modalAction}/>}
    </div>)
}

export default TableNhomHSDT;