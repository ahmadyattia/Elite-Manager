import { useEffect, type ReactElement, type ReactNode } from "react";
import "./App.css";
import Login from "./pages/Login";
import ApptsTable from "./components/ApptsTable";
import Signup from "./pages/Signup";
import { useAuthStore } from "./data/useAuthState";
import { Link, Outlet, useNavigate } from "react-router";
import Navbar from "./components/Navbar";

function App() {
  const checkSessionCookie = useAuthStore(
    (state: any) => state.checkSessionCookie,
  );
  const isAdminAuthenticated = useAuthStore(
    (state: any) => state.isAdminAuthenticated,
  );
  const isAuthenticated = useAuthStore((state: any) => state.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(checkSessionCookie, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("login", { replace: true });
    }
  }, [isAuthenticated]);

  return (
    <div style={{ minHeight: "100vh" }}>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
        {/*         
        {isAdminAuthenticated && (
          <>
            <p>Sign up</p>
            <Signup />
          </>
        )}

        <p>Login</p>
        <Login />
        <SignoutBtn />
        <ApptsTable /> */}
      </main>
    </div>
  );
}

export default App;
