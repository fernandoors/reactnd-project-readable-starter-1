import React from 'react'
import { Select } from 'antd';

const Option = Select.Option

export const OrderPosts = props => {
  return (
    <div className='select-option'>
      <Select placeholder='Order by'
        style={{ width: 120 }}
        onChange={(opt) => props.changeOrder(opt)}
      >
        <Option value="date">Date</Option>
        <Option value="more">More Vote</Option>
        <Option value="less">Less Vote</Option>
      </Select>
    </div>
  )
}

