import type { ApiError } from "@/types/common";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

/** true 면 각 서비스가 mocks 데이터를 반환한다. 실제 API가 준비되면 .env 에서 false 로 바꾼다. */
export const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK !== "false";

export class ApiRequestError extends Error {
  code: string;

  constructor({ code, message }: ApiError) {
    super(message);
    this.name = "ApiRequestError";
    this.code = code;
  }
}

interface RequestOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
}

/**
 * 모든 서버 호출이 지나는 단일 지점.
 * 인증 헤더·에러 변환을 여기서만 다루면 화면 코드는 손대지 않아도 된다.
 */
export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { body, headers, ...rest } = options;

  const response = await fetch(`${BASE_URL}${path}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  if (!response.ok) {
    const fallback: ApiError = {
      code: String(response.status),
      message: "요청을 처리하지 못했어요. 잠시 후 다시 시도해주세요.",
    };
    const parsed = await response.json().catch(() => fallback);
    throw new ApiRequestError({ ...fallback, ...parsed });
  }

  return (await response.json()) as T;
}

/** 목데이터 응답에 약간의 지연을 줘서 로딩 상태를 화면에서 확인할 수 있게 한다. */
export function mockDelay<T>(value: T, ms = 400): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}
