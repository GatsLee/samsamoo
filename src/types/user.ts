export interface User {
  id: string;
  /** 로그인 아이디 */
  loginId: string;
  name: string;
  /** 아바타에 쓰는 한 글자. 서버가 안 주면 name 첫 글자로 대체한다. */
  initial: string;
}

export interface LoginRequest {
  loginId: string;
  password: string;
}

export interface SignUpRequest {
  loginId: string;
  password: string;
}

export interface AuthResult {
  user: User;
  accessToken: string;
}
