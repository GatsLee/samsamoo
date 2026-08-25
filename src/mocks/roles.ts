import type { RoleGroup } from "@/types/role";

/** 여행 만들기 3단계의 역할 칩. 여기서 고른 역할이 부모 초대 화면의 선택지가 된다. */
export const MOCK_ROLE_GROUPS: RoleGroup[] = [
  {
    key: "parent",
    label: "부모",
    roles: [
      { code: "MOTHER", label: "엄마", group: "parent" },
      { code: "FATHER", label: "아빠", group: "parent" },
    ],
  },
  {
    key: "grandparent",
    label: "조부모",
    roles: [
      { code: "GRANDMOTHER_P", label: "친할머니", group: "grandparent" },
      { code: "GRANDFATHER_P", label: "친할아버지", group: "grandparent" },
      { code: "GRANDMOTHER_M", label: "외할머니", group: "grandparent" },
      { code: "GRANDFATHER_M", label: "외할아버지", group: "grandparent" },
    ],
  },
  {
    key: "sibling",
    label: "형제자매",
    roles: [
      { code: "SIBLING_1", label: "첫째", group: "sibling" },
      { code: "SIBLING_2", label: "둘째", group: "sibling" },
      { code: "SIBLING_3", label: "셋째", group: "sibling" },
    ],
  },
  { key: "etc", label: "기타", roles: [] },
];
