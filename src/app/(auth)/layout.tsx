import type { ReactNode } from "react";
import { Shield, Check } from "lucide-react";
import styles from "./auth.module.css";

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.iconWrapper}>
            <Shield size={28} strokeWidth={2.5} />
          </div>

          <h1 className={styles.title}>
            The operating system <br /> for modern hiring.
          </h1>

          <p className={styles.subtitle}>
            Streamline your entire recruitment process with our unified platform.
            Built for scale and security.
          </p>

          <ul className={styles.bulletList}>
            <li>
              <span className={styles.bulletIcon}>
                <Check size={18} strokeWidth={3} />
              </span>
              Enterprise-grade security (JWT &amp; HttpOnly)
            </li>
            <li>
              <span className={styles.bulletIcon}>
                <Check size={18} strokeWidth={3} />
              </span>
              Advanced dashboard for Employers
            </li>
            <li>
              <span className={styles.bulletIcon}>
                <Check size={18} strokeWidth={3} />
              </span>
              Seamless candidate experience
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.formContainer}>
        <div className={styles.card}>{children}</div>
      </div>
    </div>
  );
}
