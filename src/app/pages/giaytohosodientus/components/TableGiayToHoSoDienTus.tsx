import React, {useState,useEffect} from 'react'
import {Popconfirm} from 'antd'
import { TableList } from '../../../components'
import {CONFIG} from '../../../../helpers/config';
import { requestPOST_URL } from '../../../../helpers/baseAPI';
import ModalGiayToHoSoDienTuItem from './ModalGiayToHoSoDienTuItem';
import PageHearder from '../../components/PageHeader';


const TableGiayToHoSoDienTus = (props:any) => {
    const [modalAction, setModalAction] = useState("");
    const column = [
        {
            title: 'Mã giấy tờ',
            dataIndex: 'maGiayTo',
            key: 'MaGiayTo',
        },
        {
            title: 'Tên giấy tờ',
            dataIndex: 'tenGiayTo',
            key: 'TenGiayTo'   
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
        getDataCategories();
    },[])
    const handleItem = (record: any, action:string = "view")=>{
        if(record) {
            setDetailItem(record);
        }  
        setModalAction(action);
        setModalVisible(!modalVisible);
    }
    const getDataCategories = ()=>{
        var url = `${CONFIG.BASE_DBHSDT_URL}/giaytohosodientus/search`;
        var Data ={
         }
        requestPOST_URL(url,Data).then(res=>{
            if(res.data){
                setDataTable(res.data);
            }
        })
      
    }
    return(<div>
        <PageHearder title="Danh mục hồ sơ" 
            onClickThemMoi={()=>{
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
       
        {modalVisible && <ModalGiayToHoSoDienTuItem modalVisible= {modalVisible} setModalVisible= {setModalVisible} data={detailItem} reRenderTable = {getDataCategories} action={modalAction}/>}
    </div>)
}

export default TableGiayToHoSoDienTus;