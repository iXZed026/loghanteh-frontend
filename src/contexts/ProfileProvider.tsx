"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

import { fetcher } from "@/lib/api/fetcher";
import { logout as logoutRequest } from "@/lib/api/auth/logout";
import { removeFromLocalStorage } from "@/lib/utils/localStorage";
import { useLocale } from "next-intl";

interface Profile {
    user_Id: number;
    full_name: string;
    email: string;
    phone_number: string;
    dob: string | null;
}

interface ProfileResponse {
    data: Profile;
    message: string;
    success: boolean;
}

interface ProfileContextType {
    profile: Profile | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    getProfile: () => Promise<void>;
    setProfile: (profile: Profile | null) => void;
    logout: () => Promise<void>;
    clearSession: () => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(
    undefined,
);

export function ProfileProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const locale = useLocale()

    const getProfile = useCallback(async () => {
        try {
            setIsLoading(true);

            const response = await fetcher<ProfileResponse>("/profile");

            if (response.success) {
                setProfile(response.data);
            } else {
                setProfile(null);
            }
        } catch {
            setProfile(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Send the logout request without clearing the current session.
    // The UI clears the session after showing the success modal.
    const logout = useCallback(async () => {
        const response = await logoutRequest(locale);

        if (!response.success) {
            throw new Error(
                response.message || "Logout failed. Please try again.",
            );
        }
    }, []);

    const clearSession = useCallback(() => {
        removeFromLocalStorage("accessToken");
        setProfile(null);
    }, []);

    useEffect(() => {
        void getProfile();
    }, [getProfile]);

    return (
        <ProfileContext.Provider
            value={{
                profile,
                isAuthenticated: !!profile,
                isLoading,
                getProfile,
                setProfile,
                logout,
                clearSession,
            }}
        >
            {children}
        </ProfileContext.Provider>
    );
}

export function useProfile() {
    const context = useContext(ProfileContext);

    if (!context) {
        throw new Error(
            "useProfile must be used within ProfileProvider",
        );
    }

    return context;
}
