"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  type: "customer" | "seller"
  storeData?: {
    storeName: string
    storeUrl: string
    phone: string
    banner?: string
    profilePicture?: string
    address?: {
      street: string
      street2: string
      city: string
      postalCode: string
      country: string
      region: string
    }
    biography?: string
    settings?: {
      showEmail: boolean
      showTerms: boolean
      showSchedule: boolean
    }
  }
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string, type: "customer" | "seller") => Promise<void>
  upgradeToSeller: (storeData: { storeName: string; storeUrl: string; phone: string }) => Promise<void>
  logout: () => void
  updateUser: (newData: Partial<User>) => Promise<void>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const savedUser = localStorage.getItem("tienda98-user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (e) {
        console.error("Error loading user:", e)
      }
    }
  }, [])

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    const mockUser: User = {
      id: "1",
      name: "Usuario Demo",
      email,
      type: "customer",
    }
    setUser(mockUser)
    localStorage.setItem("tienda98-user", JSON.stringify(mockUser))
  }

  const register = async (name: string, email: string, password: string, type: "customer" | "seller") => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      type,
    }
    setUser(mockUser)
    localStorage.setItem("tienda98-user", JSON.stringify(mockUser))
  }

  const upgradeToSeller = async (storeData: { storeName: string; storeUrl: string; phone: string }) => {
    if (!user) return

    await new Promise((resolve) => setTimeout(resolve, 500))
    const updatedUser: User = {
      ...user,
      type: "seller",
      storeData,
    }
    setUser(updatedUser)
    localStorage.setItem("tienda98-user", JSON.stringify(updatedUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("tienda98-user")
  }

  const updateUser = async (newData: Partial<User>) => {
    if (!user) return

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    const updatedUser = { ...user, ...newData }
    setUser(updatedUser)
    localStorage.setItem("tienda98-user", JSON.stringify(updatedUser))
  }

  return (
    <AuthContext.Provider value={{ user, login, register, upgradeToSeller, logout, updateUser, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
