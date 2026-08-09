import { useState } from "react";
import { useAuthStore } from "../data/useAuthState";
import { useNavigate } from "react-router";
import styles from "../styles/Login.module.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = useAuthStore((state: any) => state.login);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const data = await login(username, password);

      if (data.success) {
        navigate("/home", { replace: true });
      } else if (data.usernameError) {
        setError(data.usernameError);
      } else if (data.passwordError) {
        setError("Invalid password.");
      } else if (data.error) {
        setError(data.error);
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <>
      <h1 className={styles["header"]}>Login</h1>
      <form className={styles["form"]} onSubmit={handleSubmit} action="">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
        {error && <p className={styles["error"]}>*{error}</p>}
      </form>
    </>
  );
};

export default Login;
