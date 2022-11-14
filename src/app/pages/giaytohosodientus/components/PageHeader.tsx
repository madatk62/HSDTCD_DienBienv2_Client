import * as React from 'react';
import { Button } from 'react-bootstrap-v5';

const PageHearder = (props:any) =>{
    return(
        <>
            <div className='px-3 py-3 border-bottom border-secondary border-bottom-solid d-flex align-items-center justify-content-between'>
                <h3 className='card-title fw-bold text-header-td fs-4 mb-0'>{props?.title ?? ''}</h3>
                {props.action != "view"&&<div className='align-items-center justify-content-between'>
                    <button className='btn btn-primary btn-sm m-btn m-btn--icon py-2 me-2' type='button' onClick={props.onClickThemMoi}>
                        <span>
                            <i className='fas fa-plus'></i>
                            <span className=''>Thêm mới</span>
                        </span>
                    </button>
                    <button className='btn btn-info btn-sm m-btn m-btn--icon py-2 me-2' type='button' onClick={props.onClickThemMoiTuDs}>
                        <span>
                            <i className='fas fa-plus'></i>
                            <span className=''>Thêm mới từ danh sách</span>
                        </span>
                    </button>
                </div>}
                
            </div>    
        </>
       
    )
}
export default PageHearder;