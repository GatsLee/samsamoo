/** 화면이 공통으로 쓰는 비동기 상태. 기본·로딩·데이터없음·오류·성공 5가지를 다룬다. */
export type LoadStatus = "idle" | "loading" | "empty" | "error" | "success";

export interface AsyncState<T> {
  status: LoadStatus;
  data: T | null;
  /** 사용자에게 그대로 보여줄 수 있는 문구 */
  message?: string;
}

export interface ApiError {
  code: string;
  message: string;
}
