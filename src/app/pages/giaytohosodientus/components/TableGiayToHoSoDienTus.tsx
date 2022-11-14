import React, {useState,useEffect} from 'react'
import {Popconfirm} from 'antd'
import { TableList } from '../../../components'
import {CONFIG} from '../../../../helpers/config';
import { requestPOST_URL } from '../../../../helpers/baseAPI';
import ModalGiayToHoSoDienTuItem from './ModalGiayToHoSoDienTuItem';
import PageHearder from './PageHeader';
import ModalGiayToHoSoDienTuItem1 from './ModalGiayToHoSoDienTuItem1';
import ModalGiayToHoSoDienTuItem2 from './ModalGiayToHoSoDienTuItem2';
const TableGiayToHoSoDienTus = (props:any) => {
    const getThaoTac = (record:any, lstAction: any = [])=>{
        return(
            <div>
                {lstAction.map((actionItem:any)=>{
                    if(actionItem== "btnView"){
                        return (<a
                                    className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1 mb-1'
                                    data-toggle='m-tooltip'
                                    title='Xem chi tiết'
                                    onClick={() => {
                                        handleItem(record,"view");
                                    }}
                                >
                                <i className='fa fa-eye'></i>
                            </a>)
                    }else if(actionItem== "btnEdit"){
                        return ( <a
                            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1 mb-1'
                            data-toggle='m-tooltip'
                            title='Sửa'
                            onClick={() => {
                                handleItem(record,"edit");
                            }}
                            >
                            <i className='fa fa-edit'></i>
                        </a>)
                    }
                })}
              
                
               
            </div>
        )
    }
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
        props.lstAction ? {
            title: 'Thao tác',
            dataIndex: '',
            key:'action',
            width:'10%',
            render:(text:string,record:any) =>{
                return(
                   getThaoTac(record,props.lstAction)
                )
            }
        }:null
    ]
    const [dataTable, setDataTable] = useState([{}]);
    const [detailItem, setDetailItem] = useState({})
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible1, setModalVisible1] = useState(false);
    useEffect(()=>{
        getDataCategories(props.searchData);
    },[])
    const handleItem = (record: any, action:string = "view")=>{
        if(record) {
            setDetailItem(record);
        }  
        setModalAction(action);
        setModalVisible(!modalVisible);
    }
    const getDataCategories = (data:any = {})=>{
        var url = `${CONFIG.BASE_DBHSDT_URL}/giaytohosodientus/search`;
        requestPOST_URL(url,data).then(res=>{
            if(res?.data){
                setDataTable(res?.data);
            }
        })
      
    }
    return(<div>
        <PageHearder title="Danh sách giấy tờ" 
            action={props.action}
            onClickThemMoi={()=>{
                setDetailItem({});
                handleItem(null,"add")}}     
            onClickThemMoiTuDs={()=>{
                setModalVisible1(true)
                }}  

                />
           
                    
        <div className='card-body card-dashboard px-3 py-3'>
            <div className='card-dashboard-body table-responsive'>
                <TableList 
                    dataTable = {dataTable}
                    columns = {column}
                    isPagination ={true}
                />
            </div>
        </div>
       
        {modalVisible && <ModalGiayToHoSoDienTuItem1 modalVisible= {modalVisible} setModalVisible= {setModalVisible} data={detailItem} reRenderTable = {(searchData:any)=>getDataCategories(searchData)} action={modalAction}/>}
        {modalVisible1 && <ModalGiayToHoSoDienTuItem2 modalVisible= {modalVisible1} setModalVisible= {setModalVisible1} data={{...detailItem,hoSoDienTuId: props?.data?.hoSoDienTuId}} reRenderTable = {getDataCategories} action={modalAction}/>}        
    
    </div>)
}

export default TableGiayToHoSoDienTus;