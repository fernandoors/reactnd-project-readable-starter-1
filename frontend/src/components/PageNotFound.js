import React from 'react'
import { Icon } from 'antd';

const PageNotFound = () => {
  return(
    <div className="centerContent">
    <Icon type="frown" style={{fontSize: "150px"}} />
    Sorry Page not found or Category list is empty.
  </div>
  )
}

export default PageNotFound
