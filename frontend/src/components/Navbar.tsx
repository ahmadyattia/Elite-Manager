import { useAuthStore } from "../data/useAuthState";
import { Link } from "react-router";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  const isAuthenticated = useAuthStore((state: any) => state.isAuthenticated);

  return (
    <nav className={styles["navbar"]}>
      {isAuthenticated && <Link to={"home"}>Home</Link>}
      {!isAuthenticated && <Link to={"login"}>Login</Link>}
    </nav>
  );
};

export default Navbar;
