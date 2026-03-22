import { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Login.module.css";
import Image from "next/image";  
import Logo from "../public/centdash-white.png";

export default function Login() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <Image src={Logo} alt="Logo" width={300} height={100} />
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="email"
            className={styles.input}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className={styles.input}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className={styles.button}>
            {isLogin ? "Log In" : "Create Account"}
          </button>
        </form>
        <button onClick={() => setIsLogin(!isLogin)} className={styles.toggle}>
          {isLogin
            ? "Don't have an account? Sign up"
            : "Already have an account? Sign in"}
        </button>
      </div>
    </div>
  );
}
