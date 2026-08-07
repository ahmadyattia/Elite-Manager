import { useAuthStore } from "../data/useAuthState";
import styles from "../styles/SignoutBtn.module.css";

const SignoutBtn = () => {
  const logout = useAuthStore((state: any) => state.logout);

  function handleSignout() {
    logout();
  }

  return (
    <button className={styles["signout-btn"]} onClick={handleSignout}>
      Sign out
    </button>
  );
};

export default SignoutBtn;
