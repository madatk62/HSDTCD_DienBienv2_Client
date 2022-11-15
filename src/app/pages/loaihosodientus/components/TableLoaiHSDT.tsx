import React, {useState,useEffect} from 'react'
import {shallowEqual, useSelector} from 'react-redux'

import { TableList } from '../../../components'
import {CONFIG} from '../../../../helpers/config';
import { requestPOST_URL } from '../../../../helpers/baseAPI';
import ModalLoaiHSDT from './ModalLoaiHSDT';
import PageHearder from './PageHeader';
import {RootState} from '@setup/index'
const TableLoaiHSDT = (props:any) => {
    const userInfor = useSelector<RootState>((auth) => auth.global.userInfo, shallowEqual) as any;
    const [modalAction, setModalAction] = useState("");
    const [searchValue, setSearchValue] = useState({
        iDCongDan: userInfor.technicalId?userInfor.technicalId: ""
    });
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
            width:'10%',
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
    const handleItem = (record: any, action:string = "view")=>{
        if(record) {
            setDetailItem(record);
        }
        setModalAction(action);
        setModalVisible(!modalVisible);
    }
    const getDataCategories = (searchValue1:any = {})=>{
        var url = `${CONFIG.BASE_DBHSDT_URL}/loaihosodientus/search`;
        requestPOST_URL(url,searchValue1).then(res=>{
            
            
            if(res){
                setDataTable(res.data);
            }
        })
      
    }
    return(<div>
          <PageHearder title="Danh mục hồ sơ" onClickThemMoi={()=>{
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
        
        {modalVisible && <ModalLoaiHSDT modalVisible= {modalVisible} setModalVisible= {setModalVisible} data={detailItem} reRenderTable = {getDataCategories} action={modalAction}/>}
    </div>)
}

export default TableLoaiHSDT;