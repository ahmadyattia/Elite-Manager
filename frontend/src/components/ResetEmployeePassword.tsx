import { useState } from "react";
import styles from "../styles/ResetEmployeePassword.module.css";

const ResetEmployeePassword = ({ username }: { username: string }) => {
  const [resetPassword, setResetPassword] = useState(false);
  const [currentUserPassword, setCurrentUserPassword] = useState("");
  const [currentUserAuthorized, setCurrentUserAuthorized] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [retypedNewPassword, setRetypedNewPassword] = useState("");
  const [resetError, setResetError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleResetPassword = () => {
    setResetPassword(true);
    setSuccess(false);
  };

  const handleCancelResetting = () => {
    setResetPassword(false);
    setCurrentUserAuthorized(false);
    setCurrentUserPassword("");
    setNewPassword("");
    setRetypedNewPassword("");
  };

  const handleSubmitCurrentUserPassword = async () => {
    console.log("here");
    setResetError("");

    const currentUserPasswordJSON = JSON.stringify({ currentUserPassword });
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/validate-password`,
        {
          method: "POST",
          body: currentUserPasswordJSON,
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        },
      );

      const responseBody = await response.json();

      if (responseBody.success) {
        setCurrentUserAuthorized(true);
      } else if (responseBody.error) {
        throw Error(responseBody.error);
      }
    } catch (error: any) {
      setResetError(error.message);
    }
  };

  const handleSubmitResetPassword = async () => {
    setResetError("");
    setSuccess(false);

    if (newPassword.trim() !== retypedNewPassword.trim()) {
      setResetError("entered passwords didn't match");
      return;
    } else if (!newPassword.trim() || !retypedNewPassword.trim()) {
      setResetError("Please fill out the fields");
      return;
    }

    const newPasswordJSON = JSON.stringify({ username, newPassword });

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/reset-password`,
        {
          method: "POST",
          body: newPasswordJSON,
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      const responseBody = await response.json();

      if (responseBody.success) {
        setSuccess(true);
        setResetPassword(false);
        setCurrentUserAuthorized(false);
        setCurrentUserPassword("");
        setNewPassword("");
        setRetypedNewPassword("");
      } else if (responseBody.error) {
        setResetError(responseBody.error);
      }
    } catch (error: any) {
      setResetError(error.message);
    }
  };

  return (
    <>
      {!resetPassword && (
        <button className={styles["submitBtn"]} onClick={handleResetPassword}>
          reset
        </button>
      )}
      {resetPassword && !success && (
        <div className={styles["reset-section"]}>
          <div className={styles["heading"]}>
            <h2 className={styles["header"]}>Reset Password</h2>
            <span className={styles["cancel"]} onClick={handleCancelResetting}>
              Cancel
            </span>
          </div>
          {!currentUserAuthorized && (
            <>
              <input
                className={styles["input"]}
                value={currentUserPassword}
                onChange={(e) => setCurrentUserPassword(e.target.value)}
                placeholder="enter your password"
              />
              <button
                className={styles["submitBtn"]}
                onClick={handleSubmitCurrentUserPassword}
              >
                Submit
              </button>{" "}
            </>
          )}
          {currentUserAuthorized && (
            <div className={styles["new-password-fields"]}>
              <input
                className={styles["input"]}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
              <input
                className={styles["input"]}
                value={retypedNewPassword}
                onChange={(e) => setRetypedNewPassword(e.target.value)}
                placeholder="Confirm password"
              />
              <button
                className={styles["submitBtn"]}
                onClick={handleSubmitResetPassword}
              >
                Submit
              </button>
            </div>
          )}
          {resetError && <p className={styles["error"]}>{resetError}</p>}
        </div>
      )}
      {success && (
        <p className={styles["success"]}>Password changed successfully!</p>
      )}
    </>
  );
};

export default ResetEmployeePassword;
