import React, {useState,useEffect} from 'react'
import {shallowEqual, useSelector, connect, useDispatch, ConnectedProps} from 'react-redux'

import { TableList } from '../../../components'
import {CONFIG} from '../../../../helpers/config';
import { requestPOST_URL } from '../../../../helpers/baseAPI';
import ModalFileCategoryItem from './ModalFileCategoryItem';
import PageHearder from '../../../pages/components/PageHeader';
import {RootState} from '../../../../setup'
const TableFileCategories = (props:any) => {
    const userInfor = useSelector<RootState>((auth) => auth.global.userInfo, shallowEqual) as any;
    
    const [modalAction, setModalAction] = useState("");
    const column = [
        {
            title: 'Tên',
            dataIndex: 'TenGiayTo',
            key: 'TenGiayTo'   
        },
        {
            title: 'Mã',
            dataIndex: 'MaGiayTo',
            key: 'MaGiayTo',
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
                            title='Xem chi tiết/Sửa'
                            onClick={() => {
                                handleItem(record);
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
            setModalAction(action);
        }
        setModalVisible(!modalVisible);
    }
    const getDataCategories = ()=>{
        var url = `${CONFIG.BASE_HSDT_URL}/GetDanhSachGiayToTheoIDCongDan`;
        console.log('====================================');
        console.log(userInfor);
        console.log('====================================');
        var Data = {
            idCongDan: userInfor.technicalId?userInfor.technicalId:"f4f98407-6170-4fe4-8a3c-ceacb394ad90"
        }
        requestPOST_URL(url,Data).then(res=>{
            if(res.error.code ==200){
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
        {modalVisible && <ModalFileCategoryItem modalVisible= {modalVisible} setModalVisible= {setModalVisible} data={detailItem} reRenderTable = {getDataCategories} action={modalAction}/>}
    </div>)
}

export default TableFileCategories;