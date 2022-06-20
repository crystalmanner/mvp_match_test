import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Charts = React.lazy(() => import('./views/charts/Charts'))
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/charts', name: 'Charts', element: Charts },
]

export default routes
