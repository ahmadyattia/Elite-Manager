import { useAuthStore } from "../data/useAuthState";
import SignoutBtn from "./SignoutBtn";
import { Link } from "react-router";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  const isAdminAuthenticated = useAuthStore(
    (state: any) => state.isAdminAuthenticated,
  );
  const isAuthenticated = useAuthStore((state: any) => state.isAuthenticated);

  return (
    <nav className={styles["navbar"]}>
      {isAuthenticated && <Link to={"home"}>Home</Link>}
      {isAuthenticated && <Link to={"appointments"}>Appointments</Link>}
      {!isAuthenticated && <Link to={"login"}>Login</Link>}
      {isAuthenticated && <Link to={"employees"}>Employees</Link>}
      {isAdminAuthenticated && <Link to={"signup"}>Signup employee</Link>}
      {isAuthenticated && <SignoutBtn />}
    </nav>
  );
};

export default Navbar;
