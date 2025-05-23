import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./modules/Dashboard";
import Form from "./modules/Form";
import ConvesationBox from "./components/ConvesationBox";
import ForgotPassword from "./modules/Form/forgotPassword";

const ProtectedRoutes = ({ children, auth = false }) => {
  const isLoggedIn = localStorage.getItem("userToken:") !== null || false;

  if (!isLoggedIn && auth) {
    return <Navigate to={"/user/sign-in"} />;
  } else if (
    isLoggedIn &&
    ["/user/sign-in", "/user/sign-up"].includes(window.location.pathname)
  ) {
    return <Navigate to={"/"} />;
  }
  return children;
};

function App() {
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <ProtectedRoutes auth={true}>
            <Dashboard />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/user/Sign-in"
        element={
          <ProtectedRoutes>
            <Form isSignIn={true} />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/user/Sign-up"
        element={
          <ProtectedRoutes>
            <Form isSignIn={false} />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/user/Forgot-Password"
        element={
          <ProtectedRoutes>
            <ForgotPassword />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/conversation"
        element={
          <ProtectedRoutes>
            <ConvesationBox />
          </ProtectedRoutes>
        }
      />
    </Routes>
  );
}

export default App;
