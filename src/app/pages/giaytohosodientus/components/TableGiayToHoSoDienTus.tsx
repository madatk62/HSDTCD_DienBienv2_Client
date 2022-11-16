import React, {useState,useEffect} from 'react'
import {Popconfirm} from 'antd'
import {toast} from 'react-toastify'

import { TableList } from '../../../components'
import {CONFIG} from '../../../../helpers/config';
import { requestPOST_URL,requestDELETE_ASP } from '../../../../helpers/baseAPI';
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
                    } else
                    if(actionItem== "btnEdit"){
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
                    }else
                    if(actionItem== "btnDel"){
                        return ( <Popconfirm
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
                       </Popconfirm>)
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
            width:'15%',
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
    const handleItem = async (record: any, action:string = "view")=>{
        if(action == "delete"){
            var urlDel = `${CONFIG.BASE_DBHSDT_URL}/giaytohosodientus/${record.id}`
            const resDel = await requestDELETE_ASP(urlDel);
            if(resDel){
                toast.success("Xoá thành công");
                getDataCategories(props.searchData);
            }
        
        }else
        if(action == "addFromHSDT"){
                
           if(props?.data?.hoSoDienTuID){
            setDetailItem({
                hoSoDienTuID: props?.data?.hoSoDienTuID ? props?.data?.hoSoDienTuID : null
            });
            setModalAction("add");
            setModalVisible(!modalVisible);
           }else{
            toast.warning("Lưu thông tin hồ sơ trước")
           }
          
           
        }else
        {   if(action == "add"){
                setDetailItem({
                    hoSoDienTuID: props?.data?.hoSoDienTuID ? props?.data?.hoSoDienTuID : null
                });
            }else
            
            if(action == "edit"){
                if(record) {
                    setDetailItem(record);
                }  
            }
            
            setModalAction(action);
            setModalVisible(!modalVisible);
         }
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
                if(props.action=='addFromHSDT'){
                    handleItem(null,"addFromHSDT")
                }else{
                    handleItem(null,"add")}
            }}
                 
            onClickThemMoiTuDs={()=>{
               
                if(props.action=='addFromHSDT'){
                    if(props?.data?.hoSoDienTuID){
                        setDetailItem({
                            hoSoDienTuID: props?.data?.hoSoDienTuID ? props?.data?.hoSoDienTuID : null
                        });
                        setModalAction("add");
                        setModalVisible1(!modalVisible1);
                       }else{
                        toast.warning("Lưu thông tin hồ sơ trước")
                       }
                }else{
                    setDetailItem({
                        hoSoDienTuID: props?.data?.hoSoDienTuID ? props?.data?.hoSoDienTuID : null
                    });
                    setModalVisible1(true);
                    setModalAction("add");
                }
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
       
        {modalVisible && <ModalGiayToHoSoDienTuItem1 modalVisible= {modalVisible} setModalVisible= {setModalVisible} data={detailItem} reRenderTable = {getDataCategories} action={modalAction} searchData= {props.searchData}/>}
        {modalVisible1 && <ModalGiayToHoSoDienTuItem2 modalVisible= {modalVisible1} setModalVisible= {setModalVisible1} data={detailItem} reRenderTable = {getDataCategories} action={modalAction} searchData= {props.searchData}/>}        
     
    </div>)
}

export default TableGiayToHoSoDienTus;