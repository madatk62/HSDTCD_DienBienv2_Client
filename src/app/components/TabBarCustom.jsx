import React, {useState, useEffect} from 'react'
// {
//   key:''
//   title:'',
//   icon:''
// }
const TabBarCustom = ({data, tabKey, setTabKey}) => {
  return (
    <div className='flex-grow-1 d-flex flex-row justify-content-start align-items-center ps ps--active-y mb-5'>
      <ul className='nav nav-tabs m-tabs-line'>
        {data?.map((item, index) => (
          <li className='nav-item m-tabs__item'>
            <a
              key={index}
              className={
                `nav-link m-tabs__link px-3 fw-bolder fs-6 ` + (tabKey === item.key && 'active')
              }
              onClick={() => {
                setTabKey(item.key)
              }}
            >
              <i className={`${item?.icon ?? 'fas fa-info-circle'} me-2`}></i>
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
export {TabBarCustom}
