"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AppBar from "@/components/layout/AppBar";
import MobileFrame from "@/components/layout/MobileFrame";
import StatusBar from "@/components/layout/StatusBar";
import Button from "@/components/common/Button";
import TextField from "@/components/common/TextField";
import { signUp } from "@/services/authService";
import styles from "./AuthPage.module.css";

const MIN_PASSWORD_LENGTH = 8;

/** A-02 회원가입 */
export default function SignUpPage() {
  const router = useRouter();
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const passwordError =
    password.length > 0 && password.length < MIN_PASSWORD_LENGTH
      ? `비밀번호는 ${MIN_PASSWORD_LENGTH}자 이상이어야 해요.`
      : undefined;
  const canSubmit =
    loginId.trim().length > 0 && password.length >= MIN_PASSWORD_LENGTH && !submitting;

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await signUp({ loginId, password });
      router.push("/home");
    } catch {
      setError("가입에 실패했어요. 잠시 후 다시 시도해주세요.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <MobileFrame>
      <StatusBar />
      <AppBar title="회원가입" />
      <div className={styles.content}>
        <p className={styles.lead}>{"아이디와 비밀번호로\n시작해보세요"}</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <TextField
            name="loginId"
            label="아이디"
            placeholder="example"
            value={loginId}
            onChange={(event) => setLoginId(event.target.value)}
            autoComplete="username"
          />
          <TextField
            name="password"
            type="password"
            label="비밀번호"
            placeholder={`${MIN_PASSWORD_LENGTH}자 이상 입력해주세요`}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            error={passwordError}
            autoComplete="new-password"
          />
          {error ? <span className={styles.formError}>{error}</span> : null}
          <div className={styles.submit}>
            <Button type="submit" disabled={!canSubmit}>
              {submitting ? "가입 중..." : "가입하기"}
            </Button>
          </div>
        </form>

        <div className={styles.footer}>
          <span>이미 계정이 있으신가요?</span>
          <button type="button" className={styles.link} onClick={() => router.push("/login")}>
            로그인
          </button>
        </div>
      </div>
    </MobileFrame>
  );
}
