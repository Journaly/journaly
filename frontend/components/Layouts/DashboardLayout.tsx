import React from 'react'
import Dashboard from '../Dashboard'
import { User as UserType } from '../../generated/graphql'

interface Props {
  currentUser?: UserType
  children: React.ReactNode
}

const DashboardLayout: React.FC<Props> = ({ currentUser, children }) => (
  <Dashboard currentUser={currentUser}>{children}</Dashboard>
)

export default DashboardLayout
