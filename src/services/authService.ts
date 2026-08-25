import { MOCK_USER } from "@/mocks/users";
import type { AuthResult, LoginRequest, SignUpRequest, User } from "@/types/user";
import { mockDelay, request, USE_MOCK } from "./apiClient";

export async function login(payload: LoginRequest): Promise<AuthResult> {
  if (USE_MOCK) {
    return mockDelay({ user: MOCK_USER, accessToken: "mock-access-token" });
  }
  return request<AuthResult>("/auth/login", { method: "POST", body: payload });
}

export async function signUp(payload: SignUpRequest): Promise<AuthResult> {
  if (USE_MOCK) {
    return mockDelay({ user: MOCK_USER, accessToken: "mock-access-token" });
  }
  return request<AuthResult>("/auth/signup", { method: "POST", body: payload });
}

export async function getMe(): Promise<User> {
  if (USE_MOCK) {
    return mockDelay(MOCK_USER);
  }
  return request<User>("/auth/me");
}
