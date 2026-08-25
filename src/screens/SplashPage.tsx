"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import MobileFrame from "@/components/layout/MobileFrame";
import StatusBar from "@/components/layout/StatusBar";
import styles from "./SplashPage.module.css";

/** IA_SY_001 스플래시. 로그인 여부 판정 중 노출된다. */
export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    // TODO(개발): 토큰 검사 결과에 따라 /home 또는 /login 으로 분기한다.
    const timer = setTimeout(() => router.replace("/login"), 1200);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <MobileFrame>
      <div className={styles.screen}>
        <StatusBar tone="light" />
        <div className={styles.brand}>
          <span className={styles.wordmark}>삼삼오오</span>
          <span className={styles.tagline}>가족이 함께 정하는 여행</span>
        </div>
        <div className={styles.loading}>
          <div className={styles.dots}>
            <span className={styles.dot} />
            <span className={styles.dot} />
            <span className={styles.dot} />
          </div>
          <span className={styles.message}>잠시만 기다려주세요</span>
        </div>
      </div>
    </MobileFrame>
  );
}
