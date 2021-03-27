import React from 'react'
import { ProjectListScreen } from 'screens/project-list'
import { useAuth } from 'context/context-data/auth-context'

export const AuthenticatedApp = () => {
  const { logout } = useAuth()

  return <div>
    <button onClick={logout}>注销</button>
    <ProjectListScreen />
  </div>
}