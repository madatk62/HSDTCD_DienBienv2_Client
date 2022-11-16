import React, {useState,useEffect} from 'react'
import {Popconfirm} from 'antd'
import {shallowEqual, useSelector, connect, useDispatch, ConnectedProps} from 'react-redux'

import { TableList } from '../../../components'
import {CONFIG} from '../../../../helpers/config';
import { requestPOST_URL, requestDELETE_ASP } from '../../../../helpers/baseAPI';
import ModalHoSoDienTuItem from './ModalHoSoDienTuItem';
import PageHearder from './PageHeader';
import { RootState } from '@setup/index';
import { toast } from 'react-toastify';
const TableHoSoDienTus = (props:any) => {
    const userInfor = useSelector<RootState>((auth) => auth.global.userInfo, shallowEqual) as any;
    const [modalAction, setModalAction] = useState("");
    const [searchValue, setSearchValue] = useState(
        {iDCongDan: userInfor?.technicalId? userInfor?.technicalId: ""}
    )
    const column = [
        // {
        //     title: 'Mã hồ sơ',
        //     dataIndex: 'maHoSo',
        //     key: 'MaHoSo',
        // },
        {
            title: 'Tên hồ sơ',
            dataIndex: 'tenHoSo',
            key: 'TenHoSo'   
        },
        {
            title: 'Tên thủ tục',
            dataIndex: 'tenThuTuc',
            key: 'TenThuTuc'   
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
    const [confirmModalVisible, setConfirmModalVisible] = useState(true);
    const [acceptedDeleteItem, setAcceptedDeleteItem] = useState(false);
    
    useEffect(()=>{
        getDataCategories({iDCongDan: userInfor?.technicalId? userInfor?.technicalId: ""});
    },[])
    useEffect(()=>{
        getDataCategories(searchValue);
    },[searchValue])
    const handleItem = async (record: any, action:string = "view")=>{
       
        if(action == "delete"){
           
            var urlDel = `${CONFIG.BASE_DBHSDT_URL}/hosodientus/${record.id}`
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
    const getDataCategories = (searchData:any  = {})=>{
        var url = `${CONFIG.BASE_DBHSDT_URL}/hosodientus/search`;
        var Data ={
         }
        requestPOST_URL(url,searchData).then(res=>{
            if(res?.data){
                setDataTable(res?.data);
            }
        })
      
    }
    return(<div>
        <PageHearder title="Danh mục hồ sơ" 
            onClickThemMoi={()=>{
                setDetailItem({});
                handleItem(null,"add")}}
            setSearchValue = {setSearchValue}    />
        <div className='card-body card-dashboard px-3 py-3'>
            <div className='card-dashboard-body table-responsive'>
                <TableList 
                    dataTable = {dataTable}
                    columns = {column}
                    isPagination ={true}
                />
            </div>
        </div>
        
        {modalVisible && <ModalHoSoDienTuItem modalVisible= {modalVisible} setModalVisible= {setModalVisible} data={detailItem} reRenderTable = {getDataCategories} action={modalAction}/>}
    </div>)
}

export default TableHoSoDienTus;