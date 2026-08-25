"use client";

import type { RoleGroup } from "@/types/role";
import styles from "./RoleChipGroup.module.css";

interface RoleChipGroupProps {
  groups: RoleGroup[];
  selectedCodes: string[];
  onToggle: (code: string) => void;
  onAddCustom: () => void;
  customRoles: string[];
}

/** 여행 만들기 3단계. 고른 역할 수가 곧 동행 인원이 된다. */
export default function RoleChipGroup({
  groups,
  selectedCodes,
  onToggle,
  onAddCustom,
  customRoles,
}: RoleChipGroupProps) {
  return (
    <div className={styles.groups}>
      {groups.map((group) => (
        <div key={group.key} className={styles.group}>
          <span className={styles.groupLabel}>{group.label}</span>
          <div className={styles.chips}>
            {group.roles.map((role) => {
              const selected = selectedCodes.includes(role.code);
              return (
                <button
                  key={role.code}
                  type="button"
                  className={styles.chip}
                  data-selected={selected}
                  onClick={() => onToggle(role.code)}
                >
                  {selected ? `✓ ${role.label}` : role.label}
                </button>
              );
            })}

            {group.key === "etc"
              ? customRoles.map((label) => (
                  <button
                    key={label}
                    type="button"
                    className={styles.chip}
                    data-selected
                    onClick={() => onToggle(label)}
                  >
                    ✓ {label}
                  </button>
                ))
              : null}

            {group.key === "etc" ? (
              <button type="button" className={styles.chip} onClick={onAddCustom}>
                + 직접 입력
              </button>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}
