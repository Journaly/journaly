import React from 'react'
import Dashboard from '../Dashboard'

interface Props {
  children: React.ReactNode
}

const DashboardLayout: React.FC<Props> = ({ children }) => (
  <Dashboard>{children}</Dashboard>
)

export default DashboardLayout
