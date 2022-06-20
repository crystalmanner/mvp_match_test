import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div className="primary">
        <a href="https://coreui.io/react" target="_blank" rel="noopener noreferrer">
          Terms&Conditions
        </a>
        &nbsp;|&nbsp;
        <a href="https://coreui.io/react" target="_blank" rel="noopener noreferrer">
          Privacy pollicy
        </a>
        <a href="https://coreui.io" target="_blank" rel="noopener noreferrer">
          CoreUI
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
