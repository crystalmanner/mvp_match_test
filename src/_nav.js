import React from 'react'
import { CNavItem } from '@coreui/react'
import barchart from 'src/assets/icons/barchart.svg'
import view from 'src/assets/icons/view.svg'
import dashboard from 'src/assets/icons/dashboard.svg'
import piechart from 'src/assets/icons/piechart.svg'
import power from 'src/assets/icons/power.svg'

const _nav = [
  {
    component: CNavItem,
    name: '',
    to: '/barchart',
    icon: <img height={24} src={barchart} alt="barchart" />,
  },
  {
    component: CNavItem,
    name: '',
    to: '/view',
    icon: <img height={24} src={view} alt="dashboard" />,
  },
  {
    component: CNavItem,
    name: '',
    to: '/dashboard',
    icon: <img height={24} src={dashboard} alt="barchart" />,
  },
  {
    component: CNavItem,
    name: '',
    to: '/piechart',
    icon: <img height={24} src={piechart} alt="piechart" />,
  },
  {
    component: CNavItem,
    name: '',
    to: '/power',
    icon: <img height={24} src={power} alt="piechart" />,
  },
]

export default _nav
