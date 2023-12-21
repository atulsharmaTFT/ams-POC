import React, { useEffect, useState } from "react";
import styles from "./Login.module.scss";
import useAdminApiService from "../../helper/useAdminApiService";
import adminServices from "../../helper/adminServices";
import { useNavigate } from "react-router";

const LoginForm = () => {
  const [userType, setUserType] = useState("normal");
  const [organizationId, setOrganizationId] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const {
    state: {
      loading: loginLoading,
      isSuccess: isLoginSuccess,
      data: loginResponse,
      isError: isLoginError,
      error: loginError,
    },
    callService: loginServices,
    resetServiceState: resetLoginState,
  } = useAdminApiService(adminServices.login);
  useEffect(() => {
    if (isLoginError && loginError) {
      resetLoginState();
    }
    if (isLoginSuccess && loginResponse) {
      console.log(loginResponse);
      if (loginResponse?.success && loginResponse?.statusCode === 200) {
        localStorage.setItem("token", loginResponse?.data?.accessToken);
        navigate("/");
      }
    }
  }, [isLoginSuccess, loginResponse, isLoginError, loginError]);

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform login logic based on user type and credentials
    // console.log("User Type:", userType);
    // console.log("Organization ID:", organizationId);
    // console.log("Username:", username);
    // console.log("Password:", password);

    const obj = {
      email: username,
      password: password,
      type: userType,
    };
    console.log(obj);
    if (userType === "SUPERADMIN") {
      await loginServices(obj);
    }
    // Add your login logic here
  };

  return (
    <div className={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label>
            User Type:
            <select value={userType} onChange={handleUserTypeChange}>
              <option value="ORGANIZATIONADMIN">Organization Admin</option>
              <option value="SUPERADMIN">Super Admin</option>
            </select>
          </label>
        </div>
        {userType === "normal" && (
          <div className={styles.field}>
            <label>Organization ID:</label>
            <input
              type="text"
              value={organizationId}
              onChange={(e) => setOrganizationId(e.target.value)}
              autoComplete="off"
            />
          </div>
        )}
        <div className={styles.field}>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div className={styles.field}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
