import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/barchart', name: 'Dashboard', element: Dashboard },
  { path: '/view', name: 'Dashboard', element: Dashboard },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/piechart', name: 'Dashboard', element: Dashboard },
  { path: '/power', name: 'Dashboard', element: Dashboard },
]

export default routes
