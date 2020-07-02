import React from 'react'
import Dashboard from '../Dashboard'
import { User } from '../../generated/graphql'

interface Props {
  user?: User
  children: React.ReactNode
}

const DashboardLayout: React.FC<Props> = ({ user, children }) => (
  <Dashboard user={user}>{children}</Dashboard>
)

export default DashboardLayout
