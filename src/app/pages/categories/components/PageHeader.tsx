import * as React from 'react';
import { Button } from 'react-bootstrap-v5';

const PageHearder = (props:any) =>{
    return(
        <>
            <div className='px-3 py-3 border-bottom border-secondary border-bottom-solid d-flex align-items-center justify-content-between'>
                <h3 className='card-title fw-bold text-header-td fs-4 mb-0'>{props?.title ?? ''}</h3>    
            </div>    
        </>
       
    )
}
export default PageHearder;