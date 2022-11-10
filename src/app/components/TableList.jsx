import React, {useState, useEffect} from 'react'
import {Table, Spin} from 'antd'

const TableList = (props) => {
  const {
    loading,
    dataTable,
    count,
    size,
    columns,
    setOffset,
    setSize,
    isPagination,
    rowSelection,
    rowKey,
    offset,
  } = props
  const [searchText, setSearchText] = useState('')

  const handleReset = (clearFilters) => {
    clearFilters()
    setSearchText('')
  }

  const handleTableChange = async (page, pageSize) => {
    if (setOffset) {
      setOffset(page)
    }
  }

  const handleSizeChange = async (current, size) => {
    if (setSize) {
      setSize(size)
    }
  }

  const handleShowTotal = (total, range) => {
    return `${range[0]}-${range[1]} của ${total} mục`
  }

  return (
    <Table
      {...props}
      rowKey={rowKey || 'id'}
      bordered
      style={{backgroundColor: '#fff', width: '100%'}}
      rowClassName={(record, index) => (index % 2 == 0 ? 'table-row-light' : 'table-row-dark')}
      loading={loading}
      size='small'
      ellipsis='enable'
      pagination={
        isPagination
          ? {
              total: count,
              pageSize: size,
              pageSizeOptions: ['10', '20', '50'],
              onChange: handleTableChange,
              showSizeChanger: true,
              onShowSizeChange: handleSizeChange,
              current: offset,
              showTotal: handleShowTotal,
              locale: {items_per_page: '/ trang'},
              size: 'default',
            }
          : false
      }
      columns={columns.map((item) => ({...item}))}
      dataSource={dataTable}
      rowSelection={rowSelection}
    />
  )
}

export {TableList}
