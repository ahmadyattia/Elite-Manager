import { useAuthStore } from "../data/useAuthState";
import { Link } from "react-router";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  const isAuthenticated = useAuthStore((state: any) => state.isAuthenticated);
  const isAdminAuthenticated = useAuthStore(
    (state: any) => state.isAdminAuthenticated,
  );

  return (
    <nav className={styles["navbar"]}>
      {isAuthenticated && <Link to={"home"}>Home</Link>}
      {!isAuthenticated && <Link to={"login"}>Login</Link>}
      {isAdminAuthenticated && (
        <span className={styles["admin-tag"]}>admin</span>
      )}
    </nav>
  );
};

export default Navbar;
