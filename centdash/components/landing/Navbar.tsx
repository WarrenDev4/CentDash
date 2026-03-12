import Image from "next/image";

export default function Navbar() {
  return (
    <nav style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", paddingTop: "2.1%"}}>
      <Image
        src="/centdash-white.png"
        alt="Logo"
        width={333}
        height={105}
      />
    </nav>
  );
}