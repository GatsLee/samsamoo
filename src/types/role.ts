/** 역할 묶음. 여행 만들기 3단계의 칩 그리드가 이 그룹 단위로 렌더된다. */
export type RoleGroupKey = "parent" | "grandparent" | "sibling" | "etc";

export interface Role {
  /** 서버와 화면이 공유하는 식별자 */
  code: string;
  label: string;
  group: RoleGroupKey;
}

export interface RoleGroup {
  key: RoleGroupKey;
  label: string;
  roles: Role[];
}
