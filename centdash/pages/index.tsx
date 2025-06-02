import { useState } from "react";
import styles from "../styles/Home.module.css";
import Image from "next/image";  
import Logo from "../public/CentDash (White).png";

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      console.log("Logging in:", { email, password });
    } else {
      console.log("Signing up:", { email, password });
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <Image src={Logo} alt="Logo" width={285} height={98} />
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
