'use client'

import { UserAuth } from '@/types/type'
import { createContext, useContext } from 'react'

interface AuthContextType {
  user: UserAuth | null
  isAuthenticated: boolean
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
})

export const useAuth = () => useContext(AuthContext)
