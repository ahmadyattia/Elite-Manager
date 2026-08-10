import ServiceCard from "../components/ServiceCard";
import styles from "../styles/Home.module.css";

const Home = () => {
  const appointmentsCardDescription =
    "View the appointments set by you or your customers";
  const apptsByDateCardDescription = "View appointments by its date";
  const employeesCardDescription = "View and edit your employees' details";
  const signupCardDescription = "Sign up an account for a new employee";
  const signoutCardDescription = "Log out from your account";

  return (
    <div className={styles["services-grid"]}>
      <ServiceCard
        heading="Appointments"
        description={appointmentsCardDescription}
        path="/appointments"
      />
      <ServiceCard
        heading="Appointments by Date"
        description={apptsByDateCardDescription}
        path="/appointments/date"
      />
      <ServiceCard
        heading="Employees"
        description={employeesCardDescription}
        path="/employees"
      />
      <ServiceCard
        heading="Sign up an Employee"
        description={signupCardDescription}
        path="/signup"
      />
      <ServiceCard
        heading="Sign out"
        description={signoutCardDescription}
        path="/signout"
      />
    </div>
  );
};

export default Home;
