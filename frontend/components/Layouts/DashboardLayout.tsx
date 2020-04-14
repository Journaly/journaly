import React from 'react'
import Dashboard from '../Dashboard'

interface Props {
  children: React.ReactNode
}

const DashboardLayout: React.FC<Props> = (props) => (
  <Dashboard>{props.children}</Dashboard>
)

export default DashboardLayout
