import Navbar from "../components/landing/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <main
      style={{ 
        backgroundImage: "url('/centdash-landing-page-image.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        margin: 0,
        padding: 0,
      }}
    >
      <Navbar />
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "80%",
        textAlign: "center",
        padding: "0 20px",
        marginTop: "-100px"
      }}>
        <h1 style={{ color: "white", fontFamily: "Tahoma", fontSize: "2.4rem", fontWeight: "bold", marginBottom: "1rem" }}>
          Take control of your personal finances with AI.
        </h1>
        <p style={{ color: "white", fontFamily: "Gill Sans, sans-serif", fontSize: "1.45rem", 
          fontWeight: "400", marginBottom: "3rem"  }}>
          CentDash allows you to manage of your personal finances with AI in a cutting edge app.
        </p>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "1rem" }}>
          <Link href="/auth/sign-up">
            <button style={{
              backgroundColor: "white",
              color: "black",
              padding: "12px 32px",
              borderRadius: "8px",
              fontFamily: "Tahoma",
              border: "none",
              fontSize: "1rem",
              fontWeight: "bold",
              cursor: "pointer",
            }}>
              Sign Up
            </button>
          </Link>
          <Link href="login">
            <button style={{
              backgroundColor: "transparent",
              color: "white",
              padding: "12px 32px",
              borderRadius: "8px",
              fontFamily: "Tahoma",
              border: "2px solid white",
              fontSize: "1rem",
              fontWeight: "bold",
              cursor: "pointer",
            }}>
              Login
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}