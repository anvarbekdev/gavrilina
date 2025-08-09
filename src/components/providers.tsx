"use client"

import { AuthContext } from "@/hooks/auth-context"
import { setAuthToken } from "@/lib/auth"
import { UserAuth } from "@/types/type"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React from "react"

export function Providers({
  children,
  user,
  token
}: {
  children: React.ReactNode,
  user: UserAuth | null,
  token?: string
}) {

  const [queryClient] = React.useState(() => new QueryClient())

  if (token) {
    setAuthToken(token)
  } else {
    setAuthToken(undefined)
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user }}>
      <QueryClientProvider client={queryClient}>
          {children}
      </QueryClientProvider>
    </AuthContext.Provider>
  )
}
