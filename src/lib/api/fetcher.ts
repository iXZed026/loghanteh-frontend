import {
  getLocalStorageItem,
  saveToLocalStorage,
} from "../utils/localStorage";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const ACCESS_TOKEN_KEY = "accessToken";

const AUTH_ENDPOINTS = [
  "/auth/login",
  "/auth/register",
  "/auth/verify-login",
  "/auth/verify-register",
  "/auth/forgot-password",
  "/auth/verify-forgot-password",
  "/auth/new-password",
  "/auth/refresh",
  "/auth/logout",
];

interface RefreshResponse {
  data: {
    accessToken: string;
  };
  message: string;
  success: boolean;
}

interface ApiErrorResponse {
  message?: string;
  success?: boolean;
}

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function getAccessToken(): string | null {
  if (!isBrowser()) {
    return null;
  }

  return getLocalStorageItem(ACCESS_TOKEN_KEY);
}

function removeAccessToken(): void {
  if (!isBrowser()) {
    return;
  }

  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

function saveAccessToken(accessToken: string): void {
  if (!isBrowser()) {
    return;
  }

  saveToLocalStorage(
    ACCESS_TOKEN_KEY,
    accessToken,
  );
}

export async function fetcher<T>(
  endpoint: string,
  options?: RequestInit,
  locale?: string,
  isRetry: boolean = false,
): Promise<T> {
  const accessToken = getAccessToken();

  const response = await fetch(
    `${BASE_URL}${endpoint}`,
    {
      ...options,

      credentials: "include",

      headers: {
        "Content-Type": "application/json",

        ...(locale && {
          "Accept-Language": locale,
        }),

        ...(accessToken && {
          Authorization: `Bearer ${accessToken}`,
        }),

        ...options?.headers,
      },
    },
  );

  const isAuthEndpoint =
    AUTH_ENDPOINTS.includes(endpoint);

  if (
    response.status === 401 &&
    !isRetry &&
    !isAuthEndpoint
  ) {
    try {
      const refreshResponse = await fetch(
        `${BASE_URL}/auth/refresh`,
        {
          method: "POST",

          credentials: "include",

          headers: {
            "Content-Type": "application/json",

            ...(locale && {
              "Accept-Language": locale,
            }),
          },
        },
      );

      if (!refreshResponse.ok) {
        removeAccessToken();

        throw new Error("Session expired");
      }

      const refreshData =
        await refreshResponse.json() as RefreshResponse;

      if (
        !refreshData.success ||
        !refreshData.data?.accessToken
      ) {
        removeAccessToken();

        throw new Error("Session expired");
      }

      saveAccessToken(
        refreshData.data.accessToken,
      );

      return fetcher<T>(
        endpoint,
        options,
        locale,
        true,
      );
    } catch (error) {
      removeAccessToken();

      throw error;
    }
  }

  if (!response.ok) {
    let errorData: ApiErrorResponse | null = null;

    try {
      errorData =
        await response.json();
    } catch {
      errorData = null;
    }

    return {
      success: false,
      message:
        errorData?.message ||
        "An error occurred while fetching data.",
    } as T;
  }

  return response.json();
}