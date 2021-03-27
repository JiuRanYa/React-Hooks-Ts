import { ReactNode } from 'react'
import { AuthProvider } from './context-data/auth-context'

// 1. 提供一个入口，包裹全局的APP
export const AppProvicers = ({children}: { children: ReactNode}) => {
  return <AuthProvider>
    {children}
  </AuthProvider> 
}