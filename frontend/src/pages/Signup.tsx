import React from "react";
import { useState } from "react";
import { useAuthStore } from "../data/useAuthState";
import styles from "../styles/Signup.module.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const signup = useAuthStore((state: any) => state.signup);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const response = await signup(fName, lName, username, password, isAdmin);

      const data = await response.json();

      if (data.success) {
        setSuccess("User signed up successfully!");
        setFName("");
        setLName("");
        setUsername("");
        setPassword("");
      } else if (data.fNameError) {
        setError(data.fNameError);
      } else if (data.lNameError) {
        setError(data.lNameError);
      } else if (data.usernameError) {
        setError(data.usernameError);
      } else if (data.passwordError) {
        setError(data.passwordError);
      } else if (data.error) {
        setError(data.error);
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1 className={styles["header"]}>Signup</h1>

      <form className={styles["form"]} onSubmit={handleSubmit} action="">
        <label htmlFor="fName">First Name</label>
        <input
          id="fName"
          value={fName}
          onChange={(e) => setFName(e.target.value)}
        />
        <label htmlFor="lName">Last Name</label>
        <input
          id="lName"
          value={lName}
          onChange={(e) => setLName(e.target.value)}
        />
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
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className={styles["admin-div"]}>
          <input
            id="admin"
            type="checkbox"
            onChange={() => setIsAdmin((prev) => !prev)}
          />
          <label htmlFor="admin">admin</label>
        </div>
        <button disabled={isLoading} type="submit">
          {isLoading ? "Signing up..." : "Submit"}
        </button>
        {error && <p className={styles["error"]}>{error}</p>}
        {success && <p className={styles["success"]}>{success}</p>}
      </form>
    </>
  );
};

export default Signup;
