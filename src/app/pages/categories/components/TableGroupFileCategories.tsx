import React, {useState,useEffect} from 'react'
import {Popconfirm} from 'antd'
import {toast} from "react-toastify"
import {shallowEqual, useSelector} from 'react-redux'

import { TableList } from '../../../components'
import {CONFIG} from '../../../../helpers/config';
import { requestPOST_URLDanhMuc,requestDELETE_ASP,requestPOST_DanhMuc } from '../../../../helpers/baseAPI';
import ModaGrouplFileCategoryItem from './ModaGrouplFileCategoryItem';
import PageHearder from '../../../pages/components/PageHeader';
import { RootState } from '@setup/index';

const TableGroupFileCategories = (props:any) => {
    const userInfor = useSelector<RootState>((auth) => auth.global.userInfo, shallowEqual) as any
    const [modalAction, setModalAction] = useState("");
    const column = [
        {
            title: 'Mã',
            dataIndex: 'Ma',
            key: 'Ma',
        },
        {
            title: 'Tên',
            dataIndex: 'Ten',
            key: 'Ten'   
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
        getDataCategories();
    },[])
    const handleItem = async(record: any, action:string = "view")=>{
        if(action == "delete"){
            var urlDel = ` ${CONFIG.BASE_HSDT_URL}/XoaDuLieuNhomGT`
            var delData = { 
                ID: record.ID
            }
           
            
            requestPOST_DanhMuc(urlDel, delData).then((res) => {
                toast.success('Xoá thành công');
                getDataCategories();
            })
        }else{
            if(record) {
                setDetailItem(record);
            }
            setModalAction(action);
            setModalVisible(!modalVisible);
        }    
    }
    const getDataCategories = ()=>{
        var url = `${CONFIG.BASE_HSDT_URL}/DanhSachNhomGiayTo`;
        var Data ={
            "draw": 1,
           "columns": [],
           "Active":true,
           "order": [],
           "start": 0,
           "length": 100,
           "search": {
             "value": "",
             "regex": false
           },
           "IDCongDan" : userInfor.technicalId ? userInfor.technicalId : null 
         }
         requestPOST_URLDanhMuc(url,Data).then(res=>{
            if(res.error.code ==200){
                setDataTable(res.data.data);
            }
        })
      
    }
    return(<div>
         <PageHearder title="Danh sách nhóm giấy tờ" onClickThemMoi={()=>{
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
       
        {modalVisible && <ModaGrouplFileCategoryItem modalVisible= {modalVisible} setModalVisible= {setModalVisible} data={detailItem} reRenderTable = {getDataCategories} action={modalAction}/>}
    </div>)
}

export default TableGroupFileCategories;