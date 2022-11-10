import React, {useState,useEffect} from 'react';
import { Modal,Button } from 'react-bootstrap-v5';
import { useFormik } from 'formik';
import * as yup from 'yup';
import clsx from 'clsx';
import {requestPOSTASP_URL,requestPUT_URL } from '../../../../../src/helpers/baseAPI';
import { Upload } from 'antd';
import { toast } from 'react-toastify';
// const base_url = "https://danhmuc.hanhchinhcong.net/_layouts/15/TD.CSDLChung.WCF/CSDLChungService.svc";

import {CONFIG} from '../../../../helpers/config';
var initValue = {
    maGiayTo: "",
    tenGiayTo: "",
   

}
const GiayToSchema = yup.object().shape({
    maGiayTo: yup.string().trim().required("Mã hồ sơ là bắt buộc"),
    tenGiayTo: yup.string().trim().required("Tên hồ sơ là bắt buộc"),
})
const ModalGiayToHoSoDienTuItem = (props: any) =>{
    const [isLoading, setIsLoading] = useState(false);
    const [fileUpload, setFileUpload] = useState([]);
    const [isDisableInput, setIsDisableInput] = useState(false);
    const handleSubmitForm = ()=>{
      var a = formik.handleSubmit();
    }
    const handleClose = () => props.setModalVisible(false);
    const handleShow = () => props.setModalVisible(true);
    const formik = useFormik({
        initialValues: initValue,
        validationSchema: GiayToSchema, 
        onSubmit: (values, {setStatus,setSubmitting})=>{
            setSubmitting(true);
            setIsLoading(true);
            
            if(props.action=="edit"){
                var putData= {
                    "id": props.data.id,
                    "maGiayTo": formik.values.maGiayTo,
                    "tenGiayTo": formik.values.tenGiayTo
               }
                var url =` ${CONFIG.BASE_DBHSDT_URL}/giaytohosodientus/${props.data.id}`;
                requestPUT_URL(url,putData).then(res=>{
                    toast.success("Cập nhật thành công");
                    setIsLoading(false);
                    setSubmitting(false);
                    props.setModalVisible(false);
                    props.reRenderTable()
                })
            }else if(props.action=="add"){
                var postData= {
                    "hoSoDienTuID" : "123",
                    "maGiayTo": formik.values.maGiayTo,
                    "tenGiayTo": formik.values.tenGiayTo,
                    "maHoSoDienTu": "",
                    "dinhKem": "consectetur"
               }
               var url =` ${CONFIG.BASE_DBHSDT_URL}/giaytohosodientus`;
               requestPOSTASP_URL(url,postData).then(res=>{
                    // if(res==200){
                    //     toast.success("Cập nhật thành công");
                    //     props.reRenderTable()
                    // }else{
                    //     toast.warning("Cập nhật thất bại");
                        
                        
                    // }
                    setIsLoading(false);
                    setSubmitting(false);
                    props.setModalVisible(false);
                   
                }).catch(err=>{
                    toast.warning("Cập nhật thất bại");
                    setIsLoading(false);
                    setSubmitting(false);
                    props.setModalVisible(false);
                })
            }          
        },
        onReset: (values, {setStatus, setSubmitting,setValues})=>{
            setValues(props.data);
        }
    })
    // init file Upload 
    useEffect(()=>{
        if(props.action == "view"){
            setIsDisableInput(true);
        }
        formik.setValues(props.data);
    },[])
    return(
    <form  className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
    noValidate
    id="file_category_detail_form"
    onSubmit={formik.handleSubmit}
    >
        <Modal
            fullscreen={'lg-down'}
            size='xl'
            onExited={handleClose}
            keyboard={true}
            scrollable={true}
            onEscapeKeyDown={handleClose}
            show = {props.modalVisible}
            backdrop="static"
        >
            <Modal.Header className='bg-primary px-4 py-3'>
            <Modal.Title className='text-white'>Chi tiết</Modal.Title>
                <button type='button' className='btn-close btn-close-white' aria-label='Close' onClick={handleClose}></button>
            </Modal.Header>
            <Modal.Body>
                <div className='row fv-row mb-7'>
                    <div className='col-xl-12 col-lg-12 col-md-12'>
                        <label className='form-label fw-bolder text-dark fs-6 required'>Mã hồ sơ</label>
                        <input 
                        placeholder='Mã giấy tờ'
                        type='text'
                        autoComplete = 'off'
                        disabled = {isDisableInput}
                        {...formik.getFieldProps('maGiayTo')}
                        className={clsx('form-control form-control-lg form-control-solid', 
                            {'is-invalid': formik.touched.maGiayTo && formik.errors.maGiayTo},
                            {
                            'is-valid': formik.touched.maGiayTo && !formik.errors.maGiayTo,
                            } )}

                        />
                        {
                        (formik.touched.maGiayTo && formik.errors.maGiayTo) &&
                        <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                            <span role='alert' className='text-danger'>{formik.errors.maGiayTo}</span>
                            </div>
                        </div>
                        }
                    </div>
                </div>
                <div className='row fv-row mb-7'>
                    <div className='col-xl-12 col-lg-12 col-md-12'>
                        <label className='form-label fw-bolder text-dark fs-6 required'>Tên hồ sơ</label>
                        <textarea 
                        placeholder='Tên giấy tờ'
                        rows={3}
                        disabled = {isDisableInput}
                        autoComplete = 'off'
                        {...formik.getFieldProps('tenGiayTo')}
                        className={clsx('form-control form-control-lg form-control-solid', 
                            {'is-invalid': formik.touched.tenGiayTo && formik.errors.tenGiayTo},
                            {
                            'is-valid': formik.touched.tenGiayTo && !formik.errors.tenGiayTo,
                            } )}

                        />
                        {
                        (formik.touched.tenGiayTo && formik.errors.tenGiayTo) &&
                        <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                            <span role='alert' className='text-danger'>{formik.errors.tenGiayTo}</span>
                            </div>
                        </div>
                        }
                    </div>
                
                </div>
            </Modal.Body>
            <Modal.Footer className='bg-light px-4 py-2 align-items-center'>
                <div className='d-flex justify-content-center  align-items-center'>
                <Button className='btn-sm btn-primary rounded-1 p-2  ms-2' 
                  onClick={handleSubmitForm}
                  type='submit'
                  disabled = {formik.isSubmitting || !formik.isValid}
                  hidden = {props.action == "view"? true: false}
                  >
                   { !isLoading?<span>
                        <i className='fa fa-save'></i>
                        {props.action == "add"? "Tạo mới": "Cập nhật"}
                    </span>
                    :<span className='indicator-progress' style={{display: 'block'}}>
                        {props.action == "add"? "Đang tạo mới... ": "Đang cập nhật..."} {" "} 
                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                    </span>}
                   
                </Button>
                </div>
                <div className='d-flex justify-content-center  align-items-center'>
                <Button className='btn-sm btn-secondary rounded-1 p-2  ms-2' onClick={handleClose}>
                    <i className='fa fa-times'></i>Đóng
                </Button>
                </div>
        </Modal.Footer>
        </Modal>
        </form>)
}
export default ModalGiayToHoSoDienTuItem;