export type AuthUser = {
  id: number;
  name: string;
  email: string;
  learningGoal: string;
  about: string;
  interests: string[];
  createdAt: string;
};

export type ProfileInput = {
  name: string;
  email: string;
  learningGoal: string;
  about: string;
  interests: string[];
};

async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  let response: Response;

  try {
    response = await fetch(path, {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
  } catch {
    throw new Error(
      "Cannot connect to NSeeRead. Check that the backend is running."
    );
  }

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      result.message || "Something went wrong. Please try again."
    );
  }

  return result as T;
}

export async function signUpAccount(values: {
  name: string;
  email: string;
  password: string;
}): Promise<AuthUser> {
  const result = await apiRequest<{ user: AuthUser }>(
    "/api/auth/signup",
    {
      method: "POST",
      body: JSON.stringify(values),
    }
  );

  return result.user;
}

export async function logInAccount(values: {
  email: string;
  password: string;
  rememberMe: boolean;
}): Promise<AuthUser> {
  const result = await apiRequest<{ user: AuthUser }>(
    "/api/auth/login",
    {
      method: "POST",
      body: JSON.stringify(values),
    }
  );

  return result.user;
}

export async function getCurrentUser(): Promise<AuthUser> {
  const result = await apiRequest<{ user: AuthUser }>(
    "/api/auth/me"
  );

  return result.user;
}

export async function getProfile(): Promise<AuthUser> {
  const result = await apiRequest<{ user: AuthUser }>(
    "/api/profile"
  );

  return result.user;
}

export async function saveProfile(
  values: ProfileInput
): Promise<AuthUser> {
  const result = await apiRequest<{ user: AuthUser }>(
    "/api/profile",
    {
      method: "PUT",
      body: JSON.stringify(values),
    }
  );

  return result.user;
}

export async function logOutAccount(): Promise<void> {
  await apiRequest<{ message: string }>(
    "/api/auth/logout",
    {
      method: "POST",
    }
  );
}

export async function changePassword(values: {
  currentPassword: string;
  newPassword: string;
}): Promise<{ message: string }> {
  return apiRequest<{ message: string }>("/api/auth/change-password", {
    method: "POST",
    body: JSON.stringify(values),
  });
}
