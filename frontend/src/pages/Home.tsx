import ServiceCard from "../components/ServiceCard";

const Home = () => {
  const appointmentsCardDescription =
    "View the appointments set by you or your customers";
  const employeesCardDescription = "View and edit your employees' details";
  const signupCardDescription = "Sign up an account for a new employee";
  const signoutCardDescription = "Log out from your account";

  return (
    <div>
      <ServiceCard
        heading="Appointments"
        description={appointmentsCardDescription}
        path="/appointments"
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
