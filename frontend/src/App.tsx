import { useEffect } from "react";
import "./App.css";
import { useAuthStore } from "./data/useAuthState";
import { Outlet, useNavigate } from "react-router";
import Navbar from "./components/Navbar";

function App() {
  const checkSession = useAuthStore((state: any) => state.checkSessionCookie);
  // const isAdminAuthenticated = useAuthStore(
  //   (state: any) => state.isAdminAuthenticated,
  // );
  const isAuthenticated = useAuthStore((state: any) => state.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(checkSession, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("login", { replace: true });
    }
  }, [isAuthenticated]);

  console.log("isAuthenticated:", isAuthenticated);

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
