import { useEffect, useState } from "react";
import styles from "../styles/Employees.module.css";

interface Employee {
  fName: string;
  lName: string;
  username: string;
  hashedPassword: string;
  isAdmin: boolean;
}

const Employees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchEmployees() {
      setError("");
      try {
        const response = await fetch(
          `${import.meta.env.BACKEND_URL}/api/employees`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        if (data.success) {
          setEmployees(data.accounts);
        }
      } catch (error: any) {
        setError(error.message);
      }
    }

    fetchEmployees();
  }, []);

  return (
    <div>
      <h1 className={styles["header"]}>Employees</h1>
      <div className={styles["employees"]}>
        {employees &&
          employees.map((employee) => {
            return (
              <ul className={styles["employee"]} key={employee.username}>
                <li className={styles["name"]}>
                  {employee.fName} {employee.lName}
                </li>

                <li>Username: {employee.username}</li>
                <li>Admin: {employee.isAdmin ? "yes" : "no"}</li>
              </ul>
            );
          })}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default Employees;
