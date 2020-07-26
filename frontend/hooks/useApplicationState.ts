import { useContext } from 'react'
import { ApplicationContext } from '../state/ApplicationStateProvider'

export const useApplicationState = () => useContext(ApplicationContext)
