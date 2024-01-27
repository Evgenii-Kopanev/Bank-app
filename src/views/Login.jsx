import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/login.module.css";

export default function Login(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (userName === "ADMIN" && password === "ADMIN") {
      navigate("/bankpage");
    } else {
      const user = props.getUser(userName, password);
      if (user) {
        props.setUser(user);
        navigate(`/${user.userName}`);
      } else {
        alert("Wrong username or password");
      }
    }
  };
  return (
    <div className={styles.mainContainer}>
      <h1>SV - BANK</h1>
      <div className={styles.inputContainer}>
        <input
          onInput={(ev) => setUserName(ev.target.value)}
          placeholder="User Name"
          type="text"
        />
        <input
          onInput={(ev) => setPassword(ev.target.value)}
          placeholder="Password"
          type="text"
        />
        <div className={styles.link}>
          <Link
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
            to="/register"
          >
            create new user
          </Link>
        </div>
      </div>

      <button
        onClick={() => {
          handleLogin();
        }}
      >
        Enter
      </button>
    </div>
  );
}
