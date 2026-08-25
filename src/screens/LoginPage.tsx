"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AppBar from "@/components/layout/AppBar";
import MobileFrame from "@/components/layout/MobileFrame";
import StatusBar from "@/components/layout/StatusBar";
import Button from "@/components/common/Button";
import TextField from "@/components/common/TextField";
import { login } from "@/services/authService";
import styles from "./AuthPage.module.css";

/** A-01 로그인 */
export default function LoginPage() {
  const router = useRouter();
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = loginId.trim().length > 0 && password.length > 0 && !submitting;

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login({ loginId, password });
      router.push("/home");
    } catch {
      setError("아이디 또는 비밀번호를 확인해주세요.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <MobileFrame>
      <StatusBar />
      <AppBar title="로그인" showBack={false} />
      <div className={styles.content}>
        <p className={styles.lead}>{"가족이 함께\n정하는 여행"}</p>

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
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
          />
          {error ? <span className={styles.formError}>{error}</span> : null}
          <div className={styles.submit}>
            <Button type="submit" disabled={!canSubmit}>
              {submitting ? "로그인 중..." : "로그인"}
            </Button>
          </div>
        </form>

        <div className={styles.footer}>
          <span>계정이 없으신가요?</span>
          <button type="button" className={styles.link} onClick={() => router.push("/signup")}>
            회원가입
          </button>
        </div>
      </div>
    </MobileFrame>
  );
}
