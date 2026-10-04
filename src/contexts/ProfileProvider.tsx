"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react"

import { fetcher } from "@/lib/api/fetcher"
import { logout as logoutRequest } from "@/lib/api/auth/logout"
import { removeFromLocalStorage } from "@/lib/utils/localStorage"

interface Profile {
  user_Id: number
  full_name: string
  email: string
  phone_number: string
  dob: string | null
}

interface ProfileResponse {
  data: Profile
  message: string
  success: boolean
}

interface ProfileContextType {
  profile: Profile | null
  isAuthenticated: boolean
  isLoading: boolean
  getProfile: () => Promise<void>
  setProfile: (profile: Profile | null) => void
  logout: () => Promise<void>
}

const ProfileContext = createContext<
  ProfileContextType | undefined
>(undefined)

export function ProfileProvider({
  children,
}: {
  children: ReactNode
}) {

  const [profile, setProfile] =
    useState<Profile | null>(null)

  const [isLoading, setIsLoading] =
    useState(true)

  const getProfile = async () => {

    try {

      setIsLoading(true)

      const response =
        await fetcher<ProfileResponse>(
          "/profile"
        )

      if (response.success) {
        setProfile(response.data)
      } else {
        setProfile(null)
      }

    } catch {
      setProfile(null)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {

    try {

      const response =
        await logoutRequest()

      if (response.success) {
        removeFromLocalStorage("accessToken")
        setProfile(null)
      }

    } catch {
      removeFromLocalStorage("accessToken")
      setProfile(null)
    }
  }

  useEffect(() => {
    getProfile()
  }, [])

  return (
    <ProfileContext.Provider
      value={{
        profile,
        isAuthenticated: !!profile,
        isLoading,
        getProfile,
        setProfile,
        logout,
      }}
    >
      {children}
    </ProfileContext.Provider>
  )
}

export function useProfile() {

  const context = useContext(ProfileContext)

  if (!context) {
    throw new Error(
      "useProfile must be used within ProfileProvider"
    )
  }

  return context
}